<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";

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
    <div class="">
        <ul class="">
            <li v-for="promotor in promotors" class="sm:flex sm:flex-wrap lg:justify-between bg-offWhite-light my-[32px] mx-[40px] py-[12px] px-[32px] rounded-md">
                <div class="flex justify-center pt-[10px] font-bold sm:w-[50%] lg:w-[15%]">
                    {{ promotor.name }} 
                </div>
                <div class="flex justify-center pt-[10px] sm:w-[50%] lg:w-[15%] lg:text-center">
                    {{ promotor.location }}
                </div>
                <div class="flex justify-center pt-[10px] sm:w-[50%] lg:w-[15%] lg:text-center">
                    {{ promotor.phoneNumber }}
                </div>
                <div class="flex justify-center pt-[10px] pb-[10px] items-center lg:justify-end gap-[10px] sm:w-[50%] lg:w-[15%] lg:text-right">
                  <i class="fa-solid fa-star" style="color: #ff9900;"></i>
                  <p>5/5</p>
                  <a href="#" class="underline">Reviews</a>
                </div>
            </li>
        </ul>
    </div>
</template>

<style scoped>
</style>