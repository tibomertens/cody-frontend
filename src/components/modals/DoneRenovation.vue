<template>
    <div>
        <!-- Main Modal -->
        <div v-if="showModal"
            class="fixed inset-0 z-50 flex items-center justify-center bg-offBlack bg-opacity-50 w-full"
            @click="handleOutsideClick">
            <div class="bg-offWhite-dark p-8 rounded-lg shadow-md w-[85%] xs:w-[450px]">
                <h2 class="font-bold text-subtitle mb-[12px]">Gegevens invullen</h2>
                <Input :label="'Eind datum:'" @input-change="updateDate" :value="currentDate" :type="'date'"
                    :error="inputHasError" />
                <Input :label="'Budget voor deze renovatie:'" :value="props.budget" pre-fix="€"
                    @input-change="updateBudget" :error="inputHasError" />
                <div class="w-full mt-[32px] grid gap-[24px]">
                    <Btn :name="'Opslaan'" :width="'full'" @click="executeUpdateData" />
                    <p v-if="error" class="text-secondary-red">{{ error }}</p>
                    <GhostBtn :name="'Annuleren'" :width="'full'" @click="closeModal" />
                </div>
            </div>
        </div>

        <!-- Warning Modal -->
        <div v-if="showWarningModal"
            class="fixed inset-0 z-50 flex items-center justify-center bg-offBlack bg-opacity-50 w-full">
            <div class="bg-offWhite-dark p-8 rounded-lg shadow-md w-[85%] xs:w-[450px]">
                <h2 class="font-bold text-subtitle mb-[12px]">Opgelet!</h2>
                <p>{{ warning }}</p>
                <div class="w-full mt-[32px] grid gap-[24px]">
                    <Btn :name="'Ga verder'" :width="'full'" @click="proceedWithWarning" />
                    <GhostBtn :name="'Annuleren'" :width="'full'" @click="cancelWarning" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from "vue";

import Btn from "../UI/Btn.vue";
import GhostBtn from "../UI/Ghost-btn.vue";
import Input from "../UI/Input.vue";

import { updateState } from "../../functions/renovation";

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
    userBudget: {
        type: Number,
        required: true,
    },
    previousBudget: {
        type: Number,
        required: true,
    },
    budget: {
        type: Number,
        required: true,
    },
    amountTotal: {
        type: Number,
        required: true,
    },
});

const showModal = ref(false);
let showWarningModal = ref(false);

let budget = ref("");

let error = ref("");
let inputHasError = ref(false);
let warning = ref("");
let executeWithWarning = ref(false);

// Get current date and format it as YYYY-MM-DD
const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

// Initialize the current date
let currentDate = ref(getCurrentDate());

let filledInDate = ref(currentDate);

const emit = defineEmits(["closeModal", "updateState"]);

const updateDate = (x) => {
    filledInDate.value = x;
};

const updateBudget = (x) => {
    budget.value = x;
};

const proceedWithWarning = () => {
    showWarningModal.value = false;
    executeWithWarning.value = true;
    executeUpdateData();
};

const cancelWarning = () => {
    showWarningModal.value = false;
};

const executeUpdateData = async () => {
    // check if all fields are filled in
    if (!filledInDate.value || !budget.value) {
        error.value = "Vul alle velden in";
        inputHasError.value = true;
        return;
    }

    // check if budget is all numbers
    if (isNaN(budget.value)) {
        error.value = "Budget en aantal moeten getallen zijn";
        inputHasError.value = true;
        return;
    }

    let body = {
        endDate: filledInDate.value,
        budget_final: budget.value,
        amount_total: props.amountTotal,
        status: "Voltooid"
    };

    if ((parseInt(budget.value) - parseInt(props.previousBudget)) > parseInt(props.userBudget) && !executeWithWarning.value && (parseInt(budget.value) - parseInt(props.previousBudget)) > 0) {
        warning.value = "Het budget dat je wilt instellen is hoger dan je huidige budget";
        showWarningModal.value = true;
    } else {
        await updateState(props.userId, props.renovationId, body);
        emit("updateState");
        closeModal();
    }
};

// watch to see if showModal prop changes
watch(
    () => props.showModal,
    (value) => {
        showModal.value = value;
        budget.value = props.budget;
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