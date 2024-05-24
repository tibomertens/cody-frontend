<template>
    <section>
        <div class="inner">
            <div class="mt-[32px] lg:mt-[40px]">
                <div class="md:flex gap-[24px] items-center">
                    <div class="flex gap-[24px] items-center flex-wrap">
                        <h1 v-if="renovation.title" class="text-[1.5rem] md:text-title font-bold relative bottom-[1px]">
                            {{ renovation.title }}
                        </h1>
                        <div class="flex gap-[24px] items-center">
                            <a @click.prevent href="#"
                                class="px-[16px] pt-[6px] pb-[8px] font-bold bg-offWhite-light inline-block rounded-[5px]"
                                :class="{ 'text-primary-dark border-2 border-primary-dark': currentState === 'Aanbevolen' || currentState === 'Extra', 'text-secondary-yellow border-2 border-secondary-yellow': currentState === 'Actief' || currentState === 'Gepauzeerd', 'text-secondary-green border-2 border-secondary-green': currentState === 'Voltooid' }">{{
                                    currentState }}</a>
                            <div class="w-[20px] h-[20px] cursor-pointer" @click="pinRenovation"><img
                                    class="w-full h-full" :src="pinnedIcon" alt="Pin icon">
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
                    <GhostBtn :name="'Stop de renovatie'" :width="'full'" @click="showConfirmPop" />
                </div>
                <div v-else>
                    <Btn :name="stateBtnName" @click="changeState" />
                </div>
            </div>
            <div class="mt-[32px] md:mt-[40px] mb-[20px]">
                <div class="flex gap-[6px] items-center">
                    <h2 class="text-subtitle font-bold">Gegevens</h2>
                    <div v-if="currentState === 'Actief'" class="relative top-[2px] cursor-pointer"
                        @click="updateUserData"><img src="/edit_no_fill.svg" alt="Edit icon"></div>
                </div>
                <div class="mt-[20px] grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-[20px]">
                    <div class="grid gap-[20px]">
                        <div v-if="loaded" class="rounded-[5px] flex-1 bg-offWhite-light">
                            <div class="flex gap-[32px] justify-center items-center py-[32px]">
                                <div class="w-[46px] h-[46px] hidden xxxs:block"><img class="w-full h-full"
                                        :src="src[0]" alt="icon"></div>
                                <div>
                                    <p class="font-bold text-[1.1em]">{{ label[0] }}</p>
                                    <p class="font-light text-[0.9em]"
                                        :class="{ 'text-secondary-red font-bold': text[0] < 0 }">{{ text[0] }}</p>
                                </div>
                            </div>
                        </div>
                        <div v-else class="pulsing rounded-[5px] h-[112px]"></div>
                        <div v-if="loaded" class="rounded-[5px] flex-1 bg-offWhite-light">
                            <div class="flex gap-[32px] justify-center items-center py-[32px]">
                                <div class="w-[46px] h-[46px] hidden xxxs:block"><img class="w-full h-full"
                                        :src="src[1]" alt="icon"></div>
                                <div>
                                    <p class="font-bold text-[1.1em]">{{ label[1] }}</p>
                                    <p class="font-light text-[0.9em]"
                                        :class="{ 'text-secondary-red font-bold': text[1] < 0 }">{{ text[1] }}</p>
                                </div>
                            </div>
                        </div>
                        <div v-else class="pulsing rounded-[5px] h-[112px]"></div>
                    </div>
                    <div class="grid gap-[20px]">
                        <div v-if="loaded" class="rounded-[5px] flex-1 bg-offWhite-light">
                            <div class="flex gap-[32px] justify-center items-center py-[32px]">
                                <div class="w-[46px] h-[46px] hidden xxxs:block"><img class="w-full h-full"
                                        :src="src[2]" alt="icon"></div>
                                <div>
                                    <p class="font-bold text-[1.1em]">{{ label[2] }}</p>
                                    <p class="font-light text-[0.9em]"
                                        :class="{ 'text-secondary-red font-bold': text[2] < 0 }">{{
                                        formatFinancialNumber(text[2]) }}</p>
                                </div>
                            </div>
                        </div>
                        <div v-else class="pulsing rounded-[5px] h-[112px]"></div>
                        <div v-if="loaded" class="rounded-[5px] flex-1 bg-offWhite-light">
                            <div class="flex gap-[32px] justify-center items-center py-[32px]">
                                <div class="w-[46px] h-[46px] hidden xxxs:block"><img class="w-full h-full"
                                        :src="src[3]" alt="icon"></div>
                                <div>
                                    <p class="font-bold text-[1.1em]">{{ label[3] }}</p>
                                    <p class="font-light text-[0.9em]"
                                        :class="{ 'text-secondary-red font-bold': text[3] < 0 }">{{ text[3] }}</p>
                                </div>
                            </div>
                        </div>
                        <div v-else class="pulsing rounded-[5px] h-[112px]"></div>
                    </div>
                    <div v-if="currentState != 'Aanbevolen' && currentState != 'Extra' && loaded"
                        class="grid grid-rows-[3fr,1fr] h-[244px] gap-[20px] xs:col-span-2 lg:col-span-1">
                        <div class="rounded-[5px] bg-offWhite-light flex justify-center items-center">
                            <DonutChart :percent="percentRenovated" :bg="'#EDF0F5'" :paused="paused" />
                        </div>
                        <div class="rounded-[5px] bg-offWhite-light flex justify-center items-center">
                            <p class="mr-[24px]">Gerenoveerd:</p>
                            <div class="p-[12px] cursor-pointer" @click="lowerAmount"><img src="/minus_solid.svg"
                                    alt="minus icon"></div>
                            <p>{{ currentAmount }} / {{ totalAmount }}</p>
                            <div class="p-[12px] cursor-pointer" @click="upAmount"><img src="/plus_solid.svg"
                                    alt="plus icon"></div>
                        </div>
                    </div>
                    <div v-if="!loaded" class="pulsing rounded-[5px] h-[112px]"></div>
                </div>
            </div>
            <div class="mt-[32px] md:mt-[40px]">
                <div class="flex gap-[20px] items-center mb-[20px]">
                    <h2 class="text-subtitle font-bold">Notities</h2>
                    <div class="flex gap-[10px] items-center cursor-pointer" @click="updateNoteType">
                        <div class="relative top-[2px]"><img src="/switch_no_fill.svg" alt="Switch icon"></div>
                        <p class="text-xs font-light relative top-[1px]">Verander naar {{ notSelectedNoteType }}</p>
                    </div>
                </div>
                <div v-if="selectedNoteType === 'notes'">
                    <textarea
                        class="w-full rounded-lg h-[250px] pl-[12px] pt-[12px] resize-none bg-offWhite-light border-2 outline-none border-offWhite-light focus:border-primary-dark"
                        v-model="notes" @input="updateNotesVal"></textarea>
                </div>
                <div v-else>
                    <CheckList :items="checklistItems" :userId="userId" :renovationId="renovationId" />
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
                <div class="flex gap-[24px] overflow-x-auto">
                    <div v-for="renovation in suggestions" class="flex-none w-full max-w-[550px]">
                        <router-link :to="'/projects/' + renovation._id">
                            <Project :name="renovation.title" :desc="renovation.description"
                                :src="getSuggSrcArray(renovation)" :activeSrc="getActiveSrcArray(renovation)"
                                :doneSrc="getDoneSrcArray(renovation)" :label="labelArray"
                                :activeLabel="activeLabelArray" :doneLabel="doneLabelArray"
                                :text="getSuggTextArray(renovation)" :activeText="getActiveTextArray(renovation)"
                                :doneText="getDoneTextArray(renovation)" :stateFetcher="getStateFetcher(renovation)"
                                :suggestion="true" />
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
        <ActiveRenovation :renovationId="renovationId" :userId="userId" :userBudget="userBudget"
            :showModal="showActiveModal" @closeModal="closeModal" @updateState="handleUpdatedState" />
        <UpdateRenovationDetails :renovationId="renovationId" :userId="userId" :userBudget="userBudget"
            :previousBudget="currentBudget" :showModal="showUpdateModal" :amountTotal="totalAmount"
            :budget="parseInt(currentBudget)" :startDate="startDate" @closeModal="closeModal"
            @updateData="updateData" />
        <DoneRenovation :renovationId="renovationId" :userId="userId" :showModal="showDoneModal"
            :budget="parseInt(currentBudget)" :amountTotal="totalAmount" @updateState="handleUpdatedState"
            :userBudget="userBudget" :previousBudget="currentBudget" @closeModal="closeModal" />
        <Confirm :showConfirm="showConfirmModal" :title="'Stop renovatie'"
            :desc="'Ben je zeker dat je deze renovatie wilt stoppen, alle data gaat verloren. Wil je deze alsnog behouden, pauzeer de renovatie dan.'"
            @closeConfirm="closeModal" @confirmAction="endRenovation" />
    </section>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

