<template>
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-offBlack bg-opacity-50 w-full"
        @click="handleOutsideClick">
        <div class="bg-offWhite-dark p-8 rounded-lg shadow-md w-[85%] xs:w-[450px]">
            <h2 class="font-bold text-subtitle mb-[12px]">Gegevens aanpassen</h2>
            <Input :label="'Titel:'" @input-change="updateTitle" :value="title" :error="inputHasError" />
            <Input :label="'Datum:'" @input-change="updateDate" :error="inputHasError" :value="date"
                type="datetime-local" />
            <Input :label="'Description'" :value="description" @input-change="updateDescription"
                :error="inputHasError" />
            <div class="w-full mt-[32px] grid gap-[24px]">
                <Btn :name="'Opslaan'" :width="'full'" @click="update" />
                <p v-if="error" class="text-secondary-red">{{ error }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from "vue";

import Btn from "../UI/Btn.vue";
import Input from "../UI/Input.vue";

import { updateTask } from "../../functions/tasks";

const props = defineProps({
    showModal: {
        type: Boolean,
        required: true,
    },
    task: {
        type: [Object, null],
        required: true,
    },
});

const showModal = ref(false);

let error = ref("");
let inputHasError = ref(false);
let title = ref("");
let date = ref("");
let description = ref("");
let id = ref("");

const emit = defineEmits(["closeModal", "updateTask"]);

const update = async () => {
    if (!title.value || !date.value || !description.value) {
        error.value = "Vul alle velden in";
        inputHasError.value = true;
        return;
    }

    const task = {
        title: title.value,
        date: date.value,
        description: description.value,
    };

    const result = await updateTask(id.value, task);

    if (!result.success) {
        error.value = result.error;
        inputHasError.value = true;
        return;
    }

    emit("updateTask");
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

// watch to see if task prop changes
watch(
    () => props.task,
    (value) => {
        title.value = value.title;
        date.value = value.date;
        description.value = value.description;
        // Parse the date string into a Date object
        const originalDate = new Date(date.value);

        // Add 2 hours to the date
        originalDate.setHours(originalDate.getHours() + 2);

        // Format the adjusted date to match the format expected by datetime-local input (YYYY-MM-DDTHH:MM)
        const formattedDate = originalDate.toISOString().slice(0, 16); date.value = formattedDate;
        id.value = value._id;
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
