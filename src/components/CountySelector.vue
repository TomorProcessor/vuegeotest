<script setup lang="ts">
  import CountyStore from "@/stores/county/CountyStore";

  const store = CountyStore();
  store.initializeCountryList();

</script>

<template>
  <div v-if="store.loaded" class="max-w-2xl mx-auto flex">

    <label for="countries" class="text-sm font-medium text-gray-900 dark:text-gray-400 flex items-center">Megye:</label>
    <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 max-w-max">
      <option selected>Válassz</option>
      <option v-for="county in store.counties">county.name</option>
<!--      <option value="US">United States</option>-->
<!--      <option value="CA">Canada</option>-->
<!--      <option value="FR">France</option>-->
<!--      <option value="DE">Germany</option>-->
    </select>
  </div>
</template>

<style scoped>

</style>