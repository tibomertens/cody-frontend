<script setup>
import { ref, onMounted } from 'vue';
import Btn from '../UI/Btn.vue';
import Input from '../UI/Input.vue';
import { isValidToken, getUser } from "../../functions/user.js";
import { useRoute, useRouter } from "vue-router";
import { createNewReview } from "../../functions/reviews.js";

const route = useRoute();
const router = useRouter();

const token = localStorage.getItem("token");
let userData = ref({});
let userId = ref("");
let promotorId = ref("");
const selectedStars = ref(0); // Initially no stars selected
const updatedTitle = ref(''); // Initially no title
const updatedExperience = ref(''); // Initially no experience
const reviewData = ref([]);
const hasError = ref(false);
const error = ref("");

//onmounted function
onMounted(async () => {
    if (isValidToken(token)) {
    userData.value = await getUser(token);
    userId.value = userData.value._id;
    promotorId.value = route.params.id;
  } else {
    router.push("/login");
  }
});

// Method to handle star click event
const handleStarClick = (index) => {
    // Update selectedStars to index + 1
    selectedStars.value = index + 1;
}

const updateTitle = (value) => {
    updatedTitle.value = value;
};

const updateExperience = (value) => {
    updatedExperience.value = value;
};

const CreateReview = async () => {
    if (updatedTitle.value === "" || updatedExperience.value === "" || selectedStars.value === 0) {
        hasError.value = true;
        error.value = "Vul alle velden in";
        return;
    }
    hasError.value = false;
    error.value = "";
    reviewData.value = await createNewReview(promotorId.value, userId.value, selectedStars.value, updatedTitle.value, updatedExperience.value);
    if (reviewData.value) {
        router.push("/reviews/"+route.params.id);
    }

};
</script>

<template>
    <h2 class="text-body font-bold">Jouw score</h2>
    <div class="flex gap-[10px] pt-[16px]" >
        <!-- Loop through 5 stars -->
        <img v-for="(star, index) in 5" 
             :src="index < selectedStars ? '/1star_select.svg' : '/1star_noSelect.svg'" 
             :alt="'Star ' + (index + 1)"
             @click="handleStarClick(index)" />
    </div>
    <Input :label="'Titel'" @input-change="updateTitle" :error="hasError"/>
    <Input :label="'Deel je ervaring'" @input-change="updateExperience" :error="hasError"/>
    <div class="pt-[40px]">
        <Btn :name="'Plaats je review'" @click="CreateReview"/>
    </div>
    <div v-if="hasError" class="text-red-500">{{error}}</div>
</template>

<style scoped></style>
