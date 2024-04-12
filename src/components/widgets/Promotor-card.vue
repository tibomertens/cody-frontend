<script setup>

import { ref, defineProps } from "vue";

const props = defineProps(["promotor"]);
</script>

<template>
    <div class="flex justify-center pt-[10px] font-bold sm:w-[50%] lg:w-[15%]">
        {{ promotor.name }}
    </div>
    <div class="flex justify-center pt-[10px] sm:w-[50%] lg:w-[15%] lg:text-center">
        {{ promotor.location }}
    </div>
    <div class="flex justify-center pt-[10px] sm:w-[50%] lg:w-[15%] lg:text-center">
        {{ promotor.phoneNumber }}
    </div>
    <div
        class="flex justify-center pt-[10px] pb-[10px] items-center lg:justify-end gap-[10px] sm:w-[50%] lg:w-[15%] lg:text-right">
        <i class="fa-solid fa-star" style="color: #ff9900;"></i>
        <p>5/5</p>
        <a href="#" class="underline">Reviews</a>
    </div>
</template>

<style scoped></style>