<template>
  <div v-if="showConfirm" class="fixed inset-0 z-50 flex items-center justify-center bg-offBlack bg-opacity-50 w-full"
    @click="handleOutsideClick">
    <div class="bg-offWhite-light p-7 rounded font-bold">
      <div class="text-center">
        <h2 class="text-subtitle">{{ props.title }}</h2>
        <p v-if="props.desc" class="font-light max-w-[400px] mt-3">{{ props.desc }}</p>
      </div>
      <div class="mt-5">
        <div class="w-full">
          <Btn @click="confirmAction" :width="'full'" name="Doorgaan" />
        </div>
        <div class="w-full mt-4">
          <GhostBtn @click="closeConfirm" :width="'full'" name="Annuleren" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Btn from "../UI/Btn.vue";
import GhostBtn from "../UI/Ghost-btn.vue";

const props = defineProps({
  showConfirm: Boolean,
  title: String,
  desc: String,
});

const emit = defineEmits(["closeConfirm", "confirmAction"]);

const closeConfirm = () => {
  emit("closeConfirm");
};

const confirmAction = () => {
  closeConfirm(); // Close the confirm modal
  emit("confirmAction"); // Emit event to indicate confirm action
};

const handleOutsideClick = (event) => {
  if (event.target === event.currentTarget) {
    closeConfirm();
  }
};
</script>
