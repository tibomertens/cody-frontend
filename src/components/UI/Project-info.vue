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
    },
    budget: {
        type: Boolean,
        default: false,
    },
    suggestion: {
        type: Boolean,
        default: false,
    }
});

import { formatFinancialNumber } from '../../functions/helpers';

</script>

<template>
    <div class="rounded-[5px] flex-1"
        :class="{ 'bg-offWhite-light': props.light === true, 'bg-offWhite-dark': props.light !== true }">
        <div class="flex gap-[32px] justify-center items-center py-[32px]" :class="{'pl-[32px]': props.suggestion}">
            <div class="w-[46px] h-[46px] hidden xxxs:block"><img class="w-full h-full" :src="src" alt="icon"></div>
            <div>
                <p class="font-bold text-[1.1em]">{{ label }}</p>
                <p v-if="props.budget === true" class="font-light text-[0.9em]" :class="{'text-secondary-red !font-bold': text < 0}">{{ formatFinancialNumber(props.text) }}</p>
                <p v-else class="font-light text-[0.9em]" :class="{'text-secondary-red font-bold': text < 0}">{{ text }}</p>
            </div>
        </div>
    </div>
</template>