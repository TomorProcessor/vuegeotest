<script setup lang="ts">

import Styles from "@/components/Styles";
import CountyStore from "@/stores/county/CountyStore";
import {ref} from "vue";
import type {Ref, UnwrapRef} from "@vue/reactivity";
import DbMethods from "@/stores/DbMethods";

const store = CountyStore();
const selectedCityId: Ref<UnwrapRef<number>> = ref(NaN);
let inputValue: string = '';

function updateInputValue(event: Event) {
  inputValue = (<HTMLInputElement>event.target).value;
}

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

async function handleModifyCity(cityId: number) {
  const success: boolean = await DbMethods.updateCity(cityId, inputValue);
  if (!success) {
    alert("Failed to update city!");
  } else {
    selectedCityId.value = NaN;
  }
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
      <p v-if="selectedCityId != city.id" @click="selectCity(city.id)">
        {{ city.name }}
      </p>
      <input v-else @input="updateInputValue" :value="city.name" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-md px-4 py-2 focus:border-gray-300"/>
      <div class="flex">
        <button @click="handleCityDelete(city.id)" v-if="selectedCityId == city.id"
                class="g-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
          Törlés
        </button>
        <button v-if="selectedCityId == city.id" @click="handleModifyCity(city.id)"
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