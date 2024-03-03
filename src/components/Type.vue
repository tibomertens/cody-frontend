<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    itemName: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }
});

const emit = defineEmits(['itemSelected']);

const selectItem = () => {
    emit('itemSelected', props.itemName);
}
</script>

<template>
    <div @click="selectItem" class="bg-[#FDFDFD] h-[215px] rounded-[5px] flex flex-col justify-center items-center">
        <div class="mb-[24px]">
            <img :src="imageUrl" :alt="itemName">
        </div>
        <p class="mb-[12px]">{{ itemName }}</p>
        <div class="w-[15px] h-[15px] rounded-full bg-[#EDF0F5]"></div>
    </div>
</template>

<style scoped></style>
