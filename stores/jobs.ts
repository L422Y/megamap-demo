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
  }
})