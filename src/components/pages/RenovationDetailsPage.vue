<template>
    <section>
        <div class="inner">
            <div class="mt-[32px] lg:mt-[40px]">
                <div class="md:flex gap-[24px] items-center">
                    <div class="mb-[12px] relative md:top-[6px]">
                        <BackArrow />
                    </div>
                    <div class="flex gap-[24px] items-center flex-wrap">
                        <h1 v-if="renovation.title" class="text-[1.5rem] md:text-title font-bold relative bottom-[1px]">
                            {{ renovation.title }}
                        </h1>
                        <div class="flex gap-[24px] items-center">
                            <a @click.prevent href="#"
                                class="px-[16px] pt-[6px] pb-[8px] font-bold bg-offWhite-light inline-block rounded-[5px]"
                                :class="{ 'text-primary-dark border-2 border-primary-dark': currentState === 'Aanbevolen', 'text-secondary-yellow border-2 border-secondary-yellow': currentState === 'Actief' || currentState === 'Gepauzeerd', 'text-secondary-green border-2 border-secondary-green': currentState === 'Klaar' }">{{
                                    currentState }}</a>
                            <div class="w-[20px] h-[20px]"><img class="w-full h-full" src="/pin_no_fill.svg"
                                    alt="Pin icon">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mt-[16px] mb-[32px]">
                    <p v-if="renovation.description" class="font-light">{{ renovation.description }}</p>
                </div>
                <div v-if="currentState === 'Actief'" class="flex flex-col xs:flex-row gap-[16px] xs:gap-[20px]">
                    <Btn :name="stateBtnName" @click="changeState" :width="'full'" />
                    <GhostBtn :name="'Pauzeer de renovatie'" :width="'full'" @click="pauseRenovation" />
                </div>
                <div v-else>
                    <Btn :name="stateBtnName" @click="changeState" />
                </div>
            </div>
            <div class="mt-[32px] md:mt-[40px] mb-[20px]">
                <div class="flex gap-[6px] items-center">
                    <h2 class="text-subtitle font-bold">Gegevens</h2>
                    <div v-if="currentState === 'Actief'" class="relative top-[2px]"><img src="/edit_no_fill.svg"
                            alt="Edit icon"></div>
                </div>
                <div class="mt-[20px] grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-[20px]">
                    <div class="grid gap-[20px]">
                        <ProjectInfo :light="true" :label="labelArray[0]" :src="getSrcArray(renovation)[0]"
                            :text="getTextArray(renovation, userRenovation)[0]" />
                        <ProjectInfo :light="true" :label="labelArray[1]" :src="getSrcArray(renovation)[1]"
                            :text="getTextArray(renovation, userRenovation)[1]" />
                    </div>
                    <div class="grid gap-[20px]">
                        <ProjectInfo :light="true" :label="labelArray[2]" :src="getSrcArray(renovation)[2]"
                            :text="getTextArray(renovation, userRenovation)[2]" />
                        <ProjectInfo :light="true" :label="labelArray[3]" :src="getSrcArray(renovation)[3]"
                            :text="getTextArray(renovation, userRenovation)[3]" />
                    </div>
                    <div v-if="currentState !== 'Aanbevolen'"
                        class="grid grid-rows-[3fr,1fr] h-[244px] gap-[20px] xs:col-span-2 lg:col-span-1">
                        <div class="rounded-[5px] bg-offWhite-light flex justify-center items-center">CONTENT</div>
                        <div class="rounded-[5px] bg-offWhite-light flex justify-center items-center">
                            <p class="mr-[24px]">Gerenoveerd:</p>
                            <div class="p-[12px] cursor-pointer" @click="lowerAmount"><img src="/minus_solid.svg" alt="minus icon"></div>
                            <p>{{ currentAmount }} / {{ totalAmount }}</p>
                            <div class="p-[12px] cursor-pointer" @click="upAmount"><img src="/plus_solid.svg" alt="plus icon"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-[32px] md:mt-[40px]">
                <div class="flex gap-[20px] items-center mb-[20px]">
                    <h2 class="text-subtitle font-bold">Notities</h2>
                    <div class="flex gap-[10px] items-center">
                        <div class="relative top-[2px]"><img src="/switch_no_fill.svg" alt="Switch icon"></div>
                        <p class="text-xs font-light relative top-[1px]">Verander naar checklist</p>
                    </div>
                </div>
                <div>
                    <input class="w-full rounded-[5px] h-[300px]" type="textarea">
                </div>
            </div>
            <div class="mt-[32px] md:mt-[40px]">
                <h2 class="text-subtitle font-bold mb-[20px]">Subsidies</h2>
                <ul class="list-disc ml-[32px] md:ml-[40px]">
                    <li v-if="renovation.grants" v-for="grant in renovation.grants"
                        class="pl-[12px] font-light text-body">{{ grant }}</li>
                </ul>
            </div>
            <div class="mt-[32px] md:mt-[40px]">
                <h2 class="text-subtitle font-bold mb-[20px]">Hoe start ik?</h2>
                <p v-if="renovation.startup_info" class="font-light text-body" v-html="renovation.startup_info"></p>
            </div>
            <div class="mt-[32px] md:mt-[40px]">
                <h2 class="text-subtitle font-bold mb-[20px]">Waar hulp vinden</h2>
                <p class="font-light text-body mb-[32px]">Ontdek moeiteloos de perfecte partner voor jouw
                    renovatieproject met ons uitgebreide netwerk van
                    gerenommeerde renovatiebedrijven. Vereenvoudig je renovatie-ervaring met onze betrouwbare en ervaren
                    aannemers.
                </p>
                <router-link to="/promotors">
                    <Btn :name="'Lijst bekijken'" />
                </router-link>
            </div>
            <div class="mt-[32px] md:mt-[40px]">
                <h2 class="text-subtitle font-bold mb-[20px]">Soortgelijke suggesties</h2>
            </div>
        </div>
        <ActiveRenovation :renovationId="renovationId" :userId="userId" :showModal="showActiveModal"
            @closeModal="closeModal" @updateState="handleUpdatedState" />
    </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

