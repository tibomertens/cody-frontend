<script setup>
import { ref, onMounted, onBeforeUnmount, watch, defineProps, defineEmits } from 'vue';
import { convertDate } from "../../functions/helpers.js";
import { deleteReview } from '../../functions/reviews.js';
import { useRouter } from 'vue-router';

import Confirm from '../modals/Confirm.vue';

const props = defineProps(["review", "loggedInUserId"]);
const menuVisible = ref(false);
const emit = defineEmits(['review-deleted']);
const cardUserId = ref(props.loggedInUserId);

const showConfirm = ref(false);

const router = useRouter();

watch(() => props.loggedInUserId, (newValue) => {
    cardUserId.value = newValue;
});

const toggleMenu = (event) => {
    event.preventDefault();
    menuVisible.value = !menuVisible.value;
};

const openConfirm = () => {
    showConfirm.value = true;
};

const closeModal = () => {
    showConfirm.value = false;
    emit("closeModal");
};

const handleClickOutside = (event) => {
    if (menuVisible.value && !event.target.closest('.menu-container')) {
        menuVisible.value = false;
    }
};

const handleDelete = async () => {
    try {
        const result = await deleteReview(props.review._id);
        emit('review-deleted', props.review._id);
    } catch (error) {
        console.error('Failed to delete review:', error);
    }
};

const handleEdit = () => {
    router.push(`/reviews/update/${props.review._id}`);
};

onMounted(() => {
    document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
    <div class="flex justify-between items-center mb-[20px]">
        <div class="flex items-center gap-[12px]">
            <div class="font-bold text-btn">
                {{ review.rating }}
            </div>
            <div class="gap-[6px] flex">
                <img v-for="index in 5" :key="index"
                    :src="index <= review.rating ? '/1star_select.svg' : '/1star_noSelect.svg'" alt="star"
                    class="w-[20px]" />
            </div>

        </div>
        <div v-if="props.review.userId === props.loggedInUserId" class="menu-container">
            <a href="#" class="fa-solid fa-ellipsis-vertical text-[20px] text-primary-dark" @click="toggleMenu"></a>
            <div v-if="menuVisible"
                class="absolute right-[64px] mt-2 w-48 bg-offWhite-light border-primary-dark border-2 rounded-md z-10">
                <div class="w-full flex flex-col">
                    <button @click="handleEdit"
                        class="w-full px-4 py-2 text-left text-sm text-primary-dark hover:bg-offWhite-dark flex items-center justify-center">
                        <i class="fa-solid fa-pencil mr-2"></i><span>Aanpassen</span>
                    </button>
                    <button @click="openConfirm"
                        class="w-full px-4 py-2 text-left text-sm text-secondary-red hover:bg-offWhite-dark flex items-center justify-center">
                        <i class="fa-regular fa-trash-can mr-2"></i><span>Verwijderen</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div class="mb-[12px] font-semibold text-[20px]">
        {{ review.title }}
    </div>
    <div class="mb-[24px] w-full break-words">
        {{ review.description }}
    </div>
    <div class="text-right text-xs">
        {{ convertDate(review.date) }}
    </div>
    <Confirm :showConfirm="showConfirm" title="Review verwijderen"
        desc="Weet je zeker dat je deze review wilt verwijderen?" @closeConfirm="showConfirm = false"
        @confirmAction="handleDelete" />
</template>

<style scoped></style>
