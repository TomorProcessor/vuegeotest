<script setup lang="ts">

import Styles from "@/components/Styles";
</script>

<template>
  <div :class="'container max-w-2xl mx-auto text-sm font-medium text-gray-900 dark:text-gray-400' + Styles.CardStyle">
    <div class="flex items-center mb-2">
      <label for="cityInput" class="mr-2">Új város:</label>
      <input id="cityInput" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-md px-4 py-2 focus:border-gray-300"/>
<!--      class="g-gray-50 border border-gray-300 text-gray-900 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500"-->
    </div>
    <button class="g-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">Felvesz</button>
  </div>
</template>

<style scoped>

</style>