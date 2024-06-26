<script setup>
import { ref, defineProps, onMounted, computed } from "vue";
import Btn from "../UI/Btn.vue";
import { formatPhoneNumber, openGoogleMaps } from "../../functions/helpers.js";
import { getReviewsByPromotor } from "../../functions/reviews";
import { useRouter } from "vue-router";

const props = defineProps(["promotor"]);
let reviews = ref([]);
let averageRating = ref(0);
let reviewLength = ref(0);


const navigate = () => {
    let url = props.promotor.website_url;

    // Check if the URL starts with http or https
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = "https://" + url;
    }

    // Open the URL in a new window or tab
    window.open(url, "_blank");
}

onMounted(async () => {
    let result = await getReviewsByPromotor(props.promotor._id);
    reviews.value = result;

    if (reviews.value.length > 0) {
        const totalRating = reviews.value.reduce((sum, review) => sum + review.rating, 0);
        averageRating.value = Math.round(totalRating / reviews.value.length);
        reviewLength.value = reviews.value.length;
    } else {
        averageRating.value = "-";
    }
});

const starImages = computed(() => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
        if (i < averageRating.value) {
            stars.push("/1star_select.svg");
        } else {
            stars.push("/1star_noSelect.svg");
        }
    }
    return stars;
});
</script>


<template>
    <div
        class="sm:flex sm:flex-wrap lg:justify-between bg-offWhite-light my-[32px] py-[12px] px-[32px] rounded-md sm:gap-[10%] lg:gap-0">
        <div class="w-full sm:w-[50%] lg:w-[25%] flex justify-center items-center p-[20px]">
            <img :src="promotor.logo" alt="logo" class="max-h-[175px] sm:max-h-[200px] lg:max-h-[100px]">
        </div>
        <div class="sm:w-[40%] lg:flex lg:w-[65%] h-full lg:justify-between lg:items-center">
            <div>
                <div class="flex justify-center sm:justify-start pt-[10px] font-bold sm:w-[50%] lg:w-full">
                    {{ promotor.name }}
                </div>
                <a class="flex justify-center sm:justify-start pt-[10px] lg:w-full lg:text-center cursor-pointer"
                    @click="openGoogleMaps(promotor.address)">{{ promotor.address }}</a>
                <a class="flex justify-center sm:justify-start pt-[10px] lg:w-full lg:text-center"
                    :href="'tel:' + promotor.phoneNumber">{{ formatPhoneNumber(promotor.phoneNumber) }}</a>
            </div>
            <div>
                <div
                    class="mt-[16px] flex justify-center pt-[10px] pb-[10px] items-center sm:justify-start lg:justify-end gap-[10px] sm:w-[50%] lg:w-[100%] lg:text-right">
                    <div class="sm:min-w-[153px] flex gap-[8px]">
                        <img v-if="reviewLength !== 0" v-for="(star, index) in starImages" :key="index" :src="star"
                            :alt="`Star ${index + 1}`">
                        <p v-else>Geen score</p>
                    </div>
                    <p>{{ averageRating }}/5</p>
                    <a :href="'/reviews/' + promotor._id" class="underline">Reviews</a>
                </div>
                <div class="mt-[16px] mb-[16px] flex justify-center align-middle sm:w-full lg:w-full">
                    <Btn :name="'Ga naar website'" @click="navigate" :width="'full'" />
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped></style>
