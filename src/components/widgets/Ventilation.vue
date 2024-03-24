<script setup>
import Dropdown from "../UI/Dropdown.vue";
import { ref, defineEmits } from 'vue';

const emit = defineEmits(['selectedVentilation']);

const selectedVentilation = ref('');

const ventilationOptions = [
  {
    title: 'Ik heb geen ventilatiesysteem',
    name: 'geen'
  },
  {
    title: 'Natuurlijke ventilatie via roosters',
    name: 'DWTW'
  },
  {
    title: 'Mechanische afvoer',
    name: 'CWTW'
  },
  {
    title: 'Mechanische afvoer met vraagsturing',
    name: 'A'
  },
  {
    title: 'Mechanische afvoer met warmteterugwinning',
    name: 'C'
  }
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
      <Dropdown :label="'Mijn woning is geventileerd met:'" :items="ventilationOptions"
        @itemSelected="handleSelectedVentilation" />
    </div>
  </section>
</template>

<style scoped></style>