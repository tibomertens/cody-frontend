<template>
    <div v-if="!pageLoading"
        class="bg-offWhite-light rounded-[5px] p-[24px] m-[32px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[32px]">
        <div class="md:col-span-1 flex justify-center items-center"><img class="max-h-[200px] md:max-h-[400px]"
                :src="promotorData.logo" alt="logo"></div>
        <div class="md:col-span-1 lg:col-span-2">
            <h2 class="text-title font-bold mb-[24px]">{{ promotorData.name }}</h2>
            <div class="grid lg:grid-cols-2 gap-y-[12px] mb-[12px]">
                <p><span class="font-bold mr-[6px]">Tier:</span>{{ promotorData.tier }}</p>
                <a :href="'tel:' + promotorData.phoneNumber"><span class="font-bold mr-[6px]">Telefoon:</span>{{ phone
                    }}</a>
                <p><span class="font-bold mr-[6px]">Website:</span><span
                        class="text-primary-dark underline font-bold cursor-pointer" @click="navigate(promotorData)">{{
                            promotorData.website_url
                        }}</span></p>
                <a :href="'mailto:' + promotorData.email"><span class="font-bold mr-[6px]">E-mail:</span>{{
                    promotorData.email }}</a>
            </div>
            <p @click="openGoogleMaps(promotorData.address)" class="mb-[12px] cursor-pointer"><span
                    class="font-bold mr-[6px]">Adres:</span>{{ promotorData.address }}</p>
            <p><span class="font-bold mr-[6px] block">Bericht:</span>{{ promotorData.message }}</p>
            <div class="flex gap-[12px] mt-[24px] flex-col lg:flex-row">
                <a :href="'mailto:' + promotorData.email"
                    class="h-[42px] md:h-[48px] cursor-pointer w-full bg-primary-dark rounded-[5px] text-offWhite-light border-2 border-primary-dark font-bold text-[1.1rem] md:text-btn text-center flex items-center justify-center">
                    <p class="relative bottom-[1px]">Contacteren</p>
                </a>
                <a v-if="!promotorData.is_accepted"
                    class="h-[42px] md:h-[48px] cursor-pointer w-full bg-offWhite-light rounded-[5px] text-secondary-green border-2 border-secondary-green font-bold text-[1.1rem] md:text-btn text-center flex items-center justify-center"
                    @click="acceptPromotorFunc">
                    <p class="relative bottom-[1px] flex gap-2">Accepteren
                        <div v-if="loadingAccept" class="animate-spin w-[26px] h-[26px] relative top-[2px]"><img
                                src="/loading-animation-green.png" alt="loading animation"></div>
                    </p>
                </a>
                <a v-if="!promotorData.is_accepted"
                    class="h-[42px] md:h-[48px] cursor-pointer w-full bg-offWhite-light rounded-[5px] text-secondary-red border-2 border-secondary-red font-bold text-[1.1rem] md:text-btn text-center flex items-center justify-center"
                    @click="openConfirm">
                    <p class="relative bottom-[1px] flex gap-2">Afwijzen
                        <div v-if="loading" class="animate-spin w-[26px] h-[26px] relative top-[2px]"><img
                                src="/loading-animation-red.png" alt="loading animation"></div>
                    </p>
                </a>
                <a v-if="promotorData.is_accepted"
                    class="h-[42px] md:h-[48px] cursor-pointer w-full bg-offWhite-light rounded-[5px] text-secondary-red border-2 border-secondary-red font-bold text-[1.1rem] md:text-btn text-center flex items-center justify-center"
                    @click="openConfirm">
                    <p class="relative bottom-[1px] flex gap-2">Samenwerking stopzetten
                        <div v-if="loadingStop" class="animate-spin w-[26px] h-[26px] relative top-[2px]"><img
                                src="/loading-animation-red.png" alt="loading animation"></div>
                    </p>
                </a>
            </div>
        </div>
    </div>
    <div v-else class="pulsing rounded-[5px] h-[330px] m-[32px] lg:m-[40px]"></div>
    <Confirm :showConfirm="showConfirm" title="Renovator afwijzen"
        desc="Weet je zeker dat je deze renovator wilt afwijzen of de samenwerking stopzetten?" @closeConfirm="showConfirm = false"
        @confirmAction="declinePromotorFunc" />
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { isValidToken, getAdmin } from "../../functions/user.js";
import { getPromotorById, acceptPromotor, deletePromotor } from "../../functions/promotor.js";
import { formatPhoneNumber, openGoogleMaps } from "../../functions/helpers.js";

import Confirm from "../modals/Confirm.vue";

const token = localStorage.getItem("token");
let adminData = ref({});

// get the id of the promotor from the url
const router = useRouter();
const promotorId = ref(router.currentRoute.value.params.id);
const promotorData = ref({});

let loading = ref(false);
let loadingAccept = ref(false);
let loadingStop = ref(false);
let pageLoading = ref(true);

let showConfirm = ref(false);

let phone = ref("");

const openConfirm = () => {
    showConfirm.value = true;
};

onMounted(async () => {
    if (isValidToken(token)) {
        adminData.value = await getAdmin(token);

        if (adminData.value !== false) {
            await getPromotorData();
            pageLoading.value = false;
        } else {
            router.push('/admin/login');
        }
    } else {
        router.push("/admin/login");
    }
});

const getPromotorData = async () => {
    const promotor = await getPromotorById(promotorId.value);

    if (promotor.success) {
        promotorData.value = promotor.data;
        phone.value = formatPhoneNumber(promotor.data.phoneNumber);
    }
};

const navigate = (promotor) => {
    let url = promotor.website_url;

    // Check if the URL starts with http or https
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = "https://" + url;
    }

    // Open the URL in a new window or tab
    window.open(url, "_blank");
}

const acceptPromotorFunc = async () => {
    loadingAccept.value = true;
    const result = await acceptPromotor(promotorId.value);
    loadingAccept.value = false;

    if (result.success) {
        router.push("/admin/dashboard");
    }
};

const declinePromotorFunc = async () => {
    loadingStop.value = true;
    loading.value = true;
    const result = await deletePromotor(promotorId.value);
    loadingStop.value = false;
    loading.value = false;

    if (result.success) {
        router.push("/admin/dashboard");
    }
};

// watch for changes in the promotorId
watch(() => router.currentRoute.value.params.id, async () => {
    // change the promotorId value
    promotorId.value = router.currentRoute.value.params.id;
    await getPromotorData();
});
</script>

<style scoped>
@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.animate-spin {
    animation: spin 1s linear infinite;
    scale: 0.7;
}
</style>