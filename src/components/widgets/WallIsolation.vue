<script setup>
import Dropdown from "../UI/Dropdown.vue";
import { ref, defineEmits } from 'vue';

const emit = defineEmits(['walls', 'windows']);

const selectedOption = ref('');

const wallsOptions = [
  {
    title: 'Niet geïsoleerd, ik heb geen spouw',
    name: 'nietZonderSpouw'
  },
  {
    title: 'Niet geïsoleerd, ik heb een spouw',
    name: 'nietMetSpouw'
  },
  {
    title: 'Licht geïsoleerd (rond 3cm isolatie)',
    name: 'licht'
  },
  {
    title: 'Matig geïsoleerd (rond 7cm isolatie)',
    name: 'matig'
  },
  {
    title: 'Goed geïsoleerd (rond 16cm isolatie)',
    name: 'sterk'
  }
]

const WindowsOptions = [
  {
    title: 'Enkel glas',
    name: 'enkel'
  },
  {
    title: 'Dubbel glas (U-waarde = 2.8)',
    name: 'dubbel'
  },
  {
    title: 'Hoogrendementsglas (U-waarde = 1.0 of 1.1)',
    name: 'HR'
  },
  {
    title: 'Driedubbel glas (U-waarde = 0.8)',
    name: 'driedubbel'
  }
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
    <div class="xs:flex gap-[24px]">
      <Dropdown :width="'full'" :label="'Mijn buitenmuur is:'" :items="wallsOptions" @itemSelected="handleWalls" />
      <Dropdown :width="'full'" :label="'De beglazing van mijn vensters is:'" :items="WindowsOptions"
        @itemSelected="handleWindows" class="mt-[24px] xs:mt-0" />
    </div>
  </section>
</template>

<style scoped></style>