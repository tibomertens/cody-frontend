<script setup>
//import components
import HomeType from "../widgets/HomeType.vue";
import Heating from "../widgets/Heating.vue";
import RoofIsolation from "../widgets/RoofIsolation.vue";
import FloorIsolation from "../widgets/FloorIsolation.vue";
import WallIsolation from "../widgets/WallIsolation.vue";
import Ventilation from "../widgets/Ventilation.vue";
import Btn from "../UI/Btn.vue";

//import modals
import CalculatedLabelModal from "../modals/CalculatedLabel.vue";

//import functions
import { calculateLabel } from "../../functions/label";
import { isValidToken, getUser } from "../../functions/user.js";

//import vue functions
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from "vue-router";

const router = useRouter();

const token = localStorage.getItem("token");
let userData = ref({});
let userId = ref(null);
let labelData = reactive({});
let showModal = ref(false);
let error = ref(null);

onMounted( async () => {
  if (isValidToken(token)) {
    userData = await getUser(token);
    userId = userData._id;
  } else {
    // router.push("/login");
  }
});

const calculate = async (items) => {
    labelData = await calculateLabel(items);
    if (labelData.status === 400) {
        error.value = 'Gelieve alle velden in te vullen';
    } else if (labelData.status === 500) {
        error.value = 'Er is iets misgegaan, probeer het later opnieuw';
    } else {
        showModal.value = true;
    }
}

const closeModal = () => {
    showModal.value = false;
}

// Object to hold selected items
const selectedItems = ref({
    typeWoning: null,
    typeGeometrie: null,
    typeDak: null,
    typeVerwarming: null,
    verwarmingEnergiedrager: null,
    verwarmSanitairWarmWaterMet: null,
    zonneboilerAanwezig: false,
    pvAanwezig: false,
    typeHellendDakIsolatie: 'niet',
    typePlatDakIsolatie: 'niet',
    typeVentilatie: null,
    typeVloer: null,
    typeVloerOpVolleGrondIsolatie: 'niet',
    typeVloerBovenKelderIsolatie: 'niet',
    typeGevelIsolatie: null,
    typeVenster: null,
});

// Function to update selected items
const handleSelectedItems = (key, value) => {
    selectedItems.value[key] = value;
}
</script>

<template>
    <section class="ml-[32px] mr-[32px] pt-[40px] md:ml-[10%] md:mr-[10%] xl:ml-[25%] xl:mr-[25%]">
        <div class="head">
            <div class="goBackArrow"></div>
            <h1 class="text-title font-bold">Indicatieve test</h1>
        </div>
        <HomeType @itemSelected="handleSelectedItems('typeWoning', $event)"
            @selectedSurface="handleSelectedItems('typeGeometrie', $event)" />
        <Heating @selectedHeatingType="handleSelectedItems('typeVerwarming', $event)"
            @selectedHeatingSystem="handleSelectedItems('verwarmingEnergiedrager', $event)"
            @selectedWaterHeatingSystem="handleSelectedItems('verwarmSanitairWarmWaterMet', $event)"
            @solarBoiler="handleSelectedItems('zonneboilerAanwezig', $event)"
            @solarPanels="handleSelectedItems('pvAanwezig', $event)" />
        <RoofIsolation @itemSelected="handleSelectedItems('typeDak', $event)"
            @pitchedRoof="handleSelectedItems('typeHellendDakIsolatie', $event)"
            @flatRoof="handleSelectedItems('typePlatDakIsolatie', $event)" />
        <Ventilation @selectedVentilation="handleSelectedItems('typeVentilatie', $event)" />
        <FloorIsolation @itemSelected="handleSelectedItems('typeVloer', $event)"
            @noCellar="handleSelectedItems('typeVloerOpVolleGrondIsolatie', $event)"
            @cellar="handleSelectedItems('typeVloerBovenKelderIsolatie', $event)" />
        <WallIsolation @walls="handleSelectedItems('typeGevelIsolatie', $event)"
            @windows="handleSelectedItems('typeVenster', $event)" />
        <div>
            <div class="flex justify-center mt-[64px]">
                <Btn :name="'yhj,k'" @click="calculate(selectedItems)" />
            </div>
            <div class="pt-[12px] pb-[64px] flex justify-center">
                <p v-if="error" class="text-secondary-red">{{ error }}</p>
            </div>
        </div>
        <CalculatedLabelModal :showModal="showModal" :labelData="labelData" :userId="userId" :items="selectedItems" @closeModal="closeModal" />
    </section>
</template>

<style scoped></style>
