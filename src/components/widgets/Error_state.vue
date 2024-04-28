<template>
    <div class="flex justify-center items-center flex-col">
        <img src="/error_state.svg" alt="error state">
        <p class="text-btn font-bold text-secondary-red relative left-[42px] pt-[12px]">{{ props.text }}</p>
    </div>
</template>

<script setup>

const props = defineProps({
    text: {
        type: String,
        required: false,
        default: 'Er is een fout opgetreden. Probeer het later opnieuw.'
    }
});
</script>