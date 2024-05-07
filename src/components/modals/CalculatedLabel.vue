<template>
  <div
    v-if="showModal"
    class="fixed inset-0 z-50 flex items-center justify-center bg-offBlack bg-opacity-50 w-full"
    @click="handleOutsideClick"
  >
    <div class="bg-offWhite-dark p-8 rounded-lg shadow-md w-[85%] xs:w-[450px]">
      <div>
        <div class="flex justify-between">
          <h2 class="text-subtitle font-bold mb-4">Berekend label</h2>
          <p
            @click="toggleDisclaimer"
            class="disclaimer font-light text-sm cursor-pointer underline text-primary-dark relative top-[5px]"
          >
            Disclaimer
          </p>
        </div>
        <div class="flex justify-center items-center">
          <img
            class="w-[150px]"
            :src="'/' + props.labelData.label + '-label.svg'"
            alt="Your label"
          />
        </div>
        <p v-if="showDisclaimer" class="font-light text-sm mt-2">
          {{ props.labelData.disclaimer }}
        </p>
      </div>
      <div>
        <h2 class="text-subtitle font-bold mt-4 mb-4">Doel instellen</h2>
        <Dropdown
          :label="'Energielabel'"
          :width="'full'"
          :items="goals"
          :bold="true"
          @itemSelected="handleLabelGoal"
          :error="dropdownHasError"
          :errorMessage="goalError"
        />
        <Input
          :label="'Doeljaar'"
          :width="'full'"
          :placeholder="'Bv. 2036'"
          @input-change="updateGoalYear"
          :error="inputHasError"
        />
        <p v-if="yearError" class="text-secondary-red">{{ yearError }}</p>
      </div>
      <div class="mt-[46px] flex justify-end">
        <Btn name="Opslaan" :width="'full'" @click="addLabelToUser" />
        <p v-if="error" class="text-secondary-red">{{ error }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import Btn from "../UI/Btn.vue";
import Dropdown from "../UI/Dropdown.vue";
import Input from "../UI/Input.vue";

import {
  addLabel,
  updateRecommendations,
  updateChecklistRecommendations,
} from "../../functions/label";

import { ref, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
  showModal: Boolean,
  labelData: Object,
  userId: String,
  items: Object,
  path: String,
});

const showDisclaimer = ref(false);
const showModal = ref(false);
let goalValue = ref(null);
let goalYear = ref(null);
let yearError = ref(null);
let goalError = ref(null);
let error = ref(null);
let inputHasError = ref(false);
let dropdownHasError = ref(false);

const emit = defineEmits(["closeModal"]);

const goals = [
  { name: "A+", title: "A+" },
  { name: "A", title: "A" },
  { name: "B", title: "B" },
  { name: "C", title: "C" },
  { name: "D", title: "D" },
  { name: "E", title: "E" },
  { name: "F", title: "F" },
];

const toggleDisclaimer = () => {
  showDisclaimer.value = !showDisclaimer.value;
};

// watch to see if showModal prop changes
watch(
  () => props.showModal,
  (value) => {
    showModal.value = value;
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

const updateGoalYear = (year) => {
  goalYear.value = year;
};

const addLabelToUser = async () => {
  const currentYear = new Date().getFullYear();

  if (
    !/^\d{4}$/.test(goalYear.value) ||
    goalYear.value < currentYear ||
    goalYear.value === ""
  ) {
    yearError = "Vul een geldig jaartal in";
    inputHasError.value = true;
  } else if (goalValue.value === null) {
    goalError = "Kies een doel";
    dropdownHasError.value = true;
  } else if (router.currentRoute.value.path.toLowerCase() === "/rapport/checklist") {
    const items = {
      goalLabel: goalValue.value,
      goalLabel_by_year: goalYear.value,
      label: props.labelData.label,
    };
    const labelAdded = await addLabel(items, props.userId);
    if (labelAdded) {
      const update = await updateChecklistRecommendations(
        props.items,
        props.userId
      );
      if (update) {
        router.push("/");
      } else {
        error.value = "Er is iets misgegaan, probeer het later opnieuw";
      }
    }
  } else if (router.currentRoute.value.path.toLowerCase() === "/test/berekenindicatief") {
    const items = {
      goalLabel: goalValue.value,
      goalLabel_by_year: goalYear.value,
      label: props.labelData.label,
    };
    const labelAdded = await addLabel(items, props.userId);
    if (labelAdded) {
      const update = await updateRecommendations(props.items, props.userId);
      if (update) {
        router.push("/");
      } else {
        error.value = "Er is iets misgegaan, probeer het later opnieuw";
      }
    }
  }
};
</script>
