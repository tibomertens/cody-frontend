<script setup>
import Type from "../UI/Type.vue";
import Dropdown from "../UI/Dropdown.vue";
import { ref, defineEmits } from 'vue';

const emit = defineEmits(['itemSelected', 'noCellar', 'cellar']);

const selectedItem = ref('');
const selectedCellar = ref('');

const noCellarOptions = [
  {
    title: 'Niet geïsoleerd',
    name: 'niet'
  },
  {
    title: 'Licht geïsoleerd (rond 5cm isolatie)',
    name: 'licht'
  },
  {
    title: 'Matig geïsoleerd (rond 14cm isolatie)',
    name: 'matig'
  },
  {
    title: 'Goed geïsoleerd (rond 25cm isolatie)',
    name: 'sterk'
  }
]

const CellarOptions = [
  {
    title: 'Niet geïsoleerd',
    name: 'niet'
  },
  {
    title: 'Licht geïsoleerd (rond 3cm isolatie)',
    name: 'licht'
  },
  {
    title: 'Matig geïsoleerd (rond 8cm isolatie)',
    name: 'matig'
  },
  {
    title: 'Goed geïsoleerd (rond 15cm isolatie)',
    name: 'sterk'
  }
]

const handleItemSelected = (itemAlias) => {
  selectedItem.value = itemAlias;
  emit('itemSelected', itemAlias); // Emit the event further upwards
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
        @itemSelected="handleItemSelected" item-alias="VolleGrond" />
      <Type :item-name="'Vloer boven kelder'" :image-url="'/kelder.svg'" :selected="selectedItem"
        @itemSelected="handleItemSelected" item-alias="BovenKelder" />
      <div class="xs:col-span-2 ml:col-span-1">
        <Type :item-name="'Gemengd'" :image-url="'/gemengdVloer.svg'" :selected="selectedItem"
          @itemSelected="handleItemSelected" item-alias="gemengd" />
      </div>
    </div>
    <div class="mt-[32px] xs:flex gap-[24px]">
      <Dropdown v-if="selectedItem !== 'BovenKelder'" :width="selectedItem !== 'VolleGrond' ? 'full' : ''" :label="'Volle grond:'" :items="noCellarOptions" @itemSelected="handleNoCellar" />
      <Dropdown v-if="selectedItem !== 'VolleGrond'" :width="selectedItem !== 'BovenKelder' ? 'full' : ''" :label="'Met kelder:'" :items="CellarOptions" @itemSelected="handleCellar" class="mt-[24px] xs:mt-0" />
    </div>
  </section>
</template>

<style scoped></style>