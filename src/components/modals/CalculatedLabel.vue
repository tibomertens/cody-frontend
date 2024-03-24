<template>
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-offBlack bg-opacity-50 w-full"
        @click="handleOutsideClick">
        <div class="bg-offWhite-dark p-8 rounded-lg shadow-md w-[85%] xs:w-[450px]">
            <div>
                <div class="flex justify-between">
                    <h2 class="text-subtitle font-bold mb-4">Berekend label</h2>
                    <p @click="toggleDisclaimer"
                        class="disclaimer font-light text-sm cursor-pointer underline text-primary-dark relative top-[5px]">Disclaimer
                    </p>
                </div>
                <div class="flex justify-center items-center">
                    <img class="w-[150px]" :src="props.labelData.label + '-label.svg'" alt="Your label">
                </div>
                <p v-if="showDisclaimer" class="font-light text-sm mt-2">{{ props.labelData.disclaimer }}</p>
            </div>
            <div>
                <h2 class="text-subtitle font-bold mt-4 mb-4">Doel instellen</h2>
                <Dropdown :label="'Energielabel'" :width="'full'" :items="doelen" :bold="true" />
                <Input :label="'Doeljaar'" :width="'full'" :placeholder="'Bv. 2036'" />
            </div>
            <div class="mt-[46px] flex justify-end">
                <Btn name="Opslaan" :width="'full'" />
            </div>
        </div>
    </div>
</template>

<script setup>
import Btn from '../UI/Btn.vue';
import Dropdown from '../UI/Dropdown.vue';
import Input from '../UI/Input.vue';

import { ref, watch } from 'vue';

const props = defineProps({
    showModal: Boolean,
    labelData: Object,
});

const showDisclaimer = ref(false);

function toggleDisclaimer() {
    showDisclaimer.value = !showDisclaimer.value;
}

const doelen = [
    { name: 'A+', title: 'A+' },
    { name: 'A', title: 'A' },
    { name: 'B', title: 'B' },
    { name: 'C', title: 'C' },
    { name: 'D', title: 'D' },
    { name: 'E', title: 'E' },
    { name: 'F', title: 'F' },
];

const showModal = ref(false);

const emit = defineEmits(['closeModal']);

const closeModal = () => {
    showModal.value = false;
    emit('closeModal');
};

const handleOutsideClick = (event) => {
    if (event.target === event.currentTarget) {
        closeModal();
    }
};

// watch to see if showModal prop changes
watch(() => props.showModal, (value) => {
    showModal.value = value;
});
</script>