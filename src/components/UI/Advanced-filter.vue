<template>
    <div class="relative">
        <div class="w-full h-[48px] bg-offWhite-light rounded-[5px] border-2 border-primary-dark flex items-center justify-between"
            @click="toggleDropdown" :class="{ 'rounded-b-[0] border-b-0': isDropdownOpen }">
            <p class="text-primary-dark font-bold text-btn ml-[24px] relative bottom-[1px]">Filters</p>
            <img :class="{ 'rotate-180': isDropdownOpen }" src="/public/dropdownIcon.svg" alt="dropdown icon"
                class="mr-[24px]">
        </div>
        <div v-if="isDropdownOpen"
            class="absolute top-[48px] left-0 w-full bg-offWhite-light z-50 border-2 border-t-0 border-primary-dark rounded-b-[5px]">
            <div class="p-[24px] pt-0 flex flex-col gap-[16px]">
                <Input :label="'Budget:'" :placeholder="'5000'" :pre-fix="'€'" class="mt-1" />
                <Dropdown :width="'full'" :label="'Meerwaarde voor label:'" :bold="true" :items="meerwaarde" />
                <Dropdown :width="'full'" :label="'Type renovatie:'" :bold="true" :items="type" />
                <Btn :name="'Filters toepassen'" :width="'full'" class="mt-[12px] text-[1rem]" />
                <div class="flex justify-center">
                    <p class="text-secondary-red">Wis filters</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Input from '../UI/Input.vue';
import Dropdown from '../UI/Dropdown.vue';
import Btn from '../UI/Btn.vue';

const meerwaarde = [
    { title: 'Hoog', name: 'high' },
    { title: 'Middel', name: 'medium' },
    { title: 'Laag', name: 'low' },
];

const type = [
    { title: 'Renovatie', name: 'Isolatie' },
    { title: 'Vensters', name: 'Vensters' },
    { title: 'Verwarming', name: 'Verwarming' },
    { title: 'Ventilatie', name: 'Ventilatie' },
    { title: 'Zonne-energie', name: 'Zonne-energie' },
    { title: 'Water', name: 'Water' },
];

const isDropdownOpen = ref(false);

const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value;
};
</script>

<style scoped></style>