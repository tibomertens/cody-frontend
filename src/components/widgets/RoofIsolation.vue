<script setup>
import Type from "../UI/Type.vue";
import Dropdown from "../UI/Dropdown.vue";
import { ref, defineEmits } from 'vue';

const emit = defineEmits(['itemSelected', 'pitchedRoof', 'FlatRoof']);

const selectedItem = ref('');
const selectedSurface = ref('');

const PithedRoofOptions = [
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

const FlatRoofOptions = [
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

const handlePitchedRoof = (selectedItem) => {
  selectedSurface.value = selectedItem;
  emit('pitchedRoof', selectedItem);
}

const handleFlatRoof = (selectedItem) => {
  selectedSurface.value = selectedItem;
  emit('FlatRoof', selectedItem);
}
</script>

<template>
  <section class="mt-[64px]">
    <h2 class="text-subtitle font-bold mt-[24px] mb-[12px]">Dak isolatie</h2>
    <div class="grid grid-cols-1 gap-[32px] xs:grid-cols-2 ml:grid-cols-3">
      <Type :item-name="'Hellend dak'" :image-url="'/hellendDak.svg'" :selected="selectedItem"
        @itemSelected="handleItemSelected" item-alias="Dak_hellend"/>
      <Type :item-name="'Plat dak'" :image-url="'/platDak.svg'" :selected="selectedItem"
        @itemSelected="handleItemSelected" item-alias="Dak_plat" />
      <div class="xs:col-span-2 ml:col-span-1">
        <Type :item-name="'Gemengd dak'" :image-url="'/gemengdDak.svg'" :selected="selectedItem"
          @itemSelected="handleItemSelected" item-alias="gemengd" />
      </div>
    </div>
    <div class="mt-[32px] xs:flex gap-[24px]">
      <Dropdown v-if="selectedItem !== 'Dak_plat'" :width="selectedItem !== 'Dak_hellend' ? 'full' : ''" :label="'Hellend dak:'" :items="PithedRoofOptions" @itemSelected="handlePitchedRoof" />
      <Dropdown v-if="selectedItem !== 'Dak_hellend'" :width="selectedItem !== 'Dak_plat' ? 'full' : ''" :label="'Plat dak:'" :items="FlatRoofOptions" @itemSelected="handleFlatRoof" class="mt-[24px] xs:mt-0" />
    </div>
  </section>
</template>

<style scoped></style>