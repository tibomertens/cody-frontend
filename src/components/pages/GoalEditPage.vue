<script setup>
import Btn from "../UI/Button-Btn.vue";
import Dropdown from "../UI/Dropdown.vue";
import { ref } from "vue";
import { onMounted } from "vue";
import { getUser, isValidToken } from "../../functions/user";
import { addLabel } from "../../functions/label";

let token = localStorage.getItem("token");
let userData = ref({});
let label = ref("");
let goalLabel = ref("");
let goalYear = ref("");
let showButton = ref(false);
let error = ref(null);
let success = ref(null);

const energyLabels = ref([
  { name: "A+", title: "Label A+" },
  { name: "A", title: "Label A" },
  { name: "B", title: "Label B" },
  { name: "C", title: "Label C" },
  { name: "D", title: "Label D" },
  { name: "E", title: "Label E" },
  { name: "F", title: "Label F" },
]);

const goalYears = ref([
  { name: "2024", title: "2024" },
  { name: "2025", title: "2025" },
  { name: "2026", title: "2026" },
  { name: "2027", title: "2027" },
  { name: "2028", title: "2028" },
  { name: "2029", title: "2029" },
  { name: "2030", title: "2030" },
  { name: "2031", title: "2031" },
  { name: "2032", title: "2032" },
  { name: "2033", title: "2033" },
  { name: "2034", title: "2034" },
  { name: "2035", title: "2035" },
  { name: "2036", title: "2036" },
  { name: "2037", title: "2037" },
  { name: "2038", title: "2038" },
  { name: "2039", title: "2039" },
  { name: "2040", title: "2040" },
  { name: "2041", title: "2041" },
  { name: "2042", title: "2042" },
  { name: "2043", title: "2043" },
  { name: "2044", title: "2044" },
  { name: "2045", title: "2045" },
  { name: "2046", title: "2046" },
  { name: "2047", title: "2047" },
  { name: "2048", title: "2048" },
  { name: "2049", title: "2049" },
  { name: "2050", title: "2050" },
]);

onMounted(async () => {
  if (isValidToken(token)) {
    await getData();
  } else {
    router.push("/login");
  }
});

const getData = async () => {
  let result = await getUser(token);
  if (result) {
    userData.value = result;
    label.value = userData.value.label;
    goalLabel.value = userData.value.goalLabel;
    goalYear.value = userData.value.goalLabel_by_year;
  }
};

const labelChange = (selectedLabel) => {
  goalLabel.value = selectedLabel;
  showButton.value = true;
};

const yearChange = (selectedYear) => {
  goalYear.value = selectedYear;
  showButton.value = true;
};

const save = async () => {
    let items = {
      goalLabel: goalLabel.value,
      goalLabel_by_year: goalYear.value,
    };
    const result = await addLabel(items, userData.value._id);
    if (result) {
      showButton.value = false;
      success.value = "Gegevens opgeslagen";
    } else {
      error.value = "Er is iets misgegaan met het opslaan van de gegevens";
    }
  
};
</script>

<template>
  <div class="flex justify-center my-[32px]">
    <div class="w-[60%] xs:w-[415px]">
        <h2 class="text-subtitle pb-[20px]">Huidig label</h2>
        <div class="pb-[32px]">
          <img
            class="xs:w-[120px] xs:h-[52px] w-[90px] h-[40px]"
            :src="`/${label}-label.svg`"
            alt="Huidig label"
          />
        </div>
        <h2 class="text-subtitle pb-[20px]">Doel instellen</h2>
        <Dropdown
          :items="energyLabels"
          label="Energielabel"
          @itemSelected="labelChange"
          :default="`label ${goalLabel}`"
          :display="false"
          class="mb-[20px]"
        />
        <Dropdown
          :items="goalYears"
          label="Doeljaar"
          @itemSelected="yearChange"
          :default="goalYear"
          :display="false"
        />
        <Btn
          v-if="showButton"
          name="Opslaan"
          @click="save"
          class="mt-[32px]"
          width="full"
        />
        <p v-if="error" class="text-secondary-red font-bold mt-[20px]">{{ error }}</p>
        <p v-if="success" class="text-secondary-green font-bold mt-[20px]">{{ success }}</p>
    </div>
    
  </div>
</template>

<style scoped></style>
