<template>
    <div class="donut-chart" :style="{ width: size + 'px', height: size + 'px' }">
        <svg viewBox="0 0 100 100">
            <circle :stroke="props.bg" class="donut" :cx="center" :cy="center" :r="radius" :stroke-width="strokeWidth"
                :stroke-dasharray="circumference" :stroke-dashoffset="0" />
            <circle :stroke="ringColor" class="donut-ring" :cx="center" :cy="center" :r="radius"
                :stroke-width="strokeWidth" :stroke-dasharray="circumference" :stroke-dashoffset="offset"
                :style="{ transition: 'stroke-dashoffset 0.5s ease-in-out' }" />
            <text :fill="ringColor" class="donut-text" x="50%" y="50%" dominant-baseline="middle"
                text-anchor="middle">{{ percentValue
                }}%</text>
        </svg>
    </div>
</template>

<script setup>
import { defineProps, computed, ref, watch } from 'vue';

const props = defineProps({
    percent: Number,
    bg: String,
    paused: Boolean
});

// Initialize a reactive variable to hold the percent value
const percentValue = ref(props.percent);

// Watch for changes in the props.percent value and update the reactive variable
watch(() => props.percent, (newValue) => {
    if (isNaN(newValue)) {
        newValue = 0;
    }
    percentValue.value = newValue;
});

if (isNaN(props.percent)) {
    percentValue.value = 0;
}

const size = ref(100);
const strokeWidth = ref(10);
const radius = 40;
const center = 50;
const circumference = 2 * Math.PI * radius;

const ringColor = computed(() => {
    if (props.paused) {
        return '#FF9900';
    }
    return percentValue.value === 100 ? '#33CC00' : '#0072FF';
});

const offset = computed(() => {
    const progress = (100 - percentValue.value) / 100;
    return progress * circumference;
});
</script>

<style>
.donut-chart {
    position: relative;
}

text {
    font-weight: bold;
}

.donut {
    fill: transparent;
}

.donut-ring {
    fill: transparent;
}
</style>