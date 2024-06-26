<template>
  <div class="flex justify-between flex-col gap-[20px] md:flex-row m-[32px] md:m-[40px]">
    <div class="md:w-[280px]">
      <SortFilter :width="'full'" default="Filter" @filtered="updateReviews" @delete-filter="sortReviewsRecentToOld" />
    </div>
    <div class="md:w-[280px]">
      <ButtonBtn @click="handleClick" :width="'full'" name="Schrijf een review" />
    </div>
  </div>

  <div v-if="dataIsLoaded">
    <div v-if="userReviews.length > 0" class="m-[40px]">
      <h2 class="text-subtitle font-bold mb-[16px]">Mijn reviews</h2>
      <div class="bg-offWhite-light mb-[40px] p-[24px] rounded" v-for="review in userReviews" :key="review._id">
        <ReviewCard :review="review" @review-deleted="removeReview" :loggedInUserId="userId" />
      </div>
    </div>
    <div v-if="otherReviews.length > 0" class="mx-[40px] pb-[40px]">
      <h2 class="text-subtitle font-bold mb-[16px]">Andere reviews</h2>
      <div class="bg-offWhite-light mb-[40px] p-[24px] rounded" v-for="review in otherReviews" :key="review._id">
        <ReviewCard :review="review" @review-deleted="removeReview" :loggedInUserId="userId" />
      </div>
    </div>
    <Empty_state v-if="userReviews.length === 0 && otherReviews.length === 0"
      :text="'Geen reviews gevonden voor dit bedrijf'" />
  </div>

  <div v-else>
    <div class="pulsing h-[100px] rounded-[5px] md:mx-[40px] ml-[5%] mb-[32px]"></div>
    <div class="pulsing h-[100px] rounded-[5px] md:mx-[40px] ml-[5%] mb-[32px]"></div>
    <div class="pulsing h-[100px] rounded-[5px] md:mx-[40px] ml-[5%] mb-[32px]"></div>
    <div class="pulsing h-[100px] rounded-[5px] md:mx-[40px] ml-[5%] mb-[32px]"></div>
  </div>
</template>



<script setup>
import { ref, onMounted } from "vue";
import ReviewCard from "../widgets/Review-card.vue";
import { getReviewsByPromotor } from "../../functions/reviews";
import { getUser, isValidToken, checkEmailConfirmed, checkLabelUser } from "../../functions/user";
import { useRoute, useRouter } from "vue-router";
import SortFilter from "../UI/Sort-filter.vue";
import ButtonBtn from "../UI/Button-Btn.vue";
import Empty_state from "../widgets/Empty_state.vue";

const router = useRouter();
const route = useRoute();
const token = localStorage.getItem("token");
const userData = ref({});
const reviews = ref([]);
const userReviews = ref([]);
const otherReviews = ref([]);
const promotorId = ref("");
const userId = ref("");
const dataIsLoaded = ref(false); // Added reactive variable

onMounted(async () => {
  promotorId.value = route.params.id;
  reviews.value = await getReviewsByPromotor(promotorId.value);

  if (isValidToken(token)) {
    userData.value = await getUser(token);

    let emailConfirmed = await checkEmailConfirmed(userData.value);
    if (!emailConfirmed) {
      router.push("/login");
      return;
    }

    let hasLabel = await checkLabelUser(userData.value);
    if (!hasLabel) {
      router.push("/determinelabelchoice");
      return;
    }

    userId.value = userData.value._id;
    splitReviews();
  } else {
    router.push("/login");
  }
  sortReviewsRecentToOld();
  dataIsLoaded.value = true; // Set to true once data is loaded
});

const splitReviews = () => {
  userReviews.value = reviews.value.filter(review => review.userId === userId.value);
  otherReviews.value = reviews.value.filter(review => review.userId !== userId.value);
};

const updateReviews = (filteredReviews) => {
  if (filteredReviews.length === 0) {
    sortReviewsRecentToOld();
  } else {
    reviews.value = filteredReviews;
    splitReviews();
  }
};

const handleClick = () => {
  router.push("/reviews/create/" + promotorId.value);
};

const removeReview = (reviewId) => {
  reviews.value = reviews.value.filter((review) => review._id !== reviewId);
  splitReviews();
};

const sortReviewsRecentToOld = () => {
  userReviews.value.sort((reviewA, reviewB) => new Date(reviewB.date) - new Date(reviewA.date));
  otherReviews.value.sort((reviewA, reviewB) => new Date(reviewB.date) - new Date(reviewA.date));
};
</script>



<style scoped></style>
