<script setup>
import { ref, onMounted } from "vue";
import ReviewCard from "../widgets/Review-card.vue";
import { getReviewsByPromotor } from "../../functions/reviews";
import { getUser, isValidToken } from "../../functions/user";
import { useRoute, useRouter } from "vue-router";
import SortFilter from "../UI/Sort-filter.vue";
import ButtonBtn from "../UI/Button-Btn.vue";

const router = useRouter();
const route = useRoute();
const token = localStorage.getItem("token");
const userData = ref({});
const reviews = ref([]);
const promotorId = ref("");
const userId = ref("");

onMounted(async () => {
    promotorId.value = route.params.id;
    reviews.value = await getReviewsByPromotor(promotorId.value);

    if (isValidToken(token)) {
        userData.value = await getUser(token);
        userId.value = userData.value._id;
        console.log(reviews.value[0]?.userId);
    } else {
        router.push("/login");
    }

    console.log(reviews.value);
});

const updateReviews = (filteredReviews) => {
    reviews.value = filteredReviews; 
};

const handleClick = () => {
    router.push("/createreview/" + promotorId.value);
};

const removeReview = (reviewId) => {
    reviews.value = reviews.value.filter((review) => review._id !== reviewId);
};
</script>

<template>
<div class="flex justify-between flex-col gap-[20px] md:flex-row m-[32px] md:m-[40px]">
    <div class="md:w-[280px]">
        <SortFilter :width="'full'" default="Filter" @filtered="updateReviews" />
    </div>
    <div class="md:w-[280px]">
        <ButtonBtn @click="handleClick" :width="'full'" name="+ Schrijf een review" />
    </div>
</div>
<div class="bg-offWhite-light m-[40px] p-[24px] rounded" v-for="review in reviews" :key="review._id">
    <ReviewCard :review="review" @review-deleted="removeReview" :loggedInUserId="userId" />
</div>
</template>

<style scoped></style>
