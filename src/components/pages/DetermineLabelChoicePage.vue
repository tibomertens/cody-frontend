<script setup>
import { useRoute } from "vue-router";
import Btn from "../UI/Btn.vue";

// Use route
const route = useRoute();
</script>

<template>
  <div class="p-10 h-screen content-center lg:flex">
    <div class="lg:w-1/2 lg:content-center">
      <h2 class="text-subtitle font-bold text-center pb-3">Ik heb een EPC-rapport</h2>
      <p class="text-body text-center pb-5 lg:w-[80%] ml-[10%]">Er is al eens een expert bij jou thuis langsgeweest en die heeft een EPC-rapport voor jou opgeesteld en je hebt hiervan een EPC-score & label gekregen. Als je deze bij de hand hebt kun je deze gebruiken om de benodigde info in te vullen.</p>
      <div class="hidden w-full lg:flex justify-center my-5">
        <img class="w-[360px] h-[360px] border border-red-500" src="#" alt="Rapport">
      </div>
      <div class="w-full flex justify-center ">
          <router-link to="/rapport/checklist"><Btn name="Gebruik uw rapport"/></router-link>
      </div>
    </div>
    <div class="w-full border-b-4 border-offBlack opacity-10 my-10 lg:border-s-4 lg:border-b-0 lg:w-1 lg:mx-10"></div>
    <div class="lg:w-1/2 lg:content-center">
      <h2 class="text-subtitle font-bold text-center pb-3">Ik heb geen EPC-rapport</h2>
      <p class="text-body text-center pb-5 lg:w-[80%] ml-[10%]">Je hebt nog geen idee wat je score of label is en je hebt nog geen professionele hulp gehad maar wilt wel al aan de slag of eens kijken wat je te wachten staat. </p>
      <div class="hidden lg:flex justify-center my-5">
        <img class="w-[360px] h-[360px]  border border-red-500" src="#" alt="Indicatieve test">
      </div>
      <div class="w-full flex justify-center ">
          <router-link to="/test/berekenIndicatief"><Btn name="Gebruik de indicatieve test"/></router-link>
      </div>
      <div class="w-full flex justify-center ">
          <p class="text-xs pt-2">*deze test is puur indicatief en kan afwijken van het daadwerkelijke label.</p>
      </div>
      </div>
  </div>
</template>

<style scoped></style>
