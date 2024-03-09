<script setup>
import HomeType from "../components/HomeType.vue";
import Heating from "../components/Heating.vue";
import Isolation from "../components/Isolation.vue";

import { ref } from 'vue';

// Object to hold selected items
const selectedItems = ref({
    homeType: '',
    roofType: '',
    heatingType: '',
    heatingSystem: '',
    waterHeatingSystem: '',
    surface: '',
    solarBoiler: false,
    solarPanels: false,
    pitchedRoof: '',
    flatRoof: ''
});

// Function to update selected items
const handleSelectedItems = (key, value) => {
    selectedItems.value[key] = value;
    console.log(selectedItems.value[key]);
    console.log(selectedItems.value);
}
</script>

<template>
    <section class="ml-[32px] mr-[32px] pt-[40px] md:ml-[10%] md:mr-[10%] xl:ml-[25%] xl:mr-[25%]">
        <div class="head">
            <div class="goBackArrow"></div>
            <h1 class="text-title font-bold">Indicatieve test</h1>
        </div>
        <HomeType @itemSelected="handleSelectedItems('homeType', $event)"
            @selectedSurface="handleSelectedItems('surface', $event)" />
        <Heating @selectedHeatingType="handleSelectedItems('heatingType', $event)"
            @selectedHeatingSystem="handleSelectedItems('heatingSystem', $event)"
            @selectedWaterHeatingSystem="handleSelectedItems('waterHeatingSystem', $event)"
            @solarBoiler="handleSelectedItems('solarBoiler', $event)"
            @solarPanels="handleSelectedItems('solarPanels', $event)" />
        <Isolation @itemSelected="handleSelectedItems('roofType', $event)"
            @pitchedRoof="handleSelectedItems('pitchedRoof', $event)"
            @flatRoof="handleSelectedItems('flatRoof', $event)" />
        <div class="h-[100px] w-screen"></div>
    </section>
</template>

<style scoped></style>
