<script setup>
import { onMounted, ref, watchEffect } from 'vue';

import ProjectInfo from '../UI/Project-info.vue';
import DonutChart from '../widgets/DonutChart.vue';

const props = defineProps({
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    src: {
        type: [Array, Promise],
        required: true
    },
    activeSrc: {
        type: [Array, Promise],
        required: false,
    },
    doneSrc: {
        type: [Array, Promise],
        required: false,
    },
    label: {
        type: [Array, Promise],
        required: true
    },
    activeLabel: {
        type: [Array, Promise],
        required: false,
    },
    doneLabel: {
        type: [Array, Promise],
        required: false,
    },
    text: {
        type: [Array, Promise],
        required: true
    },
    activeText: {
        type: [Array, Promise],
        required: false,
    },
    doneText: {
        type: [Array, Promise],
        required: false,
    },
    suggestion: {
        type: Boolean,
        required: false,
        default: false
    },
    stateFetcher: {
        type: Function,
        required: false,
    }
});

const state = ref(null);
let labels = ref([]);
let srcs = ref([]);
let texts = ref([]);
let percentRenovated = ref(0);

onMounted(() => {
    setItems();
});

const setItems = () => {
    if (props.stateFetcher !== undefined) {
        if (state.value === 'Actief') {
            labels.value = props.activeLabel;
            srcs.value = props.activeSrc;
        } else if (state.value === 'Voltooid') {
            labels.value = props.doneLabel;
            srcs.value = props.doneSrc;
        }
        else {
            labels.value = props.label;
            srcs.value = props.src;
        }
    } else  {
        labels.value = props.label;
        srcs.value = props.src;
        texts.value = props.text;
    }
};

watchEffect(async () => {
    if (props.stateFetcher !== undefined) {
        state.value = await props.stateFetcher();
        setItems();
    }
});

// Watch for changes in activeText and resolve the promise
watchEffect(async () => {
    if (props.stateFetcher !== undefined) {
        if (state.value === 'Actief') {
            if (props.activeText instanceof Promise) {
                texts.value = await props.activeText;
                percentRenovated.value = Math.round((parseInt(texts.value[3]) / parseInt(texts.value[2])) * 100);
            } else {
                texts.value = props.activeText;
                percentRenovated.value = Math.round((parseInt(texts.value[3]) / parseInt(texts.value[2])) * 100);
            }
        } else if (state.value === 'Voltooid') {
            if (props.doneText instanceof Promise) {
                texts.value = await props.doneText;
                percentRenovated.value = Math.round((parseInt(texts.value[3]) / parseInt(texts.value[2])) * 100);
            } else {
                texts.value = props.activeText;
                percentRenovated.value = Math.round((parseInt(texts.value[3]) / parseInt(texts.value[2])) * 100);
            }
        } else {
            texts.value = props.text;
        }
    }
});
</script>

<template>
    <div class="w-full bg-offWhite-light mb-[40px] rounded-[6px]" :class="{
        'border-l-4 border-secondary-green': text[0] === 'Laagste impact',
        'border-l-4 border-secondary-yellow': text[0] === 'Middelmatige impact',
        'border-l-4 border-secondary-red': text[0] === 'Hoogste impact'
    }">
        <div class="p-[32px]">
            <div>
                <h2 class="font-bold text-subtitle">{{ name }}</h2>
                <div class="mt-[12px]">
                    <p class="font-light overflow-hidden line-clamp-2">{{ desc }}</p>
                    <span class="text-primary-dark font-bold">Read more</span>
                </div>
            </div>
            <div class="grid grid-cols-1 xs:grid-cols-2 ml:grid-cols-3 gap-[20px] mt-[32px]"
                :class="{ 'xs:!grid-cols-2': props.suggestion === true }">
                <ProjectInfo v-if="srcs[0]" :src="srcs[0]" :text="texts[0]" :label="labels[0]" />
                <ProjectInfo v-if="state === 'Aanbevolen' && srcs[0]" :src="srcs[2]" :text="texts[2]" :label="label[2]" />
                <div v-else class="rounded-[5px] bg-offWhite-dark flex justify-center items-center">
                    <DonutChart :percent="percentRenovated" :bg="'#FDFDFD'" />
                </div>
                <div class="xs:col-span-2 ml:col-span-1" :class="{ 'xs:!col-span-2': props.suggestion === true }">
                    <ProjectInfo v-if="srcs[0]" :src="srcs[1]" :text="texts[1]" :label="labels[1]" />
                </div>
            </div>
        </div>
    </div>
</template>
