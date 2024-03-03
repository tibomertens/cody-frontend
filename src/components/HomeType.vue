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
    <h2>Woningkenmerken</h2>
    <div class="grid grid-cols-1 gap-[32px] xs:grid-cols-2 md:grid-cols-3">
      <Type :item-name="'Open bebouwing'" :image-url="'../src/assets/openBebouwing.svg'"
        @itemSelected="handleItemSelected" />
      <Type :item-name="'Halfopen bebouwing'" :image-url="'../src/assets/halfopenBebouwing.svg'"
        @itemSelected="handleItemSelected" />
      <div class="xs:col-span-2 md:col-span-1">
        <Type :item-name="'Gesloten bebouwing'" :image-url="'../src/assets/geslotenBebouwing.svg'"
          @itemSelected="handleItemSelected" />
      </div>
    </div>
    <div class="mt-[32px]">
      <label for="surface">Bewoonbare oppervlakte</label>
      <input type="text" name="surface" id="surface">
    </div>
  </section>
</template>

<style scoped></style>