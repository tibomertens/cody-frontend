<script setup>
import { ref, defineProps, onMounted, computed } from "vue";
import { formatPhoneNumber } from "../../functions/helpers.js";
import { getReviewsByPromotor } from "../../functions/reviews";

// Import your star images
import starNoSelect from "/1star_noSelect.svg";
import star1 from "/1star-1.svg";
import star2 from "/1star-2.svg";
import star3 from "/1star-3.svg";
import star4 from "/1star-4.svg";
import starSelect from "/1star_select.svg";

const props = defineProps(["promotor"]);
let reviews = ref([]);
let averageRating = ref(0);
const promotorId = ref(props.promotor._id);
let reviewLength = ref(0);

onMounted(async () => {
    let result = await getReviewsByPromotor(promotorId.value);
    reviews.value = result;

    if (reviews.value.length > 0) {
        const totalRating = reviews.value.reduce((sum, review) => sum + review.rating, 0);
        averageRating.value = Math.round(totalRating / reviews.value.length);
        reviewLength.value = reviews.value.length;
    } else {
        averageRating.value = " - "; // Geen reviews beschikbaar
    }
});

// Computed property to determine the star image source
const starImageSrc = computed(() => {
    switch (averageRating.value) {
        case 0:
            return starNoSelect;
        case 1:
            return star1;
        case 2:
            return star2;
        case 3:
            return star3;
        case 4:
            return star4;
        case 5:
            return starSelect;
        default:
            return starNoSelect; // Default image in case of unexpected rating
    }
});

const navigate = () => {
    let url = props.promotor.website_url;

    // Check if the URL starts with http or https
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = "https://" + url;
    }

    // Open the URL in a new window or tab
    window.open(url, "_blank");
}
</script>

<template>
    <div @click="navigate" class="sm:flex sm:flex-wrap lg:justify-between bg-offWhite-light my-[32px] py-[12px] px-[32px] rounded-md cursor-pointer">
        <div class="flex justify-center pt-[10px] font-bold sm:w-[50%] lg:w-[15%]">
            {{ promotor.name }}
        </div>
        <div class="flex justify-center pt-[10px] sm:w-[50%] lg:w-[15%] lg:text-center">
            {{ promotor.location }}
        </div>
        <a class="flex justify-center pt-[10px] sm:w-[50%] lg:w-[15%] lg:text-center"
            :href="'tel:' + promotor.phoneNumber" @click.stop>{{ formatPhoneNumber(promotor.phoneNumber) }}</a>
        <div
            class="flex justify-center pt-[10px] pb-[10px] items-center lg:justify-end gap-[10px] sm:w-[50%] lg:w-[15%] lg:text-right">
            <img v-if="reviewLength !== 0" :src="starImageSrc" alt="Star Rating" />
            <p>{{ averageRating }}/5</p>
            <a :href="'/reviews/' + promotor._id" class="underline" @click.stop>Reviews</a>
        </div>
    </div>
</template>

<style scoped></style>
