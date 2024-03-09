<script setup>
import Dropdown from "../UI/Dropdown.vue";
import { ref, defineEmits } from 'vue';

const emit = defineEmits(['selectedVentilation']);

const selectedVentilation = ref('');

const ventilationOptions = [
  'Ik heb geen ventilatiesysteem',
  'Natuurlijke ventilatie via roosters',
  'Mechanische afvoer',
  'Mechanische afvoer met vraagsturing',
  'Mechanische afvoer met warmteterugwinning',
]

const handleSelectedVentilation = (selectedItem) => {
  selectedVentilation.value = selectedItem;
  emit('selectedVentilation', selectedItem); // Emit the event further upwards
}
</script>

<template>
  <section class="mt-[64px]">
    <h2 class="text-subtitle font-bold mt-[24px] mb-[12px]">Ventilatie</h2>
    <div class="">
      <Dropdown :label="'Mijn woning is geventileerd met:'" :items="ventilationOptions" @itemSelected="handleSelectedVentilation" />
    </div>
  </section>
</template>

<style scoped>
</style>