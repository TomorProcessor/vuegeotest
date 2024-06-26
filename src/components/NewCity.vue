<script setup lang="ts">

import Styles from "@/components/Styles";
import {ref} from "vue";
import type {Ref, UnwrapRef} from "@vue/reactivity";
import DbMethods from "@/stores/DbMethods";

const newCityName: Ref<UnwrapRef<string>> = ref('');

async function handleNewCityAdd() {
  const success: boolean = await DbMethods.addNewCity(newCityName.value);
  if (!success) alert("Failed to add new city!");
}

</script>

<template>
  <div :class="'container max-w-2xl mx-auto ' + Styles.Card + ' ' + Styles.Font">
    <div class="flex items-center mb-2">
      <label for="cityInput" class="mr-2">Új város:</label>
      <input id="cityInput" type="text" v-model="newCityName" :class="Styles.Input"/>
    </div>
    <button @click="handleNewCityAdd" :class="Styles.Button">Felvesz</button>
  </div>
</template>

<style scoped>

</style>