<!-- components/RelatedJobs.vue -->
<template>
  <UCard class="mb-8">
    <template #header>
      <h2 class="text-xl font-semibold">{{ title }}</h2>
    </template>
    <div class="space-y-4">
      <div
          v-for="job in jobs"
          :key="job._id"
          class="p-4 rounded-lg border border-gray-200 hover:border-primary-500 cursor-pointer transition-colors"
          @click="navigateToJob(job._id)"
      >
        <div class="flex items-start gap-3">
          <UAvatar
              :alt="job.company"
              :src="job.companyLogo"
              size="sm"
          />
          <div class="flex-1 min-w-0">
            <h3 class="font-medium text-gray-200 truncate">{{ job.title }}</h3>
            <p class="text-sm text-gray-400 truncate">{{ job.company }}</p>
            <div class="mt-2 flex items-center gap-3 text-sm text-gray-500">
              <span class="flex items-center gap-1">
                <UIcon class="w-4 h-4" name="i-heroicons-map-pin"/>
                {{ job.location }}
              </span>
              <span class="flex items-center gap-1">
                <UIcon class="w-4 h-4" name="i-heroicons-currency-dollar"/>
                {{ formatSalary(job.salary.min) }} - {{ formatSalary(job.salary.max) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </UCard>
</template>

<script lang="ts" setup>
const router = useRouter()

defineProps<{
  title: string;
  jobs: JobT[];
}>()

const formatSalary = (amount: number) => {
  return ( amount / 1000 ).toFixed(0) + "k"
}

const navigateToJob = (id: string) => {
  router.push(`/jobs/${id}`)
}
</script>