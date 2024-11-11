// stores/useJobStore.ts
import { ReactiveMegaMap } from "megamap"
import { computed, ref } from "vue"

export interface JobT {
  _id: string;
  title: string;
  company: string;
  companyId: string;
  companyLogo: string;
  location: string;
  salary: {
    min: number;
    max: number;
  };
  description: string;
  status: "active" | "draft" | "closed";
  type: string;
  experienceLevel: string;
  requiredSkills: string[];
  created_at: string;
  modified_at: string;
}

export const useJobStore = defineStore("jobs", () => {
  const jobMap = new ReactiveMegaMap<string, JobT>({
    loadOne: (id) => $fetch(`/api/jobs?id=${id}`),
    loadAll: () => $fetch("/api/jobs"),
    searchableFields: ["title", "company", "location", "requiredSkills"],
    subListFilters: {
      active: (job) => job.status === "active",
      draft: (job) => job.status === "draft",
      closed: (job) => job.status === "closed",
      remote: (job) => job.type === "Remote",
      fullTime: (job) => job.type === "Full-time",
      senior: (job) => job.experienceLevel === "Senior",
    },
    expiryInterval: 5 * 60 * 1000, // 5 minutes cache
  })

  // Filters
  const filters = reactive({
    status: ref<string | null>(null),
    type: ref<string | null>(null),
    experienceLevel: ref<string | null>(null),
    search: ref(""),
  })

  // Load initial data
  const initialize = async () => {
    await jobMap.getAll()
  }

  // Get related jobs based on skills and company
  const getRelatedJobs = (currentJob: JobT, limit = 3) => {
    return Object.values(jobMap.value)
      .filter(job =>
        job._id !== currentJob._id &&
        job.status === "active" &&
        (
          // Same company or matching skills
          job.companyId === currentJob.companyId ||
          job.requiredSkills.some(skill =>
            currentJob.requiredSkills.includes(skill)
          )
        )
      )
      .sort((a, b) => {
        // Score jobs based on skill matches
        const aMatches = a.requiredSkills.filter(skill =>
          currentJob.requiredSkills.includes(skill)
        ).length
        const bMatches = b.requiredSkills.filter(skill =>
          currentJob.requiredSkills.includes(skill)
        ).length
        return bMatches - aMatches
      })
      .slice(0, limit)
  }

  // Get jobs from the same company
  const getCompanyJobs = (companyId: string, currentJobId: string, limit = 2) => {
    return Object.values(jobMap.value)
      .filter(job =>
        job.companyId === companyId &&
        job._id !== currentJobId &&
        job.status === "active"
      )
      .slice(0, limit)
  }

  // Computed property for filtered jobs
  const filteredJobs = computed(() => {
    let results = Object.values(jobMap.value)

    if (filters.status) {
      results = results.filter(job => job.status === filters.status)
    }
    if (filters.type) {
      results = results.filter(job => job.type === filters.type)
    }
    if (filters.experienceLevel) {
      results = results.filter(job => job.experienceLevel === filters.experienceLevel)
    }
    if (filters.search) {
      results = jobMap.searchItems(filters.search)
    }

    return results
  })

  return {
    jobMap,
    filters,
    filteredJobs,
    initialize,
    getRelatedJobs,
    getCompanyJobs,
  }
})