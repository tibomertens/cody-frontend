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
    <section class="home-characteristics">
      <h2>Woningkenmerken</h2>
      <Type :item-name="'Open bebouwing'" :image-url="'../src/assets/openBebouwing.svg'" @itemSelected="handleItemSelected" />
      <Type :item-name="'Halfopen bebouwing'" :image-url="'../src/assets/halfopenBebouwing.svg'" @itemSelected="handleItemSelected" />
      <Type :item-name="'Gesloten bebouwing'" :image-url="'../src/assets/geslotenBebouwing.svg'" @itemSelected="handleItemSelected" />
      <!-- <Type :item-name="'Appartement'" :image-url="'../src/assets/openBebouwing.svg'" @itemSelected="handleItemSelected" /> -->
      <div>
        <label for="surface">Bewoonbare oppervlakte</label>
        <input type="text" name="surface" id="surface">
      </div>
      <p>Selected Item: {{ selectedItem }}</p>
    </section>
</template>
  
<style scoped>
</style>
  