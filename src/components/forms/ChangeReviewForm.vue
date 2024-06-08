<script setup>
import { ref, onMounted, computed } from 'vue';
import Btn from '../UI/Btn.vue';
import Input from '../UI/Input.vue';
import { useRoute, useRouter } from "vue-router";
import { getReviewById, updateReview } from "../../functions/reviews.js";

const route = useRoute();
const router = useRouter();

let promotorId = ref("");
const selectedStars = ref(0); // Initially no stars selected
const updatedTitle = ref(''); // Initially no title
const updatedExperience = ref(''); // Initially no experience
const reviewData = ref([]);
const newReviewData = ref([]);
const hasError = ref(false);
const error = ref("");
const maxCharacters = 500;
const isCharacterLimitReached = ref(false); // New property to track character limit

let loadingState = ref(false);

// Computed property to track remaining characters
const remainingCharacters = computed(() => {
    return maxCharacters - updatedExperience.value.length;
});

// onMounted function
onMounted(async () => {
    promotorId.value = route.params.id;
    reviewData.value = await getReviewById(route.params.id);
    selectedStars.value = reviewData.value.rating;
    updatedTitle.value = reviewData.value.title; // Initialize with existing review title
    updatedExperience.value = reviewData.value.description; // Initialize with existing review description
    console.log(reviewData.value.promotorId);
});

// Method to handle star click event
const handleStarClick = (index) => {
    // Update selectedStars to index + 1
    selectedStars.value = index + 1;
}

const updateTitle = (value) => {
    updatedTitle.value = value;
    console.log(updatedTitle.value);
};

const updateExperience = (value) => {
    if (value.length <= maxCharacters) {
        updatedExperience.value = value;
        isCharacterLimitReached.value = false; // Reset limit flag if under max characters
    } else {
        updatedExperience.value = value.slice(0, maxCharacters); // Limit to max characters
        isCharacterLimitReached.value = true; // Set limit flag if over max characters
    }
};

const ChangeReview = async () => {
    if (updatedTitle.value === "" || updatedExperience.value === "" || selectedStars.value === 0) {
        hasError.value = true;
        error.value = "Vul alle velden in";
        return;
    }
    loadingState.value = true;

    hasError.value = false;
    error.value = "";

    newReviewData.value = await updateReview(reviewData.value.promotorId, reviewData.value.userId, reviewData.value._id, selectedStars.value, updatedTitle.value, updatedExperience.value);

    loadingState.value = false;

    if (newReviewData.value) {
        router.push("/reviews/" + reviewData.value.promotorId);
    }
};
</script>

<template>
    <h2 class="text-body font-bold">Jouw score</h2>
    <div class="flex gap-[10px] pt-[16px] cursor-pointer">
        <!-- Loop through 5 stars -->
        <img v-for="(star, index) in 5" :src="index < selectedStars ? '/1star_select.svg' : '/1star_noSelect.svg'"
            :alt="'Star ' + (index + 1)" @click="handleStarClick(index)" />
    </div>
    <Input :label="'Titel'" @input-change="updateTitle" :error="hasError" :value="updatedTitle" />
    <div class="mt-[32px] mb-[16px]">
        <p class="text-body font-bold pb-[16px]">Deel je ervaring</p>
        <div class="text-right mb-2">{{ remainingCharacters }} karakters over</div>
        <textarea id="experience"
            :class="[isCharacterLimitReached || hasError ? 'border-2 border-red-500' : 'border-2 border-offWhite-light']"
            @input="updateExperience($event.target.value)" v-model="updatedExperience"
            class="h-[202px] w-full rounded p-6 whitespace-pre-wrap break-words resize-none focus:border-primary-dark focus:outline-none"></textarea>
        <div v-if="isCharacterLimitReached" class="text-red-500">Je hebt het limiet van {{ maxCharacters }} karakters
            bereikt.</div>
    </div>
    <div v-if="hasError" class="text-red-500">{{ error }}</div>
    <div class="pt-[20px] mb-[40px]">
        <Btn :name="'Slaag aanpassingen op'" @click="ChangeReview" :loading="loadingState" />
    </div>
</template>

<style scoped></style>
