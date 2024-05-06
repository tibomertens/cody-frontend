<template>
    <div
      v-if="showBudgetModal=== true"
      class="fixed inset-0 z-50 flex items-center justify-center bg-offBlack bg-opacity-50 w-full"
      @click="handleOutsideClick"
    >
    <div class="bg-offWhite-dark p-8 rounded-lg shadow-md w-[85%] xs:w-[450px]">
    <h2 class="text-subtitle font-bold mb-[32px]" >Wijzig budget</h2>
    <Input label="Hoeveel budget wilt u toevoegen?" @input-change="budgetHandler" class="pb-[32px]" :error="hasError"/>
    <Btn name="Opslaan" @click="handleClick" :width="'full'"/>
    <p v-if="error" class="text-secondary-red">{{ error }}</p>
    </div>
    </div>
  </template>
  
  <script setup>
  import Input from "../UI/Input.vue";
  import Btn from "../UI/Btn.vue";
  import { addLabel, updateBudget } from "../../functions/label";
  
  import { ref, watch } from "vue";
  import { useRouter } from "vue-router";
  
  const router = useRouter();
  
  const props = defineProps({
    showBudgetModal: Boolean,
    labelData: Object,
    userId: String,
    items: Object,
    path: String,
  });
  
  
  const showBudgetModal = ref(false);
  let budget = ref(null);
  let error = ref(null);
  let hasError = ref(false);
  
  const emit = defineEmits(["closeBudgetModal"]);
  
  // watch to see if showBudgetModal prop changes
  watch(
    () => props.showBudgetModal,
    (value) => {
      showBudgetModal.value = value;
    }
  );
  
  const closeBudgetModal = () => {
    showBudgetModal.value = false;
    emit("closeBudgetModal");
  };
  
  const handleOutsideClick = (event) => {
    if (event.target === event.currentTarget) {
      closeBudgetModal();
    }
  }; 

    const budgetHandler = (selectedBudget) => {
      budget.value = selectedBudget;
    };

  const patchData = async () => {
  try {
    let item = {
    budget_current: parseInt(budget.value),
   }; 
   if (isNaN(budget.value)) {
      error.value = "Budget moet een nummer zijn";
      hasError.value = true;
      return;
    }
   if (budget.value === null) {
    error.value = "Vul het invoerveld in";
    hasError.value = true;
    return;
    }
    else{
        error.value = null;
        const response = await updateBudget(item, props.userId);
        closeBudgetModal();
    }
    // Handle response if necessary
  } catch (error) {
    console.error('Error patching data:', error.message);
  }
};

// Define your event handlers
const handleClick = async () => {
  await patchData();
};
  </script>