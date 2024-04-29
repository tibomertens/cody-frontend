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
    <section>
            <div class="flex gap-[8px] mt-[40px] ml-[40px]">
                <h2 class="text-subtitle mb-[20px] font-bold">Budget</h2>
                <div><img src="#" alt="potlood"></div>
              </div>
              <div class="mx-[40px] bg-offWhite-light w-[90%] pt-10 rounded mb-[40px]">
                 <div class="bg-offWhite-dark ml-[20%] mr-[20%] mt-[40px] w-[60%] h-[52px] rounded">
                    <div :style="{ width: spentBudgetPercentage }" class="h-full bg-primary-medium rounded"></div>
                 </div>
                 <div class="flex justify-center">
                     <div class="flex w-[90%] justify-between mt-[20px] px-10 mb-14">
                         <div class="flex gap-[32px]">
                            <div><img src="/money.svg" alt="Uitgegeven budget" class="w-[58px]"></div>
                            <div>
                                <p class="text-body font-bold">Uitgegeven budget</p>
                                <p class="text-xs">{{ spentBudget }} EUR</p>
                            </div>
                         </div>
                         <div class="flex gap-[32px]">
                            <div><img src="/moneyLight.svg" alt="Overig budget" class="w-[58px]"></div>
                            <div>
                                <p class="text-body font-bold">Overig budget</p>
                                <p class="text-xs">{{ currentBudget-spentBudget }} EUR</p>
                            </div>
                         </div>
                     </div>
                 </div>
                 <div class="w-full h-[48px] bg-primary-dark rounded text-offWhite-light text-btn flex justify-center items-center">
                     <a href="#">Bekijk al je uitgaven</a>
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
  let currentBudget;
  let spentBudget;
  let spentBudgetPercentage = ref("");
  
  onMounted(async () => {
    if (isValidToken(token)) {
      userData.value = await getUser(token);
      currentLabel.value = userData.value.label;
      goalLabel.value = userData.value.goalLabel;
      currentBudget = userData.value.budget_current;
      spentBudget = userData.value.budget_spent;
      console.log(userData.value);
      spentBudgetPercentage.value = `${100-(spentBudget / currentBudget) * 100}%`;
    } else {
      router.push("/login");
    }
  });
  
  const labels = ['F', 'E', 'D', 'C', 'B', 'A', 'A+'];
  </script>
  
  <style scoped></style>
  