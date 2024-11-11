<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">MegaMap Demo</h1>

    <div class="mb-4">
      <h2 class="text-xl font-semibold">Reactive MegaMap</h2>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <h3 class="font-semibold mb-2">Published</h3>
          <div v-for="item in reactiveMegaMap.subLists.published" :key="item._id" class="p-2 bg-gray-100 rounded">
            {{ item.data }}
          </div>
        </div>
        <div>
          <h3 class="font-semibold mb-2">Draft</h3>
          <div v-for="item in reactiveMegaMap.subLists.draft" :key="item._id" class="p-2 bg-gray-100 rounded">
            {{ item.data }}
          </div>
        </div>
      </div>
    </div>

    <div class="mb-4">
      <h2 class="text-xl font-semibold">MegaMap with Search</h2>
      <input v-model="searchQuery" type="text" class="border rounded p-2 mb-2" placeholder="Search..." />
      <div class="grid grid-cols-2 gap-4">
        <div v-for="item in filteredItems" :key="item._id" class="p-2 bg-gray-100 rounded">
          {{ item.data }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { ReactiveMegaMap, MegaMap } from 'megamap';

const reactiveMegaMap = new ReactiveMegaMap({
  loadOne: fakeRecordLoad,
  loadAll: fakeMultipleRecordLoad,
  subListFilters,
});

const megaMap = new MegaMap({
  loadOne: fakeRecordLoad,
  loadAll: fakeMultipleRecordLoad,
  searchableFields: ['data'],
  subListFilters,
});

const searchQuery = ref('');

const filteredItems = computed(() => {
  return megaMap.searchItems(searchQuery.value);
});

// Load initial data
await reactiveMegaMap.getAll();
await megaMap.getAll();
</script>