import { updateState, updateAmount, updateSavedRenovation, updateNotes, getSuggestions, getUserRenovationById, getUserRenovation } from "../../functions/renovation";
import { isValidToken, getUser } from '../../functions/user.js';
import { convertDate } from '../../functions/helpers.js';

import Btn from '../UI/Btn.vue';
import GhostBtn from '../UI/Ghost-btn.vue';
import DonutChart from '../widgets/DonutChart.vue';
import Project from '../widgets/Project.vue';

import ActiveRenovation from '../modals/ActiveRenovation.vue';
import UpdateRenovationDetails from '../modals/UpdateRenovationDetails.vue';
import DoneRenovation from '../modals/DoneRenovation.vue';
import Confirm from '../modals/Confirm.vue';

import CheckList from '../widgets/CheckList.vue';

import { formatFinancialNumber } from '../../functions/helpers';

const loaded = ref(false);

let paused = ref(false);
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
let showUpdateModal = ref(false);
let showConfirmModal = ref(false);
let currentBudget = ref(0);
let startDate = ref('');
let pinnedIcon = ref('/pin_no_fill.svg');
let isPinned = ref(false);
let selectedNoteType = ref('notes');
let notSelectedNoteType = ref('checklist');
let notes = ref('');
let checklistItems = ref([]);
let percentRenovated = ref(0);
let suggestions = ref([]);
let renovationtype = ref('');
let userBudget = ref(0);
let src = ref([]);
let label = ref([]);
let text = ref([]);

