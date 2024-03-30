<script setup>
import Input from '../UI/Input.vue';
import Dropdown from '../UI/Dropdown.vue';

</script>

<template>
    <div class="relative">
        <div
            class="w-full h-[48px] bg-offWhite-light rounded-[5px] border-2 border-primary-dark flex items-center justify-between">
            <p class="text-primary-dark font-bold text-btn ml-[32px] relative bottom-[1px]">Filters</p>
            <img src="/public/dropdownIcon.svg" alt="dropdown icon" class="mr-[32px]">
        </div>
        <div
            class="absolute top-[48px] left-0 w-full bg-offWhite-light z-50 border-2 border-t-0 border-gray rounded-b-[5px]">
            <div class="p-[24px] mt-[-32px] flex flex-col gap-[24px]">
                <Input :label="'Budget:'" :placeholder="'5000'" :pre-fix="'€'"/>
                <Dropdown :width="'full'" :label="'Meerwaarde voor label:'" :bold="true" />
                <Dropdown :width="'full'" :label="'Type renovatie:'" :bold="true"/>
            </div>
        </div>
    </div>

</template>

<style scoped></style>
