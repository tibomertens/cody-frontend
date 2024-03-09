<script setup>
import HomeType from "../components/HomeType.vue";
import Heating from "../components/Heating.vue";
import RoofIsolation from "../components/RoofIsolation.vue";
import FloorIsolation from "../components/FloorIsolation.vue";
import WallIsolation from "../components/WallIsolation.vue";
import Ventilation from "../components/Ventilation.vue";
import Button from "../components/Button.vue";

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
    flatRoof: '',
    ventilation: '',
    floorType: '',
    noCellar: '',
    cellar: '',
    walls: '',
    windows: '',
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
        <RoofIsolation @itemSelected="handleSelectedItems('roofType', $event)"
            @pitchedRoof="handleSelectedItems('pitchedRoof', $event)"
            @flatRoof="handleSelectedItems('flatRoof', $event)" />
        <Ventilation @selectedVentilation="handleSelectedItems('ventilation', $event)" />
        <FloorIsolation @itemSelected="handleSelectedItems('floorType', $event)" @noCellar="handleSelectedItems('noCellar', $event)" @cellar="handleSelectedItems('cellar', $event)" />
        <WallIsolation @walls="handleSelectedItems('walls', $event)" @windows="handleSelectedItems('windows', $event)" />
        <div class="flex justify-center mt-[64px] pb-[64px]">
            <Button :name="'Doorgaan'" />
        </div>
    </section>
</template>

<style scoped></style>
