<script setup>
import { ref, onMounted} from "vue";
import ReviewCard from "../widgets/Review-card.vue";
import { getReviewsByPromotor } from "../../functions/reviews";
import {useRoute} from "vue-router";
import SortFilter from "../UI/Sort-filter.vue";
import ButtonBtn from "../UI/Button-Btn.vue";

const route = useRoute();

const reviews = ref([]);
const promotorId = ref("");

onMounted(async () => {
    promotorId.value = route.params.id;
    reviews.value = await getReviewsByPromotor(promotorId.value);
});

const updateReviews = (filteredReviews) => {
    reviews.value = filteredReviews; // Update reviews with the emitted filtered reviews array
};

</script>

<template>

<div class="flex justify-between flex-col gap-[20px] md:flex-row m-[32px] md:m-[40px]">
    <div class=" md:w-[280px]">
        <SortFilter :width="'full'" default="Filter" @filtered="updateReviews"/>
    </div>
    <div class=" md:w-[280px]">
    <ButtonBtn :width="'full'"  name="+ Schrijf een review"/>
    </div>
</div>    
    <div class="bg-offWhite-light m-[40px] p-[24px] rounded" v-for="review in reviews">
        <ReviewCard :review="review" />
    </div>
</template>


<style scoped></style>