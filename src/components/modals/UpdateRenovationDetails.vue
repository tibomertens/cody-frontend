<template>
    <div>
        <!-- Main Modal -->
        <div v-if="showModal"
            class="fixed inset-0 z-50 flex items-center justify-center bg-offBlack bg-opacity-50 w-full"
            @click="handleOutsideClick">
            <div class="bg-offWhite-dark p-8 rounded-lg shadow-md w-[85%] xs:w-[450px]">
                <h2 class="font-bold text-subtitle mb-[12px]">Gegevens invullen</h2>
                <Input :label="'Startdatum'" @input-change="updateDate" :type="'date'" :value="props.startDate"
                    :error="inputHasError" />
                <Input :label="'Budget voor deze renovatie'" :value="props.budget" pre-fix="€"
                    @input-change="updateBudget" :error="inputHasError" />
                <Input :label="'Aantal te renoveren delen'" :value="props.amountTotal" @input-change="updateAmount"
                    :error="inputHasError" />
                <div class="w-full mt-[32px] grid gap-[24px]">
                    <Btn :name="'Opslaan'" :width="'full'" @click="updateData" />
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
import { ref, warn, watch, defineProps, defineEmits } from "vue";

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
    userBudget: {
        type: Number,
        required: true,
    },
    previousBudget: {
        type: Number,
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

let showModal = ref(false);
let showWarningModal = ref(false);

let filledInDate = ref('');
let budget = ref('');
let amount = ref('');

let error = ref("");
let inputHasError = ref(false);
let warning = ref("");
let executeWithWarning = ref(false);

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

    let body = {
        startDate: filledInDate.value,
        budget: budget.value,
        amount_total: amount.value,
    };

    if ((parseInt(budget.value) - parseInt(props.previousBudget)) > parseInt(props.userBudget) && !executeWithWarning.value && (parseInt(budget.value) - parseInt(props.previousBudget)) > 0) {
        warning.value = "Het budget dat je wilt instellen is hoger dan je huidige budget";
        showWarningModal.value = true;
    } else {
        await updateUserData(props.userId, props.renovationId, body);
        emit("updateData");
        closeModal();
    }
};

const updateData = () => {
    executeUpdateData();
};

watch(
    () => props.showModal,
    (value) => {
        showModal.value = value;
        filledInDate.value = props.startDate;
        budget.value = props.budget;
        amount.value = props.amountTotal;
        // const formattedDate = new Date(filledInDate.value).toISOString().slice(0, 16);
        // filledInDate.value = formattedDate;
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