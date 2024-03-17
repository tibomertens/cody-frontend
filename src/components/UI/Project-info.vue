<script setup>

const props = defineProps({
    src: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: true
    }
});

</script>

<template>
    <div class="bg-offWhite-dark rounded-[5px] flex-1">
        <div class="flex gap-[32px] justify-center py-[32px]">
            <img :src="src" alt="icon">
            <div>
                <p class="font-bold text-[1.1em]">{{ label }}</p>
                <p class="font-light text-[0.9em]">{{ text }}</p>
            </div>
        </div>
    </div>
</template>