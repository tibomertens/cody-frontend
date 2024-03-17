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
    <div class="w-full h-[20%] bg-offWhite-light xl:h-screen">
      <!-- Quintt: dit is voorbeeld, voeg eigen routes toe. -->
      <div class="flex justify-between p-5">
        <img src="" alt="logo icon" />
        <i class="hamburger fa-solid fa-bars self-center xl:hidden"></i>
      </div>

      <div class="hidden xl:block mt-[51px]">
        <router-link to="/" :class="{
          'font-normal': currentRoute !== '/',
          'font-bold': currentRoute === '/',
        }">
          <div class="pl-5 ml-5 py-[12px] rounded-l-[5px] flex" :class="{ 'bg-primary-light': currentRoute === '/' }">
            <div class="pr-3">
              <img :src="currentRoute !== '/' ? '/home.svg' : '/homeSelect.svg'" alt="home icon" class="w-[20px]" />
            </div>
            Home
          </div>
        </router-link>
        <router-link to="/saved" :class="{
          'font-normal': currentRoute !== '/saved',
          'font-bold': currentRoute === '/saved',
        }">
          <div class="p-5 ml-5 mt-4 py-[12px] rounded-l-[5px]"
            :class="{ 'bg-primary-light': currentRoute === '/saved' }">
            <i class="pr-3 w-[20px]" :class="{
          'fa-regular': currentRoute !== '/saved',
          'fa-solid': currentRoute === '/saved',
          'fa-bookmark': true,
        }"></i>
            Bewaard
          </div>
        </router-link>
        <router-link to="/account" :class="{
          'font-normal': currentRoute !== '/account',
          'font-bold': currentRoute === '/account',
        }">
          <div class="p-5 ml-5 mt-4 py-[12px] rounded-l-[5px]"
            :class="{ 'bg-primary-light': currentRoute === '/account' }">
            <i class="pr-3 w-[20px]" :class="{
          'fa-regular': currentRoute !== '/account',
          'fa-solid': currentRoute === '/account',
          'fa-user': true,
        }"></i>
            Account
          </div>
        </router-link>
        <router-link to="/account" class="">
          <div class="">
            <img src="" alt="mascotte" />
          </div>
        </router-link>
      </div>
    </div>
    <div class="dropdown bg-offWhite-light hidden">
      <router-link to="/" :class="{
          'font-normal': currentRoute !== '/',
          'font-bold': currentRoute === '/',
        }">
        <div class="w-full p-5 flex" :class="{ 'bg-primary-light': currentRoute === '/' }">
          <div class="pr-3">
            <img :src="currentRoute !== '/' ? '/home.svg' : '/homeSelect.svg'" alt="home icon" class="w-[20px]" />
          </div>
          Home
        </div>
      </router-link>
      <router-link to="/bewaard" :class="{
          'font-normal': currentRoute !== '/bewaard',
          'font-bold': currentRoute === '/bewaard',
        }">
        <div class="w-full p-5" :class="{ 'bg-primary-light': currentRoute === '/bewaard' }">
          <i class="pr-3 w-[20px]" :class="{
          'fa-regular': currentRoute !== '/bewaard',
          'fa-solid': currentRoute === '/bewaard',
          'fa-bookmark': true,
        }"></i>
          Bewaard
        </div>
      </router-link>
      <router-link to="/account" :class="{
          'font-normal': currentRoute !== '/account',
          'font-bold': currentRoute === '/account',
        }">
        <div class="w-full p-5" :class="{ 'bg-primary-light': currentRoute === '/account' }">
          <i class="pr-3 w-[20px]" :class="{
          'fa-regular': currentRoute !== '/account',
          'fa-solid': currentRoute === '/account',
          'fa-user': true,
        }"></i>
          Account
        </div>
      </router-link>
      <router-link to="/account" class="">
        <div class="hidden">
          <img src="" alt="mascotte" />
        </div>
      </router-link>
    </div>
  </div>
</template>
