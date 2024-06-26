<script setup lang="ts">

import Styles from "@/components/Styles";
import CountyStore from "@/stores/county/CountyStore";
import {ref} from "vue";
import type {Ref, UnwrapRef} from "@vue/reactivity";
import DbMethods from "@/stores/DbMethods";

const store = CountyStore();
const selectedCityId: Ref<UnwrapRef<number>> = ref(NaN);

function selectCity(id: number) {
  selectedCityId.value = id;
}

function deselectCity() {
  selectedCityId.value = NaN;
}

async function handleCityDelete(cityId: number) {
  const success: boolean = await DbMethods.deleteCity(cityId);
  if (!success) alert("Failed to delete city!");
}

</script>

<template>
  <div :class="'city-list' + Styles.CardStyle + ' ' + Styles.Font">
    <div class="flex">
      <h2 class="underline mr-2">Megye:</h2>
      <p>{{ store.selectedCounty?.name }}</p>
    </div>
    <h2 class="underline justify-between items-center">Városok: </h2>
    <div class="flex" v-for="city in store.citiesForSelectedCounty">
      <p @click="selectCity(city.id)">
        {{ city.name }}
      </p>
      <div class="flex">
        <button @click="handleCityDelete(city.id)" v-if="selectedCityId == city.id"
                class="g-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
          Törlés
        </button>
        <button v-if="selectedCityId == city.id"
                class="g-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
          Módosít
        </button>
        <button @click="deselectCity" v-if="selectedCityId == city.id"
                class="g-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
          Mégsem
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>