<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";

document.addEventListener("DOMContentLoaded", () => {
  //select the div with dropdown class
  const dropdown = document.querySelector(".dropdown");
  const hamburger = document.querySelector(".hamburger");
  //add event listener to the hamburger icon
  hamburger.addEventListener("click", () => {
    //toggle the hidden class
    dropdown.classList.toggle("hidden");
    //change fa-solid fa-bars to fa-solid fa-xmark
    hamburger.classList.toggle("fa-bars");
    hamburger.classList.toggle("fa-xmark");
  });
});

const currentRoute = ref("");
const route = useRoute();

onMounted(() => {
  currentRoute.value = route.path;

  // Watch for route changes
  watch(
    () => route.path,
    (newRoute) => {
      currentRoute.value = newRoute;
    }
  );
});
</script>

<template>
  <div class="w-full xl:w-[20%]">
    <div class="w-full h-[20%] bg-[#EDF0F5]  xl:h-screen">
      <!-- Quintt: dit is voorbeeld, voeg eigen routes toe. -->
      <div class="flex justify-between p-5">
        <img src="" alt="logo icon" />
        <i class="hamburger fa-solid fa-bars self-center xl:hidden"></i>
      </div>

      <div class="hidden xl:block">
        <div class="pl-5 ml-5 py-[12px] rounded-l-[5px]" :class="{ 'bg-[#9EBDFF]': currentRoute === '/home' }">
          <router-link to="/home"
            :class="{ 'font-normal': currentRoute !== '/home', 'font-bold': currentRoute === '/home' }">
            <i class="pr-3" :class="{
              'fa-regular': currentRoute !== '/home',
              'fa-solid': currentRoute === '/home',
              'fa-building': true,
            }"></i>

            Home
          </router-link>
        </div>
        <div class="p-5 ml-5 mt-4 py-[12px] rounded-l-[5px]" :class="{ 'bg-[#9EBDFF]': currentRoute === '/bewaard' }">
          <router-link to="/bewaard"
            :class="{ 'font-normal': currentRoute !== '/bewaard', 'font-bold': currentRoute === '/bewaard' }">
            <i class="pr-3" :class="{
              'fa-regular': currentRoute !== '/bewaard',
              'fa-solid': currentRoute === '/bewaard',
              'fa-bookmark': true,
            }"></i>
            Bewaard
          </router-link>
        </div>
        <div class="p-5 ml-5 mt-4 py-[12px] rounded-l-[5px]" :class="{ 'bg-[#9EBDFF]': currentRoute === '/account' }">
          <router-link to="/account"
            :class="{ 'font-normal': currentRoute !== '/account', 'font-bold': currentRoute === '/account' }">
            <i class="pr-3" :class="{
              'fa-regular': currentRoute !== '/account',
              'fa-solid': currentRoute === '/account',
              'fa-user': true,
            }"></i>
            Account
          </router-link>
        </div>
        <div class="">
          <router-link to="/account" class="">
            <img src="" alt="mascotte" />
          </router-link>
        </div>
      </div>
    </div>
    <div class="dropdown bg-[#EDF0F5] hidden">
      <div class="w-full p-5" :class="{ 'bg-[#9EBDFF]': currentRoute === '/' }">
        <router-link to="/" :class="{ 'font-normal': currentRoute !== '/', 'font-bold': currentRoute === '/' }">
          <i class="pr-3" :class="{
            'fa-regular': currentRoute !== '/',
            'fa-solid': currentRoute === '/',
            'fa-building': true,
          }"></i>
          Home
        </router-link>
      </div>
      <div class="w-full p-5" :class="{ 'bg-[#9EBDFF]': currentRoute === '/bewaard' }">
        <router-link to="/bewaard"
          :class="{ 'font-normal': currentRoute !== '/bewaard', 'font-bold': currentRoute === '/bewaard' }">
          <i class="pr-3" :class="{
            'fa-regular': currentRoute !== '/bewaard',
            'fa-solid': currentRoute === '/bewaard',
            'fa-bookmark': true,
          }"></i>
          Bewaard
        </router-link>
      </div>
      <div class="w-full p-5" :class="{ 'bg-[#9EBDFF]': currentRoute === '/account' }">
        <router-link to="/account"
          :class="{ 'font-normal': currentRoute !== '/account', 'font-bold': currentRoute === '/account' }">
          <i class="pr-3" :class="{
            'fa-regular': currentRoute !== '/account',
            'fa-solid': currentRoute === '/account',
            'fa-user': true,
          }"></i>
          Account
        </router-link>
      </div>
      <div class="hidden">
        <router-link to="/account" class="">
          <img src="" alt="mascotte" />
        </router-link>
      </div>
    </div>
  </div>
</template>
