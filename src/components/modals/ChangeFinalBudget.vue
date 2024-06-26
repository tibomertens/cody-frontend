<template>
  <div v-if="showFinalBudgetModal === true"
    class="fixed inset-0 z-50 flex items-center justify-center bg-offBlack bg-opacity-50 w-full"
    @click="handleOutsideClick">
    <div class="bg-offWhite-dark p-8 rounded-lg shadow-md w-[85%] xs:w-[450px]">
      <h2 class="text-subtitle font-bold mb-[32px]">Wijzig Uitgaven</h2>
      <Input label="Bedrag" :pre-fix="'€'" @input-change="finalBudgetHandler" class="pb-[32px]" :error="hasError"
        :value="formattedPlaceholder" :placeholder="'bv. 2000'" />
      <Btn name="Opslaan" @click="handleClick" :width="'full'" :loading="loadingBtn" />
      <p v-if="error" class="text-secondary-red">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { ref, computed } from 'vue';
import Btn from '../UI/Btn.vue';
import Input from '../UI/Input.vue';
import { updateUserData } from '../../functions/renovation';

let newExpense = ref('');
let loadingBtn = ref(false);
let error = ref('');

const props = defineProps({
  showFinalBudgetModal: Boolean,
  renovation: Object,
  userId: String,
});

const emit = defineEmits(['closeFinalBudgetModal', 'confirmAction']);

const closeConfirm = () => {
  emit("closeFinalBudgetModal");
};

const confirmAction = () => {
  closeConfirm(); // Close the confirm modal
  emit("confirmAction"); // Emit event to indicate confirm action
};

const finalBudgetHandler = (value) => {
  newExpense.value = value;
};

const handleOutsideClick = (event) => {
  if (event.target === event.currentTarget) {
    closeConfirm();
  }
};

const handleClick = async () => {
  // Check if the input is empty
  if (!newExpense.value) {
    error.value = "Gelieve een bedrag in te vullen";

    return;
  }

  try {
    let result;

    loadingBtn.value = true;
    if (props.renovation.status === "Voltooid") {
      result = await updateUserData(props.userId, props.renovation.renovation._id, { budget_final: newExpense.value });
    }
    else {
      result = await updateUserData(props.userId, props.renovation.renovation._id, { budget: newExpense.value });
    }
    loadingBtn.value = false;

    if (result.success) {
      confirmAction();
    };
  } catch (error) {
    console.error('Failed to update final budget:', error);
  }
};

const formattedPlaceholder = computed(() => {
  return props.renovation.status === "Voltooid"
    ? props.renovation.budget_final
    : props.renovation.budget;
});

</script>
