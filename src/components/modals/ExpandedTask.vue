<template>
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-offBlack bg-opacity-50 w-full"
        @click="handleOutsideClick">
        <div class="bg-offWhite-dark rounded-lg shadow-md w-[85%] xs:w-[450px]">
            <div class="bg-primary-dark p-8 rounded-t-[0.5rem]">
                <h1 class="text-offWhite-light font-bold text-subtitle">{{ title }}</h1>
            </div>
            <div class="p-8">
                <div class="flex justify-between">
                    <div class="flex justify-center items-center gap-[20px]"><img src="/date.svg" alt="date icon">
                        <p>{{ formatDate(date) }}</p>
                    </div>
                    <div class="flex justify-center items-center gap-[20px]"><img src="/time.svg" alt="time icon">
                        <p>{{ formatTime(date) }}</p>
                    </div>
                </div>
                <div class="my-[32px] font-light">
                    <p>{{ description }}</p>
                </div>
                <div class="flex gap-[24px]">
                    <a class="h-[48px] w-full cursor-pointer bg-offWhite-light rounded-[5px] text-black text-[16px] text-center flex items-center justify-center"
                        @click="handleUpdate">
                        <img src="/edit_blue.svg" alt="edit icon">
                        <p class="relative bottom-[1px] ml-[16px]">Bewerk</p>
                    </a>
                    <a class="h-[48px] w-full cursor-pointer bg-offWhite-light rounded-[5px] text-black text-[16px] text-center flex items-center justify-center"
                        @click="openConfirm">
                        <img src="/delete_red.svg" alt="delete icon">
                        <p class="relative bottom-[1px] ml-[16px]">Verwijder</p>
                    </a>
                </div>
            </div>
        </div>
    </div>
    <Confirm :showConfirm="showConfirm" title="Weet je zeker dat je deze taak wilt verwijderen?" @closeConfirm="showConfirm = false"
        @confirmAction="handleRemove" />
</template>

<script setup>
import { ref, watch } from "vue";

import { formatDate, formatTime } from "../../functions/helpers";
import { removeTask } from "../../functions/tasks";

import Confirm from "./Confirm.vue";

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
const showConfirm = ref(false);

let title = ref("");
let date = ref("");
let description = ref("");
let id = ref("");

const emit = defineEmits(["closeModal", "updateTask", "removeTask"]);

const handleUpdate = () => {
    closeModal();
    emit("updateTask");
};

const openConfirm = () => {
    showConfirm.value = true;
};

const handleRemove = async () => {
    const result = await removeTask(id.value);
    if (!result.success) {
        console.error(result.error);
        return;
    }
    showConfirm.value = false;
    closeModal();
    emit("removeTask");
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
