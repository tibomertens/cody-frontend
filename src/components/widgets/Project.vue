<script setup>
import ProjectInfo from '../UI/Project-info.vue';

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
        type: Array,
        required: true
    },
    label: {
        type: Array,
        required: true
    },
    text: {
        type: Array,
        required: true
    },
    suggestion: {
        type: Boolean,
        required: false,
        default: false
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
            <div class="grid grid-cols-1 xs:grid-cols-2 ml:grid-cols-3 gap-[20px] mt-[32px]" :class="{'xs:!grid-cols-2': props.suggestion === true}">
                <ProjectInfo :src="src[0]" :text="text[0]" :label="label[0]" />
                <ProjectInfo :src="src[1]" :text="text[1]" :label="label[1]" />
                <div class="xs:col-span-2 ml:col-span-1" :class="{'xs:!col-span-2': props.suggestion === true}">
                    <ProjectInfo :src="src[2]" :text="text[2]" :label="label[2]" />
                </div>
            </div>
        </div>
    </div>
</template>