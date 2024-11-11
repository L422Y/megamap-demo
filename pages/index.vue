<!-- pages/index.vue -->
<template>
  <div class="min-h-screen">
    <UContainer class="py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold mb-2">Job Listings</h1>
        <p class="text-gray-600">Find your next opportunity</p>
      </div>

      <!-- Filters -->
      <div class="bg-white rounded-lg shadow p-6 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <USelect
              v-model="jobStore.filters.status"
              :options="['active', 'draft', 'closed']"
              clearable
              placeholder="Status"
          />
          <USelect
              v-model="jobStore.filters.type"
              :options="['Full-time', 'Part-time', 'Contract', 'Remote']"
              clearable
              placeholder="Job Type"
          />
          <USelect
              v-model="jobStore.filters.experienceLevel"
              :options="['Entry Level', 'Mid Level', 'Senior', 'Lead', 'Manager']"
              clearable
              placeholder="Experience Level"
          />
          <UInput
              v-model="jobStore.filters.search"
              icon="i-heroicons-magnifying-glass"
              placeholder="Search jobs..."
          />
        </div>
      </div>

      <!-- Job Listings -->
      <div class="space-y-4">
        <UCard
            v-for="job in jobStore.filteredJobs"
            :key="job._id"
            :ui="{ base: 'transition-all hover:shadow-lg' }"
            @click="navigateToJob(job._id)"
        >
          <div class="flex items-start gap-4">
            <UAvatar
                :alt="job.company"
                :src="job.companyLogo"
                size="lg"
            />
            <div class="flex-1">
              <div class="flex items-start justify-between">
                <div>
                  <h3 class="text-lg font-semibold">{{ job.title }}</h3>
                  <p class="text-gray-600">{{ job.company }} • {{ job.location }}</p>
                </div>
                <UBadge
                    :color="getStatusColor(job.status)"
                    class="capitalize"
                    size="sm"
                >
                  {{ job.status }}
                </UBadge>
              </div>
              <div class="mt-2">
                <div class="flex flex-wrap gap-2">
                  <UBadge
                      v-for="skill in job.requiredSkills"
                      :key="skill"
                      color="gray"
                      size="xs"
                      variant="subtle"
                  >
                    {{ skill }}
                  </UBadge>
                </div>
              </div>
              <div class="mt-4 flex items-center justify-between text-sm">
                <div class="text-gray-600">
                  ${{ formatSalary(job.salary.min) }} - ${{ formatSalary(job.salary.max) }} / year
                </div>
                <div class="text-gray-500">
                  Posted {{ formatDate(job.created_at) }}
                </div>
              </div>
            </div>
          </div>
        </UCard>
      </div>
    </UContainer>
  </div>
</template>

<script lang="ts" setup>
const jobStore = useJobStore()
const router = useRouter()

onMounted(() => {
  jobStore.initialize()
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

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })
}

const navigateToJob = (id: string) => {
  router.push(`/jobs/${id}`)
}
</script>