<template>
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-offBlack bg-opacity-50 w-full"
        @click="handleOutsideClick">
        <div class="bg-offWhite-dark p-8 rounded-lg shadow-md w-[85%] xs:w-[450px]">
            <h2 class="font-bold text-subtitle mb-[12px]">Gegevens invullen</h2>
            <Input :label="'Startdatum'" @input-change="updateDate" :value="props.startDate" :error="inputHasError" />
            <Input :label="'Budget voor deze renovatie'" :value="props.budget" pre-fix="€" @input-change="updateBudget"
                :error="inputHasError" />
            <Input :label="'Aantal te renoveren delen'" :value="props.amountTotal" @input-change="updateAmount"
                :error="inputHasError" />
            <div class="w-full mt-[32px] grid gap-[24px]">
                <Btn :name="'Opslaan'" :width="'full'" @click="updateData" />
                <p v-if="error" class="text-secondary-red">{{ error }}</p>
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

import { updateUserData } from "../../functions/renovation";

const props = defineProps({
    showModal: {
        type: Boolean,
        required: true,
    },
    renovationId: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    amountTotal: {
        type: Number,
        required: true,
    },
    budget: {
        type: Number,
        required: true,
    },
    startDate: {
        type: String,
        required: true,
    },
});

const showModal = ref(false);

let filledInDate = ref('');
let budget = ref('');
let amount = ref('');

let error = ref("");
let inputHasError = ref(false);

const emit = defineEmits(["closeModal", "updateData"]);

const updateDate = (x) => {
    filledInDate.value = x;
};

const updateBudget = (x) => {
    budget.value = x;
};

const updateAmount = (x) => {
    amount.value = x;
};

const updateData = async () => {
    // check if all fields are filled in
    if (!filledInDate.value || !budget.value || !amount.value) {
        error.value = "Vul alle velden in";
        inputHasError.value = true;
        return;
    }
    // check if budget and amount are numbers
    if (isNaN(budget.value) || isNaN(amount.value)) {
        error.value = "Budget en aantal moeten getallen zijn";
        inputHasError.value = true;
        return;
    }
    // check if date is of format dd-mm-yyyy
    let dateRegex = /^\d{2}-\d{2}-\d{4}$/;
    if (!filledInDate.value.match(dateRegex)) {
        error.value = "Datum moet in formaat dd-mm-yyyy";
        inputHasError.value = true;
        return;
    }

    let body = {
        startDate: filledInDate.value,
        budget: budget.value,
        amount_total: amount.value,
    };

    await updateUserData(props.userId, props.renovationId, body);
    emit("updateData");
    closeModal();
};

// watch to see if showModal prop changes
watch(
    () => props.showModal,
    (value) => {
        showModal.value = value;
        filledInDate.value = props.startDate;
        budget.value = props.budget;
        amount.value = props.amountTotal;
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