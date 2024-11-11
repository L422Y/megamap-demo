<!-- pages/jobs/[id].vue -->
<template>
  <div class="min-h-screen">
    <UContainer class="py-8">
      <div v-if="job" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2">
          <!-- Back Button -->
          <UButton
              class="mb-6"
              icon="i-heroicons-arrow-left"
              size="sm"
              variant="ghost"
              @click="router.back()"
          >
            Back to Jobs
          </UButton>

          <!-- Job Header -->
          <UCard class="mb-8">
            <div class="flex items-start gap-6">
              <UAvatar
                  :alt="job.company"
                  :src="job.companyLogo"
                  size="2xl"
              />
              <div class="flex-1">
                <div class="flex items-start justify-between gap-4">
                  <div>
                    <h1 class="text-2xl font-bold text-gray-900">{{ job.title }}</h1>
                    <p class="text-lg text-gray-200 mt-1">{{ job.company }}</p>
                  </div>
                  <UBadge
                      :color="getStatusColor(job.status)"
                      class="capitalize"
                      size="lg"
                  >
                    {{ job.status }}
                  </UBadge>
                </div>
                <div class="mt-4 grid grid-cols-2 gap-4">
                  <div class="flex items-center gap-2 text-gray-400">
                    <UIcon name="i-heroicons-map-pin"/>
                    {{ job.location }}
                  </div>
                  <div class="flex items-center gap-2 text-gray-400">
                    <UIcon name="i-heroicons-briefcase"/>
                    {{ job.type }}
                  </div>
                  <div class="flex items-center gap-2 text-gray-400">
                    <UIcon name="i-heroicons-academic-cap"/>
                    {{ job.experienceLevel }}
                  </div>
                  <div class="flex items-center gap-2 text-gray-400">
                    <UIcon name="i-heroicons-currency-dollar"/>
                    ${{ formatSalary(job.salary.min) }} - ${{ formatSalary(job.salary.max) }}
                  </div>
                </div>
              </div>
            </div>
          </UCard>

          <!-- Job Description -->
          <UCard class="mb-8">
            <template #header>
              <h2 class="text-xl font-semibold">Job Description</h2>
            </template>
            <div class="text-gray-400 prose max-w-none">
              {{ job.description }}
            </div>
          </UCard>

          <!-- Required Skills -->
          <UCard class="mb-8">
            <template #header>
              <h2 class="text-xl font-semibold">Required Skills</h2>
            </template>
            <div class="flex flex-wrap gap-2">
              <UBadge
                  v-for="skill in job.requiredSkills"
                  :key="skill"
                  color="primary"
                  variant="subtle"
              >
                {{ skill }}
              </UBadge>
            </div>
          </UCard>
        </div>

        <!-- Sidebar -->
        <div class="lg:col-span-1">
          <!-- Apply Button -->
          <UCard class="mb-8">
            <UButton
                :disabled="job.status !== 'active'"
                block
                color="primary"
                size="lg"
            >
              Apply Now
            </UButton>
            <p v-if="job.status !== 'active'" class="text-sm text-gray-500 mt-2 text-center">
              This position is no longer accepting applications
            </p>
          </UCard>

          <!-- Company Jobs -->
          <RelatedJobs
              v-if="companyJobs.length"
              :jobs="companyJobs"
              title="More jobs at this company"
          />

          <!-- Similar Jobs -->
          <RelatedJobs
              v-if="relatedJobs.length"
              :jobs="relatedJobs"
              title="Similar jobs you might like"
          />
        </div>
      </div>

      <!-- Loading State -->
      <div v-else class="flex justify-center items-center min-h-[400px]">
        <ULoader/>
      </div>
    </UContainer>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute()
const router = useRouter()
const jobStore = useJobStore()

const job = ref<JobT | null>(null)
const companyJobs = ref<JobT[]>([])
const relatedJobs = ref<JobT[]>([])

// Load job and related data
const loadJob = async () => {
  const jobId = route.params.id as string
  job.value = await jobStore.jobMap.get(jobId)

  if (job.value) {
    companyJobs.value = jobStore.getCompanyJobs(job.value.companyId, job.value._id)
    relatedJobs.value = jobStore.getRelatedJobs(job.value)
  }
}

onMounted(async () => {
  await jobStore.initialize()
  await loadJob()
})

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "green"
    case "draft":
      return "yellow"
    case "closed":
      return "red"
    default:
      return "gray"
  }
}

const formatSalary = (amount: number) => {
  return ( amount / 1000 ).toFixed(0) + "k"
}
</script>