const router = useRouter();

const token = localStorage.getItem('token');

const showConfirmPop = () => {
    showConfirmModal.value = true;
};

const endRenovation = async () => {
    let body = {
        startDate: null,
        budget: null,
        amount_done: 0,
        amount_total: null,
        status: "Aanbevolen"
    };
    await updateState(userId.value, renovationId.value, body);
    await fetchData();
};

const getStateFetcher = (renovation) => async () => {
    let data = await getUserRenovation(userId.value, renovation._id);
    return data.status;
};

const getActiveTextArray = async (renovation) => {
    // Logic for generating textArray based on renovation data
    let data = await getUserRenovation(userId.value, renovation._id);
    return [
        data.budget,
        convertDate(data.startDate),
        data.amount_total,
        data.amount_done
    ];
};

const getDoneTextArray = async (renovation) => {
    let data = await getUserRenovation(userId.value, renovation._id);
    return [
        data.budget,
        convertDate(data.endDate),
        data.amount_total,
        data.amount_done
    ];
};

const getActiveSrcArray = (renovation) => {
    // Logic for generating srcArray based on renovation data
    return [
        '/budgetBlue.svg',
        '/calendar.svg'
    ];
};

const getDoneSrcArray = (renovation) => {
    // Logic for generating srcArray based on renovation data
    return [
        '/budgetBlue.svg',
        '/calendar.svg'
    ];
};

const activeLabelArray = [
    'Toegewezen budget',
    'Startdatum'
];

const doneLabelArray = [
    'Uitgegeven budget',
    'Einddatum'
];

const labelArray = [
    'Impact',
    'Geschatte kost',
    'Jouw budget'
];

