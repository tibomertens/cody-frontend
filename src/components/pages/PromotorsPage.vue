<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import PromotorCard from "../widgets/Promotor-card.vue";
import PromotorCardPremium from "../widgets/Promotor-card-premium.vue";

// put all information of the promotors in object using a get all promotors api call
const promotors = ref([]);

// get all promotors
const getAllPromotors = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/v1/promotors");
    promotors.value = (await response.json()).data;
    console.log(promotors.value);
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  getAllPromotors();
});


</script>

<template>
    <div>
        <ul v-for="promotor in promotors">
            <li v-if="promotor.is_big===false" class="sm:flex sm:flex-wrap lg:justify-between bg-offWhite-light my-[32px] mx-[40px] py-[12px] px-[32px] rounded-md">
               <Promotor-card :promotor="promotor"/>
            </li> 
            <li v-if="promotor.is_big===true" class="sm:flex sm:flex-wrap lg:justify-between bg-offWhite-light my-[32px] mx-[40px] py-[12px] px-[32px] rounded-md">
              <Promotor-card-premium :promotor="promotor"/>
            </li>
        </ul>
    </div>
</template>

<style scoped>
</style>