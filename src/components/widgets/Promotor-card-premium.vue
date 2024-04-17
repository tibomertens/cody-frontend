<script setup>

import { ref, defineProps } from "vue";
import Btn from "../UI/Btn.vue";

const props = defineProps(["promotor"]);
</script>

<template>
    <div class="w-full sm:flex">
        <div class="w-full sm:w-[50%] lg:w-[33%] flex justify-center p-[20px] lg:justify-start">
            <img src="/kelder.svg" alt="">
        </div>
        <div class="sm:w-[50%] lg:flex md:w-[66%] h-full lg:justify-between lg:items-center">
            <div>
                <div class="flex justify-center sm:justify-start pt-[10px] font-bold sm:w-[50%] lg:w-full">
                    {{ promotor.name }}
                </div>
                <div class="flex justify-center sm:justify-start pt-[10px] lg:w-full lg:text-center">
                    {{ promotor.address }}
                </div>
                <div class="flex justify-center sm:justify-start pt-[10px] lg:w-full lg:text-center">
                    {{ promotor.phoneNumber }}
                </div>
            </div>
            <div>
                <div
                    class="mt-[16px] flex justify-center pt-[10px] pb-[10px] items-center sm:justify-start lg:justify-end gap-[10px] sm:w-[50%] lg:w-[100%] lg:text-right">
                    <div class="sm:min-w-[153px]"><img src="/4stars.svg" alt="4 stars"></div>
                    <p>5/5</p>
                    <a href="#" class="underline">Reviews</a>
                </div>
                <div class="mt-[16px] mb-[16px] flex justify-center align-middle sm:w-full lg:w-full">
                    <Btn text="Ga naar website" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>