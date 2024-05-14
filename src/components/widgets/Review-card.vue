<script setup>
import { defineProps } from "vue";
import {convertDate} from "../../functions/helpers.js";
const props = defineProps(["review"]);
</script>

<template>
    <div class="mt-[24px] mb-[20px] font-bold text-btn" >
        {{ review.rating }}
    </div>
    <div class="mb-[12px] font-bold text-subtitle">
        {{ review.title }}
    </div>
    <div class="mb-[24px]">
        {{ review.description }}
    </div>
    <div class="mb-[24px] text-right text-xs">
        {{convertDate(review.date)}}
    </div>
</template>

<style scoped></style>
