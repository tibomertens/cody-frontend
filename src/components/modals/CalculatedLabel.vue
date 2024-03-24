<template>
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-offBlack bg-opacity-50 w-full"
        @click="handleOutsideClick">
        <div class="bg-offWhite-dark p-8 rounded-lg shadow-md w-[85%] xs:w-[450px]">
            <div>
                <div class="flex justify-between">
                    <h2 class="text-subtitle font-bold mb-4">Berekend label</h2>
                    <p @click="toggleDisclaimer"
                        class="disclaimer font-light text-sm cursor-pointer underline text-primary-dark relative top-[5px]">
                        Disclaimer
                    </p>
                </div>
                <div class="flex justify-center items-center">
                    <img class="w-[150px]" :src="props.labelData.label + '-label.svg'" alt="Your label">
                </div>
                <p v-if="showDisclaimer" class="font-light text-sm mt-2">{{ props.labelData.disclaimer }}</p>
            </div>
            <div>
                <h2 class="text-subtitle font-bold mt-4 mb-4">Doel instellen</h2>
                <Dropdown :label="'Energielabel'" :width="'full'" :items="goals" :bold="true"
                    @itemSelected="handleLabelGoal" />
                <Input :label="'Doeljaar'" :width="'full'" :placeholder="'Bv. 2036'" @input-change="updateGoalYear" />
                <p v-if="yearError" class="text-secondary-red">{{ yearError }}</p>
            </div>
            <div class="mt-[46px] flex justify-end">
                <Btn name="Opslaan" :width="'full'" @click="addLabelToUser" />
            </div>
        </div>
    </div>
</template>

<script setup>
import Btn from '../UI/Btn.vue';
import Dropdown from '../UI/Dropdown.vue';
import Input from '../UI/Input.vue';

import { addLabel } from '../../functions/label'

import { ref, watch } from 'vue';
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
    showModal: Boolean,
    labelData: Object,
    userId: String,
});

const showDisclaimer = ref(false);

function toggleDisclaimer() {
    showDisclaimer.value = !showDisclaimer.value;
}

const goals = [
    { name: 'A+', title: 'A+' },
    { name: 'A', title: 'A' },
    { name: 'B', title: 'B' },
    { name: 'C', title: 'C' },
    { name: 'D', title: 'D' },
    { name: 'E', title: 'E' },
    { name: 'F', title: 'F' },
];

const showModal = ref(false);
let goalValue = ref(null);
let goalYear = ref(null);
let yearError = ref(null);

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

const handleLabelGoal = (selectedGoal) => {
    goalValue.value = selectedGoal;
};

const updateGoalYear = (year) => {
    goalYear.value = year;
};

const addLabelToUser = async () => {
    if (!/^\d{4}$/.test(goalYear.value)) {
        yearError = 'Vul een geldig jaartal in';
    } else {
        const items = {
            goalLabel: goalValue.value,
            goalLabel_by_year: goalYear.value,
        };

        const labelAdded = await addLabel(items, props.userId);
        
        if (labelAdded) {
            router.push('/');
        }
    }
};

// watch to see if showModal prop changes
watch(() => props.showModal, (value) => {
    showModal.value = value;
});
</script>