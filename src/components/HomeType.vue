<script setup>
import Type from "../components/Type.vue";
import { ref } from 'vue';

const selectedItem = ref('');

const handleItemSelected = (itemName) => {
  selectedItem.value = itemName;
  console.log(selectedItem.value);
}
</script>

<template>
  <section>
    <h2 class="text-subtitle font-bold mt-[24px] mb-[12px]">Woningkenmerken</h2>
    <div class="grid grid-cols-1 gap-[32px] xs:grid-cols-2 ml:grid-cols-3">
      <Type :item-name="'Open bebouwing'" :image-url="'../src/assets/openBebouwing.svg'" :selected="selectedItem"
        @itemSelected="handleItemSelected" />
      <Type :item-name="'Halfopen bebouwing'" :image-url="'../src/assets/halfopenBebouwing.svg'"
        :selected="selectedItem" @itemSelected="handleItemSelected" />
      <div class="xs:col-span-2 ml:col-span-1">
        <Type :item-name="'Gesloten bebouwing'" :image-url="'../src/assets/geslotenBebouwing.svg'"
          :selected="selectedItem" @itemSelected="handleItemSelected" />
      </div>
    </div>
    <div class="mt-[32px]">
      <label for="surface">Bewoonbare oppervlakte</label>
      <input type="text" name="surface" id="surface">
    </div>
  </section>
</template>

<style scoped></style>