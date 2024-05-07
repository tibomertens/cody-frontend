<template>
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-offBlack bg-opacity-50 w-full"
        @click="handleOutsideClick">
        <div class="bg-offWhite-dark p-8 rounded-lg shadow-md w-[85%] xs:w-[450px]">
            <h2 class="font-bold text-subtitle mb-[12px]">Gegevens invullen</h2>
            <Input :label="'Titel:'" @input-change="updateTitle" :error="inputHasError" />
            <Input :label="'Datum:'" @input-change="updateDate" :error="inputHasError"
                type="datetime-local" />
            <Input :label="'Description'" @input-change="updateDescription"
                :error="inputHasError" />
            <div class="w-full mt-[32px] grid gap-[24px]">
                <Btn :name="'Opslaan'" :width="'full'" @click="add" />
                <p v-if="error" class="text-secondary-red">{{ error }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from "vue";

import Btn from "../UI/Btn.vue";
import Input from "../UI/Input.vue";

import { createTask } from "../../functions/tasks";

const props = defineProps({
    showModal: {
        type: Boolean,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
});

const showModal = ref(false);

let error = ref("");
let inputHasError = ref(false);
let title = ref("");
let date = ref("");
let description = ref("");

const emit = defineEmits(["closeModal", "addTask"]);

const add = async () => {
    if (!title.value || !date.value || !description.value) {
        error.value = "Vul alle velden in";
        inputHasError.value = true;
        return;
    }

    const task = {
        user: props.userId,
        title: title.value,
        date: date.value,
        description: description.value,
    };

    const result = await createTask(task);

    if (!result.success) {
        error.value = result.error;
        inputHasError.value = true;
        return;
    }

    emit("addTask");
    closeModal();
};

const updateDate = (x) => {
    date.value = x;
};

const updateTitle = (x) => {
    title.value = x;
};

const updateDescription = (x) => {
    description.value = x;
};

// watch to see if showModal prop changes
watch(
    () => props.showModal,
    (value) => {
        showModal.value = value;
    }
);

// watch to see if id prop changes
watch(
    () => props.id,
    (value) => {
        id.value = value;
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