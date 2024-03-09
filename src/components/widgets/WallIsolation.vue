<script setup>
import Dropdown from "../UI/Dropdown.vue";
import { ref, defineEmits } from 'vue';

const emit = defineEmits(['walls', 'windows']);

const selectedOption = ref('');

const wallsOptions = [
  'Niet geïsoleerd, ik heb geen spouw',
  'Niet geïsoleerd, ik heb een spouw',
  'Licht geïsoleerd (rond 3cm isolatie)',
  'Matig geïsoleerd (rond 7cm isolatie)',
  'Goed geïsoleerd (rond 16cm isolatie)',
]

const WindowsOptions = [
  'Enkel glas',
  'Dubbel glas (U-waarde = 2.8)',
  'Hoogrendementsglas (U-waarde = 1.0 of 1.1)',
  'Driedubbel glas (U-waarde = 0.8)',
]

const handleWalls = (selectedItem) => {
  selectedOption.value = selectedItem;
  emit('walls', selectedItem);
}

const handleWindows = (selectedItem) => {
  selectedOption.value = selectedItem;
  emit('windows', selectedItem);
}
</script>

<template>
  <section class="mt-[64px]">
    <h2 class="text-subtitle font-bold mt-[24px] mb-[12px]">Muur isolatie</h2>
    <div class="flex gap-[24px]">
      <Dropdown :width="'full'" :label="'Mijn buitenmuur is:'" :items="wallsOptions" @itemSelected="handleWalls" />
      <Dropdown :width="'full'" :label="'De beglazing van mijn vensters is:'" :items="WindowsOptions"
        @itemSelected="handleWindows" />
    </div>
  </section>
</template>

<style scoped></style>