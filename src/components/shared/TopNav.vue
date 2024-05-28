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
  <div class="bg-offWhite-light w-full z-10 relative ">
    <div class="xl:ml-10 xl:mr-10 pl-[40px] xl:pl-0">
      <div class="py-[12px] flex items-center justify-between">
        <div class="flex gap-[12px] items-center">
          <BackArrow
            v-if="!isRouteActive('/account') && !isRouteActive('/') && !isRouteActive('/promotors') && !isRouteActive('/projects') && !isRouteActive('/projects/active') && !isRouteActive('/projects/recommended') && !isRouteActive('/projects/completed') && !isRouteActive('/projects/saved')" />
          <h1 class="text-[1.2em] xl:text-title font-bold mb-[4px]">{{ currentRouteName() }}</h1>
          <router-link v-if="isRouteActive('/account')" to="/settings">
            <img src="/edit_no_fill.svg" alt="edit icon"  class="w-[30px]">
          </router-link>
        </div>
        <router-link v-if="!isRouteActive('/account')" to="/settings" class="flex items-center ml-2 pr-[40px] xl:pr-0">
          <img src="/settings.svg" alt="settings">
        </router-link>
        
      </div>
      <div class="flex gap-6 md:gap-[2rem] overflow-x-auto xl:mt-[12px] font-bold text-[1.2rem]"
        v-if="isRouteActive('/settings/accountgegevens') || isRouteActive('/settings/doel') || isRouteActive('/settings/faq') || isRouteActive('/settings/privacy') || isRouteActive('/settings/gebruiksvoorwaarden')">
        <router-link @click="toggleActiveLink" to="/settings/accountgegevens" class="flex"
          :class="{ 'text-primary-medium': isRouteActive('/settings/accountgegevens'), 'border-b-4 border-primary-medium': isRouteActive('/settings/accountgegevens') }">
          <span>Accountgegevens</span>
        </router-link>
        <router-link @click="toggleActiveLink" to="/settings/doel" class="flex"
          :class="{ 'text-primary-medium': isRouteActive('/settings/doel'), 'border-b-4 border-primary-medium': isRouteActive('/settings/doel') }">
          <span>Doel</span>
        </router-link>
        <router-link @click="toggleActiveLink" to="/settings/faq" class="flex"
          :class="{ 'text-primary-medium': isRouteActive('/settings/faq'), 'border-b-4 border-primary-medium': isRouteActive('/settings/faq') }">
          <span>FAQ</span>
        </router-link>
        <router-link @click="toggleActiveLink" to="/settings/privacy" class="flex"
          :class="{ 'text-primary-medium': isRouteActive('/settings/privacy'), 'border-b-4 border-primary-medium': isRouteActive('/settings/privacy') }">
          <span>Privacy</span>
        </router-link>
        <router-link @click="toggleActiveLink" to="/settings/gebruiksvoorwaarden" class="flex"
          :class="{ 'text-primary-medium': isRouteActive('/settings/gebruiksvoorwaarden'), 'border-b-4 border-primary-medium': isRouteActive('/settings/gebruiksvoorwaarden') }">
          <span>Gebruiksvoorwaarden</span>
        </router-link>
      </div>
    </div>
  </div>
</template>
