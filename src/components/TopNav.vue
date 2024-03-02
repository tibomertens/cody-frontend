<script setup>
import { useRoute } from "vue-router";
import { ref } from "vue";

const activeLink = ref(false);
const route = useRoute();

// Functie om te controleren of de huidige route overeenkomt met de gegeven link
const isRouteActive = (link) => {
  return route.path === link;
};

function toggleActiveLink() {
  activeLink.value = !activeLink.value;
}

</script>

<template>
  <div class="xl:w-[85vw] bg-offWhite-light">
    <div class="xl:ml-10 xl:mr-10 pl-[24px] xl:pl-0"> <!-- Add margin top here -->
      <div class="pt-[24px] flex items-center justify-between">
        <h1 class="text-[2rem] font-bold mb-2">Home</h1>
        <router-link to="#" class="flex items-center ml-2 pr-5">
          <i class="fa-solid fa-gear"></i>
        </router-link>
      </div>
      <div class="flex gap-6 md:gap-[2rem] overflow-x-auto xl:mt-[12px] font-bold text-[1.2rem]">
        <router-link to="/" class="flex" :class="{ 'text-primary-medium': isRouteActive('/') }" custom-class="active">
          <span :class="{ 'border-b-4 border-primary-medium': isRouteActive('/') }">Alles</span>
        </router-link>
        <router-link to="/" class="flex" :class="{ 'text-primary-medium': isRouteActive('/suggestions') }"
          custom-class="active">
          <span :class="{ 'border-b-4 border-primary-medium': isRouteActive('/suggestions') }">Suggesties</span>
        </router-link>
        <router-link to="/" class="flex" :class="{ 'text-primary-medium': isRouteActive('/inProgress') }"
          custom-class="active">
          <span :class="{ 'border-b-4 border-primary-medium': isRouteActive('/inProgress') }">Meebezig</span>
        </router-link>
        <router-link to="/" class="flex" :class="{ 'text-primary-medium': isRouteActive('/done') }"
          custom-class="active">
          <span :class="{ 'border-b-4 border-primary-medium': isRouteActive('/done') }">Klaar</span>
        </router-link>
      </div>
    </div>
  </div>
</template>
