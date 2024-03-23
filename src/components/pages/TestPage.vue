<script setup>
import HomeType from "../widgets/HomeType.vue";
import Heating from "../widgets/Heating.vue";
import RoofIsolation from "../widgets/RoofIsolation.vue";
import FloorIsolation from "../widgets/FloorIsolation.vue";
import WallIsolation from "../widgets/WallIsolation.vue";
import Ventilation from "../widgets/Ventilation.vue";
import Btn from "../UI/Btn.vue";

import { ref } from 'vue';

// Object to hold selected items
const selectedItems = ref({
    typeWoning: null,
    typeGeometrie: null,
    typeDak: null,
    typeVerwarming: null,
    verwarmingEnergiedrager: null,
    verwarmSanitairWarmWaterMet: null,
    zonneboilerAanwezig: false,
    pvAanwezig: false,
    typeHellendDakIsolatie: 'niet',
    typePlatDakIsolatie: 'niet',
    typeVentilatie: null,
    typeVloer: null,
    typeVloerOpVolleGrondIsolatie: 'niet',
    typeVloerBovenKelderIsolatie: 'niet',
    typeGevelIsolatie: null,
    typeVenster: null,
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
        <HomeType @itemSelected="handleSelectedItems('typeWoning', $event)"
            @selectedSurface="handleSelectedItems('typeGeometrie', $event)" />
        <Heating @selectedHeatingType="handleSelectedItems('typeVerwarming', $event)"
            @selectedHeatingSystem="handleSelectedItems('verwarmingEnergiedrager', $event)"
            @selectedWaterHeatingSystem="handleSelectedItems('verwarmSanitairWarmWaterMet', $event)"
            @solarBoiler="handleSelectedItems('zonneboilerAanwezig', $event)"
            @solarPanels="handleSelectedItems('pvAanwezig', $event)" />
        <RoofIsolation @itemSelected="handleSelectedItems('typeDak', $event)"
            @pitchedRoof="handleSelectedItems('typeHellendDakIsolatie', $event)"
            @flatRoof="handleSelectedItems('typePlatDakIsolatie', $event)" />
        <Ventilation @selectedVentilation="handleSelectedItems('typeVentilatie', $event)" />
        <FloorIsolation @itemSelected="handleSelectedItems('typeVloer', $event)"
            @noCellar="handleSelectedItems('typeVloerOpVolleGrondIsolatie', $event)" @cellar="handleSelectedItems('typeVloerBovenKelderIsolatie', $event)" />
        <WallIsolation @walls="handleSelectedItems('typeGevelIsolatie', $event)"
            @windows="handleSelectedItems('typeVenster', $event)" />
        <div class="flex justify-center mt-[64px] pb-[64px]">
            <Btn :name="'Doorgaan'" />
        </div>
    </section>
</template>

<style scoped></style>../UI/Btn.vue
