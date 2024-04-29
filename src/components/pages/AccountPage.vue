<template>
    <section>
      <div class="flex gap-[8px] mt-[40px] ml-[40px]">
        <h2 class="text-subtitle mb-[20px] font-bold">Doel</h2>
        <div><img src="#" alt="potlood"></div>
      </div>
      <div class="flex mx-[40px] justify-center items-center bg-offWhite-light w-[90%] h-[196px] p-10 rounded">
        <div v-for="label in labels" :key="label">
          <img :src="`/${label}-label.svg`" :alt="`epc label ${label}`" class="md:w-[100px] w-[20px]" :class="{ 'scale-[150%] md:scale-[150%] md:mx-7 mx-2 md:mt-10 mt-[54px]': label === currentLabel || label === goalLabel }">
          <p v-if="label === currentLabel" class="md:w-[150px] w-[20px] text-xs md:text-body flex justify-center pt-4">Jouw label</p>
          <p v-else-if="label === goalLabel" class="md:w-[150px] w-[20px] text-xs md:text-body flex justify-center pt-4">Jouw doel</p>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useRouter } from "vue-router";
  import { isValidToken, getUser } from "../../functions/user.js";
  
  const router = useRouter();
  
  const token = localStorage.getItem("token");
  let userData = ref({});
  let currentLabel = ref("");
  let goalLabel = ref("");
  
  onMounted(async () => {
    if (isValidToken(token)) {
      userData.value = await getUser(token);
      currentLabel.value = userData.value.label;
      goalLabel.value = userData.value.goalLabel;
    } else {
      router.push("/login");
    }
  });
  
  const labels = ['F', 'E', 'D', 'C', 'B', 'A', 'A+'];
  </script>
  
  <style scoped></style>
  