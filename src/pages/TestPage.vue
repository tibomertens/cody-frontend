<script setup>
import HomeType from "../components/HomeType.vue";
import Heating from "../components/Heating.vue";
import { ref } from 'vue';

const selectedItemFromType = ref('');
const selectedHeatingType = ref('');
const selectedHeatingSystem = ref('');
const selectedWaterHeatingSystem = ref('');

const handleItemSelectedFromType = (itemName) => {
    selectedItemFromType.value = itemName;
}

const handleSelectedHeatingType = (selectedItem) => {
    selectedHeatingType.value = selectedItem;
    console.log(selectedHeatingType.value);
}

const handleSelectedHeatingSystem = (selectedItem) => {
    selectedHeatingSystem.value = selectedItem;
    console.log(selectedHeatingSystem.value);
}

const handleSelectedWaterHeatingSystem = (selectedItem) => {
    selectedWaterHeatingSystem.value = selectedItem;
    console.log(selectedWaterHeatingSystem.value);
}
</script>

<template>
    <section class="ml-[32px] mr-[32px] pt-[40px] md:ml-[10%] md:mr-[10%] xl:ml-[25%] xl:mr-[25%]">
        <div class="head">
            <div class="goBackArrow"></div>
            <h1 class="text-title font-bold">Indicatieve test</h1>
        </div>
        <HomeType @itemSelected="handleItemSelectedFromType" />
        <Heating @selectedHeatingType="handleSelectedHeatingType" @selectedHeatingSystem="handleSelectedHeatingSystem"
            @selectedWaterHeatingSystem="handleSelectedWaterHeatingSystem" />
        <a href=""></a>
        <div class="h-[100px] w-screen"></div>
        <!-- Now you can use selectedItemFromType here -->
    </section>
</template>

<style scoped></style>