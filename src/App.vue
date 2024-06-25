<script setup lang="ts">

import CountySelector from "@/components/CountySelector.vue";
import CountyStore from "@/stores/county/CountyStore";
import NewCity from "@/components/NewCity.vue";
import CityList from "@/components/CityList.vue";

const store = CountyStore();
store.initializeCountryList();
</script>

<template>
  <header>
  </header>

  <main>
    <div class="flex h-screen justify-center items-center">
      <div class="flex flex-col">
        <div>
          <CountySelector v-if="store.loaded"></CountySelector>
          <NewCity v-if="store.selectedCountyId != null"></NewCity>
        </div>
      </div>
      <div class="flex items-center m-4">
        <CityList v-if="store.selectedCountyId != null"></CityList>
      </div>
    </div>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
