<script setup lang="ts">

import Styles from "@/components/Styles";
import {ref} from "vue";
import type {Ref, UnwrapRef} from "@vue/reactivity";
import DbMethods from "@/stores/DbMethods";
import CountyStore from "@/stores/county/CountyStore";

const newCityName: Ref<UnwrapRef<string>> = ref('');

async function handleNewCityAdd() {
  // console.log(newCityName.value);
  const success: boolean = await DbMethods.addNewCity(newCityName.value);
  if (!success) alert("Failed to add new city!");
}

</script>

<template>
  <div :class="'container max-w-2xl mx-auto ' + Styles.CardStyle + ' ' + Styles.Font">
    <div class="flex items-center mb-2">
      <label for="cityInput" class="mr-2">Új város:</label>
      <input id="cityInput" type="text" v-model="newCityName" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-md px-4 py-2 focus:border-gray-300"/>
    </div>
    <button @click="handleNewCityAdd" class="g-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">Felvesz</button>
  </div>
</template>

<style scoped>

</style>