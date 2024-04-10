<template>
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-offBlack bg-opacity-50 w-full"
        @click="handleOutsideClick">
        <div class="bg-offWhite-dark p-8 rounded-lg shadow-md w-[85%] xs:w-[450px]">
            <h2 class="font-bold text-subtitle mb-[12px]">Gegevens invullen</h2>
            <Input :label="'Startdatum'" @input-change="updateDate" :value="currentDate" />
            <Input :label="'Budget voor deze renovatie'" :placeholder="'bv. 2350'" pre-fix="€"
                @input-change="updateBudget" />
            <Input :label="'Aantal te renoveren delen'" :placeholder="'bv. 12'" @input-change="updateAmount" />
            <div class="w-full mt-[32px] grid gap-[24px]">
                <Btn :name="'Opslaan'" :width="'full'" />
                <GhostBtn :name="'Annuleren'" :width="'full'" @click="closeModal" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from "vue";

import Btn from "../UI/Btn.vue";
import GhostBtn from "../UI/Ghost-btn.vue";
import Input from "../UI/Input.vue";

const props = defineProps({
    showModal: {
        type: Boolean,
        required: true,
    },
});

const showModal = ref(false);
let currentDate = new Date().toLocaleDateString();
let filledInDate = ref(currentDate);
let budget = ref("");
let amount = ref("");

const updateDate = (x) => {
    filledInDate.value = x;
    console.log(filledInDate.value);
};

const updateBudget = (x) => {
    budget.value = x;
};

const updateAmount = (x) => {
    amount.value = x;
};

// watch to see if showModal prop changes
watch(
    () => props.showModal,
    (value) => {
        showModal.value = value;
    }
);

const handleOutsideClick = (event) => {
    if (event.target === event.currentTarget) {
        closeModal();
    }
};

const closeModal = () => {
    showModal.value = false;
    emit("closeModal");
};
</script>