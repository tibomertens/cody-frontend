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
    },
    light: {
        type: Boolean,
        required: false
    }
});

</script>

<template>
    <div class="rounded-[5px] flex-1"
        :class="{ 'bg-offWhite-light': props.light === true, 'bg-offWhite-dark': props.light !== true }">
        <div class="flex gap-[32px] justify-center py-[32px]">
            <div class="w-[46px] h-[46px]"><img class="w-full h-full" :src="src" alt="icon"></div>
            <div>
                <p class="font-bold text-[1.1em]">{{ label }}</p>
                <p class="font-light text-[0.9em]">{{ text }}</p>
            </div>
        </div>
    </div>
</template>