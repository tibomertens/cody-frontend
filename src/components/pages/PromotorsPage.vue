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
<ul>
    <li v-for="promotor in promotors">
        {{ promotor.name }} 
        {{ promotor.location }}
        {{ promotor.phoneNumber }}
        
    </li>
</ul>

</template>

<style scoped>
</style>