<template>
    <div class="donut-chart" :style="{ width: size + 'px', height: size + 'px' }">
        <svg viewBox="0 0 100 100">
            <circle :stroke="props.bg" class="donut" :cx="center" :cy="center" :r="radius" :stroke-width="strokeWidth"
                :stroke-dasharray="circumference" :stroke-dashoffset="0" />
            <circle :stroke="ringColor" class="donut-ring" :cx="center" :cy="center" :r="radius" :stroke-width="strokeWidth"
                :stroke-dasharray="circumference" :stroke-dashoffset="offset" :style="{ transition: 'stroke-dashoffset 0.5s ease-in-out' }" />
            <text :fill="ringColor" class="donut-text" x="50%" y="50%" dominant-baseline="middle" text-anchor="middle">{{ percent
                }}%</text>
        </svg>
    </div>
</template>

<script setup>
import { defineProps, computed, ref } from 'vue';

const props = defineProps({
    percent: Number,
    bg: String,
});

const size = ref(100);
const strokeWidth = ref(10);
const radius = 40;
const center = 50;
const circumference = 2 * Math.PI * radius;

const ringColor = computed(() => {
    return props.percent === 100 ? '#33CC00' : '#0072FF';
});

const offset = computed(() => {
    const progress = (100 - props.percent) / 100;
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