<script setup lang="ts">
import CountyStore from "@/stores/county/CountyStore";
import Styles from "./Styles";

const store = CountyStore();

function handleSelect(event: Event) {
  let value: string | null = (<HTMLSelectElement>event.target).selectedOptions[0].getAttribute('value');
  if (value) {
    store.selectedCountyId = parseInt(value);
  } else {
    store.selectedCountyId = null;
  }
}

</script>

<template>
  <div :class="'max-w-2xl mx-auto flex' + Styles.Card">
    <div class="flex items-center mb-2">
      <label for="countries" :class="'mr-2 ' + Styles.Font">Megye:</label>
      <select
          @change="handleSelect"
          id="countries"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 max-w-max">
        <option selected>Válassz</option>
        <option v-for="county in store.counties" :key="county.id" :value="county.id">{{ county.name }}</option>
      </select>
    </div>
  </div>
</template>