const getSuggSrcArray = (renovation) => {
    // Logic for generating srcArray based on renovation data
    return [
        renovation.impact === 'Hoogste impact' ? '/highImpact.svg' : (renovation.impact === 'Middelmatige impact' ? '/mediumImpact.svg' : '/lowImpact.svg'),
        renovation.cost === 'high' ? '/highCost.svg' : (renovation.cost === 'medium' ? '/mediumCost.svg' : '/lowCost.svg'),
        '/budgetBlue.svg'
    ];
};

const getSuggTextArray = (renovation) => {
    // Logic for generating textArray based on renovation data
    return [
        renovation.impact,
        renovation.estimated_cost,
        userRenovation.value.user.budget_current
    ];
};

const updateNoteType = () => {
    if (selectedNoteType.value === 'notes') {
        selectedNoteType.value = 'checklist';
        notSelectedNoteType.value = 'notes';
    } else {
        selectedNoteType.value = 'notes';
        notSelectedNoteType.value = 'checklist';
    }
};

const getLabelArray = () => {
    if (currentState.value === 'Voltooid') {
        return [
            'Impact',
            'Geschatte kost',
            'Uitgegeven budget',
            'Einddatum'
        ];
    } else if (currentState.value === 'Actief' || currentState.value === 'Gepauzeerd') {
        return [
            'Impact',
            'Geschatte kost',
            'Toegewezen budget',
            'Startdatum'
        ];
    }
    else {
        return [
            'Impact',
            'Geschatte kost',
            'Jouw budget',
            'Startdatum'
        ];
    }
};

const getSrcArray = (renovation) => {
    // Logic for generating srcArray based on renovation data
    return [
        renovation.impact === 'Hoogste impact' ? '/highImpact.svg' : (renovation.impact === 'Middelmatige impact' ? '/mediumImpact.svg' : '/lowImpact.svg'),
        renovation.cost === 'high' ? '/highCost.svg' : (renovation.cost === 'medium' ? '/mediumCost.svg' : '/lowCost.svg'),
        '/budgetBlue.svg',
        '/calendar.svg'
    ];
};

const getTextArray = (renovation, userRenovation) => {
    // Logic for generating textArray based on renovation data);
    if (userRenovation.startDate) {
        startDate.value = convertDate(userRenovation.startDate);
    } else {
        startDate.value = 'Nog niet gestart';
    }

    if (currentState.value === 'Voltooid') {
        startDate.value = convertDate(userRenovation.endDate);
    }

    return [
        renovation.impact,
        renovation.estimated_cost,
        currentBudget.value,
        startDate.value
    ];
};

const updateNotesVal = () => {
    let body = {
        notes: notes.value
    };
    updateNotes(userId.value, renovationId.value, body);
};

onMounted(async () => {
    renovationId.value = route.params.id;
    await fetchUser();
    await fetchData();
    suggestions.value = await getSuggestions(renovationtype.value);
});

const pinRenovation = async () => {
    if (isPinned.value) {
        pinnedIcon.value = '/pin_no_fill.svg';
        await updateSavedRenovation(userId.value, renovationId.value, { saved: false });
        fetchData();
    } else {
        pinnedIcon.value = '/pin_fill.svg';
        await updateSavedRenovation(userId.value, renovationId.value, { saved: true });
        fetchData();
    }
};

const updateUserData = () => {
    showUpdateModal.value = true;
};

const updateData = async () => {
    await fetchData();
};

const changeState = async () => {
    if (currentState.value === 'Aanbevolen' || currentState.value === 'Extra') {
        showActiveModal.value = true;
    } else if (currentState.value === 'Actief') {
        showDoneModal.value = true;
    } else if (currentState.value === 'Gepauzeerd' || currentState.value === 'Voltooid') {
        let body = {
            startDate: userRenovation.value.startDate,
            budget: userRenovation.value.budget,
            amount_total: userRenovation.value.amount_total,
            status: "Actief"
        };
        await updateState(userId.value, renovationId.value, body);
        await fetchData();  // Ensure this does not cause recursive updates
    }
};

const pauseRenovation = async () => {
    let body = {
        startDate: userRenovation.value.startDate,
        budget: userRenovation.value.budget,
        amount_total: userRenovation.value.amount_total,
        status: "Gepauzeerd"
    };
    await updateState(userId.value, renovationId.value, body);
    await fetchData();
};

