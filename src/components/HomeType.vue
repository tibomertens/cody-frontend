<script setup>
import Type from "../components/Type.vue";
import Dropdown from "./Dropdown.vue";
import { ref, defineEmits } from 'vue';

const emit = defineEmits(['itemSelected', 'selectedSurface']);

const selectedItem = ref('');
const selectedSurface = ref('');

const surfaceOptions = [
  'Klein (~150m²)',
  'Gemiddeld (~200m²)',
  'Groot (~280m²)',
]

const handleItemSelected = (itemName) => {
  selectedItem.value = itemName;
  emit('itemSelected', itemName); // Emit the event further upwards
}

const handleSelectedSurface = (selectedItem) => {
  selectedSurface.value = selectedItem;
  emit('selectedSurface', selectedItem); // Emit the event further upwards
}
</script>

<template>
  <section>
    <h2 class="text-subtitle font-bold mt-[24px] mb-[12px]">Woningkenmerken</h2>
    <div class="grid grid-cols-1 gap-[32px] xs:grid-cols-2 ml:grid-cols-3">
      <Type :item-name="'Open bebouwing'" :image-url="'/openBebouwing.svg'" :selected="selectedItem"
        @itemSelected="handleItemSelected" />
      <Type :item-name="'Halfopen bebouwing'" :image-url="'/halfopenBebouwing.svg'"
        :selected="selectedItem" @itemSelected="handleItemSelected" />
      <div class="xs:col-span-2 ml:col-span-1">
        <Type :item-name="'Gesloten bebouwing'" :image-url="'/geslotenBebouwing.svg'"
          :selected="selectedItem" @itemSelected="handleItemSelected" />
      </div>
    </div>
    <div class="mt-[32px]">
      <Dropdown :label="'Bewoonbare oppervlakte:'" :items="surfaceOptions" @itemSelected="handleSelectedSurface" />
    </div>
  </section>
</template>

<style scoped>
</style>