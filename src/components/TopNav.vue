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
  <div class="xl:w-full bg-offWhite-light">
    <div class="mt-4 xl:ml-10 xl:mr-10"> <!-- Add margin top here -->
      <div class="pl-5 mt-2 flex items-center justify-between">
        <h1 class="text-lg font-bold mb-2">Home</h1>
        <router-link to="#" class="flex items-center ml-2 pr-5">
          <i class="fa-solid fa-gear"></i>
        </router-link>
      </div>

      <div class="pl-5 mt-2 flex gap-6 md:gap-[2rem] overflow-x-auto xl:mt-4">
        <router-link to="/everything" class="flex" :class="{ 'text-primary-light': isRouteActive('/everything') }"
          custom-class="active">
          <span :class="{ 'border-b-2 border-primary-light mb-2': isRouteActive('/everything') }">Alles</span>
        </router-link>
        <router-link to="/suggestions" class="flex" :class="{ 'text-primary-light': isRouteActive('/suggestions') }"
          custom-class="active">
          <span :class="{ 'border-b-2 border-primary-light mb-2': isRouteActive('/suggestions') }">Suggesties</span>
        </router-link>
        <router-link to="/inProgress" class="flex" :class="{ 'text-primary-light': isRouteActive('/inProgress') }"
          custom-class="active">
          <span :class="{ 'border-b-2 border-primary-light mb-2': isRouteActive('/inProgress') }">Meebezig</span>
        </router-link>
        <router-link to="/done" class="flex" :class="{ 'text-primary-light': isRouteActive('/done') }" custom-class="active">
          <span :class="{ 'border-b-2 border-primary-light mb-2': isRouteActive('/done') }">Klaar</span>
        </router-link>
      </div>
    </div>
  </div>
</template>
