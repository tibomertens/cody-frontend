<script setup>
import Type from "../UI/Type.vue";
import Dropdown from "../UI/Dropdown.vue";
import { ref, defineEmits } from 'vue';

const emit = defineEmits(['itemSelected', 'noCellar', 'cellar']);

const selectedItem = ref('');
const selectedCellar = ref('');

const noCellarOptions = [
  'Niet geïsoleerd',
  'Licht geïsoleerd (rond 5cm isolatie)',
  'Matig geïsoleerd (rond 14cm isolatie)',
  'Goed geïsoleerd (rond 25cm isolatie)',
]

const CellarOptions = [
  'Niet geïsoleerd',
  'Licht geïsoleerd (rond 3cm isolatie)',
  'Matig geïsoleerd (rond 8cm isolatie)',
  'Goed geïsoleerd (rond 15cm isolatie)',
]

const handleItemSelected = (itemName) => {
  selectedItem.value = itemName;
  emit('itemSelected', itemName); // Emit the event further upwards
}

const handleNoCellar = (selectedItem) => {
  selectedCellar.value = selectedItem;
  emit('noCellar', selectedItem);
}

const handleCellar = (selectedItem) => {
  selectedCellar.value = selectedItem;
  emit('cellar', selectedItem);
}
</script>

<template>
  <section class="mt-[64px]">
    <h2 class="text-subtitle font-bold mt-[24px] mb-[12px]">Vloer isolatie</h2>
    <div class="grid grid-cols-1 gap-[32px] xs:grid-cols-2 ml:grid-cols-3">
      <Type :item-name="'Vloer op volle grond'" :image-url="'/volleGrond.svg'" :selected="selectedItem"
        @itemSelected="handleItemSelected" />
      <Type :item-name="'Vloer boven kelder'" :image-url="'/kelder.svg'" :selected="selectedItem"
        @itemSelected="handleItemSelected" />
      <div class="xs:col-span-2 ml:col-span-1">
        <Type :item-name="'Gemengd'" :image-url="'/gemengdVloer.svg'" :selected="selectedItem"
          @itemSelected="handleItemSelected" />
      </div>
    </div>
    <div class="mt-[32px] flex gap-[24px]">
      <Dropdown :width="'full'" :label="'Hellend dak'" :items="noCellarOptions" @itemSelected="handleNoCellar" />
      <Dropdown :width="'full'" :label="'Plat dak:'" :items="CellarOptions" @itemSelected="handleCellar" />
    </div>
  </section>
</template>

<style scoped></style>