const lowerAmount = async () => {
    if (currentState.value === 'Actief') {
        if (currentAmount.value > 0) {
            currentAmount.value--;
            let body = {
                amount_done: currentAmount.value
            };
            await updateAmount(userId.value, renovationId.value, body);
            await fetchData();
        }
    } else {
        alert('Je kan het aantal niet verlagen als de renovatie niet actief is');
    }
};

const upAmount = async () => {
    if (currentState.value === 'Actief') {
        if (currentAmount.value < totalAmount.value) {
            currentAmount.value++;
            if (currentAmount.value === totalAmount.value) {
                showDoneModal.value = true;
            }
            let body = {
                amount_done: currentAmount.value
            };
            await updateAmount(userId.value, renovationId.value, body);
            await fetchData();
        }
    } else {
        alert('Je kan het aantal niet verhogen als de renovatie niet actief is');
    }
};

const closeModal = () => {
    showActiveModal.value = false;
    showUpdateModal.value = false;
    showDoneModal.value = false;
    showConfirmModal.value = false;
};

const handleUpdatedState = async () => {
    if (currentState.value === 'Voltooid') {
        let body = {
            amount_done: totalAmount.value
        };
        await updateAmount(userId.value, renovationId.value, body);
        await fetchData();
    } else {
        await fetchData();
    }
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
    isPinned.value = userRenovation.value.saved;
    renovationtype.value = userRenovation.value.renovation.type;
    userBudget = userRenovation.value.user.budget_current;

    if (currentState.value === 'Aanbevolen' || currentState.value === 'Extra') {
        currentBudget.value = userRenovation.value.user.budget_current;
        paused.value = false;
        stateBtnName.value = 'Start de renovatie';
        startDate.value = 'Nog niet gestart';
    } else if (currentState.value === 'Actief') {
        currentBudget.value = userRenovation.value.budget;
        paused.value = false;
        stateBtnName.value = 'Markeer als voltooid';
        startDate.value = convertDate(userRenovation.value.startDate);
    } else if (currentState.value === 'Gepauzeerd') {
        currentBudget.value = userRenovation.value.budget;
        paused.value = true;
        stateBtnName.value = 'Hervat de renovatie';
        startDate.value = convertDate(userRenovation.value.startDate);
    } else if (currentState.value === 'Voltooid') {
        currentBudget.value = userRenovation.value.budget_final;
        paused.value = false;
        stateBtnName.value = 'Heropen de renovatie';
        startDate.value = convertDate(userRenovation.value.startDate);
    }

    if (userRenovation.value.amount_total) {
        totalAmount.value = userRenovation.value.amount_total;
    }

    if (userRenovation.value.amount_done) {
        currentAmount.value = userRenovation.value.amount_done;
    } else if (currentState.value !== 'Voltooid' && currentState.value !== 'Gepauzeerd' && currentState.value !== 'Actief') {
        currentAmount.value = 0;
    }

    if (userRenovation.value.amount_total && userRenovation.value.amount_done) {
        percentRenovated.value = Math.round((currentAmount.value / totalAmount.value) * 100);
    } else if (currentState.value !== 'Voltooid' && currentState.value !== 'Gepauzeerd' && currentState.value !== 'Actief') {
        percentRenovated.value = 0;
    }

    if (isPinned.value) {
        pinnedIcon.value = '/pin_fill.svg';
    } else {
        pinnedIcon.value = '/pin_no_fill.svg';
    }

    if (userRenovation.value.notes) {
        notes.value = userRenovation.value.notes;
    }

    if (userRenovation.value.checklist) {
        checklistItems.value = userRenovation.value.checklist;
    }

    src.value = getSrcArray(renovation.value);
    label.value = getLabelArray();
    text.value = getTextArray(renovation.value, userRenovation.value);
    
    loaded.value = true;
};

watch(() => route.params.id, async () => {
    renovationId.value = route.params.id;
    await fetchData();
    suggestions.value = await getSuggestions(renovationtype.value);
});
</script>
