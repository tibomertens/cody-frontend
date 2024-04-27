<template>
    <div class="flex justify-center items-center flex-col">
        <img src="/empty_state.svg" alt="empty state">
        <p class="text-btn font-bold text-primary-dark relative right-[42px] pt-[12px]">{{ props.text }}</p>
    </div>
</template>

<script setup>

const props = defineProps({
    text: {
        type: String,
        required: false,
        default: 'Er zijn geen resultaten gevonden.'
    }
});
</script>