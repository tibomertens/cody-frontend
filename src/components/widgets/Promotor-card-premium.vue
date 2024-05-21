<script setup>
import { ref, defineProps, onMounted, computed } from "vue";
import Btn from "../UI/Btn.vue";
import { formatPhoneNumber, openGoogleMaps } from "../../functions/helpers.js";
import { getReviewsByPromotor } from "../../functions/reviews";
import { useRouter } from "vue-router";

const router = useRouter();
const props = defineProps(["promotor"]);
let reviews = ref([]);
let averageRating = ref(0);

const navigate = () => {
    //check if promotor.website_url starts with http or https
    if (!props.promotor.website_url.startsWith("http://") && !props.promotor.website_url.startsWith("https://")) {
        window.location.href = "https://"+props.promotor.website_url;
    } else {
        window.location.href = props.promotor.website_url;
    }
}

onMounted(async () => {
    let result = await getReviewsByPromotor(props.promotor._id);
    reviews.value = result;

    if (reviews.value.length > 0) {
        const totalRating = reviews.value.reduce((sum, review) => sum + review.rating, 0);
        averageRating.value = Math.round(totalRating / reviews.value.length);
    } else {
        averageRating.value = 0; 
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
    <div class="sm:flex sm:flex-wrap lg:justify-between bg-offWhite-light my-[32px] py-[12px] px-[32px] rounded-md">
        <div class="w-full sm:w-[50%] lg:w-[33%] flex justify-center p-[20px] lg:justify-start">
            <img :src="promotor.logo" alt="logo">
        </div>
        <div class="sm:w-[50%] lg:flex md:w-[66%] h-full lg:justify-between lg:items-center">
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
                <div class="mt-[16px] flex justify-center pt-[10px] pb-[10px] items-center sm:justify-start lg:justify-end gap-[10px] sm:w-[50%] lg:w-[100%] lg:text-right">
                    <div class="sm:min-w-[153px] flex gap-[8px]">
                        <img v-for="(star, index) in starImages" :key="index" :src="star" :alt="`Star ${index + 1}`">
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
