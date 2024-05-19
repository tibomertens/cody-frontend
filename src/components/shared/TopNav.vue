<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";

import BackArrow from '../UI/Back-arrow.vue';

const activeLink = ref(true); // Standard actief
const route = useRoute();

// Function to check if the current route matches the given link
const isRouteActive = (link) => {
  return route.path === link;
};

const currentRouteName = () => {
  return route.name;
};

function toggleActiveLink() {
  activeLink.value = !activeLink.value;
}

onMounted(() => {
  // Set the initial state of activeLink based on the current route
  activeLink.value = isRouteActive('/settings');
});

</script>

<template>
  <div class="bg-offWhite-light xl:fixed xl:w-[80%]">
    <div class="xl:ml-10 xl:mr-10 pl-[40px] xl:pl-0">
      <div class="py-[12px] flex items-center justify-between">
        <div class="flex gap-[12px] items-center">
          <BackArrow />
          <h1 class="text-title font-bold mb-2">{{ currentRouteName() }}</h1>
        </div>
        <router-link to="/settings" class="flex items-center ml-2 pr-[40px] xl:pr-0">
          <img src="/settings.svg" alt="settings">
        </router-link>
      </div>
      <div class="flex gap-6 md:gap-[2rem] overflow-x-auto xl:mt-[12px] font-bold text-[1.2rem]"
        v-if="isRouteActive('/settings')">
        <router-link @click="toggleActiveLink" to="/settings" class="flex"
          :class="{ 'text-primary-medium': activeLink, 'border-b-4 border-primary-medium': activeLink }">
          <span>Alles</span>
        </router-link>
        <router-link @click="toggleActiveLink" to="/suggestions" class="flex"
          :class="{ 'text-primary-medium': activeLink, 'border-b-4 border-primary-medium': activeLink }">
          <span>Suggesties</span>
        </router-link>
        <router-link @click="toggleActiveLink" to="/inProgress" class="flex"
          :class="{ 'text-primary-medium': activeLink, 'border-b-4 border-primary-medium': activeLink }">
          <span>Meebezig</span>
        </router-link>
        <router-link @click="toggleActiveLink" to="/done" class="flex"
          :class="{ 'text-primary-medium': activeLink, 'border-b-4 border-primary-medium': activeLink }">
          <span>Klaar</span>
        </router-link>
      </div>
    </div>
  </div>
</template>