import { getUserRenovationById } from '../../functions/renovation';
import { isValidToken, getUser } from '../../functions/user.js';

import BackArrow from '../UI/Back-arrow.vue';
import Btn from '../UI/Btn.vue';
import GhostBtn from '../UI/Ghost-btn.vue';
import ProjectInfo from '../UI/Project-info.vue';

import ActiveRenovation from '../modals/ActiveRenovation.vue';

import { updateState, updateAmount } from "../../functions/renovation";

let route = useRoute();
let renovationId = ref('');
let renovation = ref({});
let userRenovation = ref({});
let userData = ref({});
let userId = ref('');
let currentState = ref('');
let stateBtnName = ref('Start de renovatie');
let currentAmount = ref(0);
let totalAmount = ref(0);
let showActiveModal = ref(false);
let showDoneModal = ref(false);
let currentBudget = ref(0);
let startDate = ref('');

const router = useRouter();

const token = localStorage.getItem('token');

const labelArray = [
    'Impact',
    'Geschatte kost',
    'Huidig budget',
    'Startdatum',
];

const getSrcArray = (renovation) => {
    // Logic for generating srcArray based on renovation data
    return [
        renovation.impact === 'Hoogste impact' ? '/highImpact.svg' : '/lowImpact.svg',
        renovation.cost === 'high' ? '/highCost.svg' : '/lowCost.svg',
        '/budgetBlue.svg',
        '/calendar.svg'
    ];
};

const getTextArray = (renovation, userRenovation) => {
    // Logic for generating textArray based on renovation data);
    if (userRenovation.startDate) {
        startDate.value = userRenovation.startDate;
    } else {
        startDate.value = 'Nog niet gestart';
    }

    return [
        renovation.impact,
        renovation.estimated_cost,
        '€ ' + currentBudget.value,
        startDate.value
    ];
};

onMounted(async () => {
    renovationId.value = route.params.id;
    await fetchUser();
    fetchData();
});

const changeState = async () => {
    if (currentState.value === 'Aanbevolen') {
        showActiveModal.value = true;
    } else if (currentState.value === 'Gepauzeerd') {
        let body = {
            startDate: userRenovation.value.startDate,
            budget: userRenovation.value.budget,
            amount_total: userRenovation.value.amount_total,
            status: "Actief"
        };
        await updateState(userId.value, renovationId.value, body);
        fetchData();
    }
};

const pauseRenovation = async () => {
    let body = {
        startDate: userRenovation.value.startDate,
        budget: userRenovation.value.budget,
        amount_total: userRenovation.value.amount_total,
        status: "Gepauzeerd"
    };
    console.log(body);
    await updateState(userId.value, renovationId.value, body);
    fetchData();
};

const lowerAmount = async () => {
    if (currentAmount.value > 0) {
        currentAmount.value--;
        let body = {
            amount_done: currentAmount.value
        };
        await updateAmount(userId.value, renovationId.value, body);
        fetchData();
    }
};

const upAmount = async () => {
    if (currentAmount.value < totalAmount.value) {
        currentAmount.value++;
        let body = {
            amount_done: currentAmount.value
        };
        let update = await updateAmount(userId.value, renovationId.value, body);
        console.log(update);
        fetchData();
    }
};

const closeModal = () => {
    showActiveModal.value = false;
}

const handleUpdatedState = () => {
    fetchData();

};

const fetchUser = async () => {
    if (isValidToken(token)) {
        userData.value = await getUser(token);
        if (userData.value !== null) {
            userId.value = userData.value._id;
        } else {
            router.push('/login');
        }
    } else {
        router.push('/login');
    }
};

const fetchData = async () => {
    userRenovation.value = await getUserRenovationById(userId.value, renovationId.value);
    setStrings();
};

const setStrings = () => {
    renovation.value = userRenovation.value.renovation;
    currentState.value = userRenovation.value.status;

    if (currentState.value === 'Aanbevolen') {
        currentBudget.value = userRenovation.value.user.budget
        stateBtnName.value = 'Start de renovatie';
        startDate.value = 'Nog niet gestart';
    } else if (currentState.value === 'Actief') {
        currentBudget.value = userRenovation.value.budget;
        stateBtnName.value = 'Markeer als klaar';
        startDate.value = userRenovation.value.startDate;
    } else if (currentState.value === 'Gepauzeerd') {
        currentBudget.value = userRenovation.value.budget;
        stateBtnName.value = 'Hervat de renovatie';
        startDate.value = userRenovation.value.startDate;
    } else if (currentState.value === 'Klaar') {
        currentBudget.value = userRenovation.value.budget;
        stateBtnName.value = 'Heropen de renovatie';
        startDate.value = userRenovation.value.startDate;
    }

    if (userRenovation.value.amount_total) {
        totalAmount.value = userRenovation.value.amount_total;
    }

    if (userRenovation.value.amount_done) {
        currentAmount.value = userRenovation.value.amount_done;
    }
};
</script>
