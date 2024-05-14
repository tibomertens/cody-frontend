<script setup>

import { ref, defineProps } from "vue";
import {formatPhoneNumber} from "../../functions/helpers.js";
import {useRouter} from "vue-router";

const props = defineProps(["promotor"]);

const router = useRouter();


</script>

<template>
    <div class="flex justify-center pt-[10px] font-bold sm:w-[50%] lg:w-[15%]">
        {{ promotor.name }}
    </div>
    <div class="flex justify-center pt-[10px] sm:w-[50%] lg:w-[15%] lg:text-center">
        {{ promotor.location }}
    </div>
    <a class="flex justify-center pt-[10px] sm:w-[50%] lg:w-[15%] lg:text-center" :href="'tel:' + promotor.phoneNumber">{{ formatPhoneNumber(promotor.phoneNumber) }}</a>
    <div
        class="flex justify-center pt-[10px] pb-[10px] items-center lg:justify-end gap-[10px] sm:w-[50%] lg:w-[15%] lg:text-right">
        <i class="fa-solid fa-star" style="color: #ff9900;"></i>
        <p>5/5</p>
        <a :href="'/reviews/' + promotor._id" class="underline">Reviews</a>
    </div>
</template>

<style scoped></style>