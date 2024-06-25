<script setup lang="ts">

import Styles from "@/components/Styles";
import CountyStore from "@/stores/county/CountyStore";

const store = CountyStore();

</script>

<template>
  <div :class="'city-list' + Styles.CardStyle + ' ' + Styles.Font">
    <div class="flex">
      <h2 class="underline mr-2">Megye:</h2>
      <p>{{ store.selectedCounty?.name }}</p>
    </div>
    <h2 class="underline">Városok: </h2>
    <p v-for="city in store.citiesForSelectedCounty">
      {{ city.name }}
    </p>
  </div>
</template>

<style scoped>

</style>