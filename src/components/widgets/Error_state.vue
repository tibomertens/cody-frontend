<template>
    <div class="flex justify-center items-center flex-col pt-[50px]">
        <img src="/error_state.svg" alt="error state" class="pr-[42px] lg:pr-[0px]">
        <p class="text-btn font-bold text-secondary-red lg:pl-[42px] pt-[12px]">{{ props.text }}</p>
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