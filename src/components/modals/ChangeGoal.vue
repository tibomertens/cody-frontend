<template>
  <div v-if="showModal === true"
    class="fixed inset-0 z-50 flex items-center justify-center bg-offBlack bg-opacity-50 w-full"
    @click="handleOutsideClick">
    <div class="bg-offWhite-dark p-8 rounded-lg shadow-md w-[85%] xs:w-[450px]">
      <h2 class="text-subtitle font-bold mb-[32px]">Wijzig doel</h2>
      <Dropdown :label="'Doel EPC-label'" :items="goals" @itemSelected="handleLabelGoal" :width="'full'" :bold="true"
        :display="false" :error=hasError :default="goalValue" />
      <Input label="Doeljaar" :placeholder="'Bv. 2036'" @input-change="goalYearHandler" :error=hasError
        :value="goalYear" class="pb-[32px]" />
      <Btn name="Opslaan" @click="handleClick" :width="'full'" />
      <p v-if="error" class="text-secondary-red">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import Dropdown from "../UI/Dropdown.vue";
import Input from "../UI/Input.vue";
import Btn from "../UI/Btn.vue";
import { addLabel } from "../../functions/label";

import { ref, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
  showModal: Boolean,
  labelData: Object,
  userId: String,
  items: Object,
  path: String,
  userData: Object,
});

const goals = [
  { name: "A+", title: "A+" },
  { name: "A", title: "A" },
  { name: "B", title: "B" },
  { name: "C", title: "C" },
  { name: "D", title: "D" },
  { name: "E", title: "E" },
  { name: "F", title: "F" },
];

const showModal = ref(false);
let goalValue = ref(null);
let goalYear = ref(null);
let error = ref(null);
let hasError = ref(false);

const emit = defineEmits(["closeModal"]);

// watch to see if showModal prop changes
watch(
  () => props.showModal,
  (value) => {
    showModal.value = value;
  }
);

// watch to see if userData changes
watch(
  () => props.userData,
  (value) => {
    if (value) {
      goalValue.value = value.goalLabel;
      goalYear.value = value.goalLabel_by_year;
    }
  }
);

const closeModal = () => {
  showModal.value = false;
  emit("closeModal");
};

const handleOutsideClick = (event) => {
  if (event.target === event.currentTarget) {
    closeModal();
  }
};

const handleLabelGoal = (selectedGoal) => {
  goalValue.value = selectedGoal;
};

const goalYearHandler = (selectedGoalYear) => {
  goalYear.value = selectedGoalYear;
};

const patchData = async () => {
  try {
    let items = {
      goalLabel: goalValue.value,
      goalLabel_by_year: goalYear.value,
    };
    const currentYear = new Date().getFullYear();
    if (goalValue.value === null || goalYear.value === "") {
      error.value = "Vul alle velden in";
      hasError.value = true;
      return;
    } else if (
      !/^\d{4}$/.test(goalYear.value) ||
      goalYear.value < currentYear
    ) {
      hasError.value = true;
      error.value = "Vul een geldig jaartal in";
      return;
    } else {
      error.value = null;
      const response = await addLabel(items, props.userId);
      closeModal();
    }
    // Handle response if necessary
  } catch (error) {
    console.error("Error patching data:", error.message);
  }
};

// Define your event handlers
const handleClick = async () => {
  await patchData();
};
</script>
