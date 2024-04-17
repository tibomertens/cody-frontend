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
  <div class="w-full xl:w-[20%] xl:fixed xl:left-0">
    <div class="w-full h-[20%] bg-offWhite-light xl:h-screen">
      <!-- Quintt: dit is voorbeeld, voeg eigen routes toe. -->
      <div class="flex justify-between p-5">
        <img src="" alt="logo icon" />
        <i class="hamburger fa-solid fa-bars self-center xl:hidden"></i>
      </div>

      <div class="hidden xl:block mt-[56px]">
        <router-link to="/" :class="{
          'font-normal': currentRoute !== '/',
          'font-bold': currentRoute === '/',
        }">
          <div class="pl-5 ml-5 py-[12px] rounded-l-[5px] flex" :class="{ 'bg-primary-light': currentRoute === '/' }">
            <div class="pr-3">
              <img :src="currentRoute !== '/' ? '/home.svg' : '/homeSelect.svg'" alt="home icon" class="w-[20px]" />
            </div>
            Dashboard
          </div>
        </router-link>

        <router-link to="/projects" :class="{
          'font-normal': currentRoute !== '/projects',
          'font-bold': currentRoute === '/projects',
        }">
          <div class="pl-5 ml-5 py-[12px] rounded-l-[5px] flex" :class="{ 'bg-primary-light': currentRoute === '/projects' }">
            <div class="pr-3">
              <img :src="currentRoute !== '/projects' ? '/hammer.svg' : '/hammerFill.svg'" alt="hammer icon" class="w-[20px]" />
            </div>
            Projects
          </div>
        </router-link>

        <router-link to="/projects/recommended" :class="{
          'font-normal': currentRoute !== '/projects/recommended',
          'font-bold': currentRoute === '/projects/recommended',
        }">
          <div class="pl-5 ml-[70px] py-[12px] rounded-l-[5px] flex text-[0.9rem]" :class="{ 'bg-primary-light': currentRoute === '/projects/recommended' }">
            Aanbevolen
          </div>
        </router-link>

        <router-link to="/projects/active" :class="{
          'font-normal': currentRoute !== '/projects/active',
          'font-bold': currentRoute === '/projects/active',
        }">
          <div class="pl-5 ml-[70px] py-[12px] rounded-l-[5px] flex text-[0.9rem]" :class="{ 'bg-primary-light': currentRoute === '/projects/active' }">
            Actief
          </div>
        </router-link>

        <router-link to="/projects/completed" :class="{
          'font-normal': currentRoute !== '/projects/completed',
          'font-bold': currentRoute === '/projects/completed',
        }">
          <div class="pl-5 ml-[70px] py-[12px] rounded-l-[5px] flex text-[0.9rem]" :class="{ 'bg-primary-light': currentRoute === '/projects/completed' }">
            Voltooid
          </div>
        </router-link>

        <router-link to="/projects/saved" :class="{
          'font-normal': currentRoute !== '/projects/saved',
          'font-bold': currentRoute === '/projects/saved',
        }">
          <div class="pl-5 ml-[70px] py-[12px] rounded-l-[5px] flex text-[0.9rem]" :class="{ 'bg-primary-light': currentRoute === '/projects/saved' }">
            Opgeslagen
          </div>
        </router-link>
        <router-link to="/promotors" :class="{
          'font-normal': currentRoute !== '/promotors',
          'font-bold': currentRoute === '/promotors',
        }">
          <div class="pl-5 ml-5 py-[12px] rounded-l-[5px] flex" :class="{ 'bg-primary-light': currentRoute === '/promotors' }">
            <div class="pr-3 self-center">
              <img :src="currentRoute !== '/promotors' ? '/helmetFill.svg' : '/helmetNoFill.svg'" alt="helmet icon" class="w-[20px]" />
            </div>
            Renovatoren
          </div>
        </router-link>
        <router-link to="/account" :class="{
          'font-normal': currentRoute !== '/account',
          'font-bold': currentRoute === '/account',
        }">
          <div class="p-5 ml-5 py-[12px] rounded-l-[5px]"
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

      <router-link to="/projects" :class="{
          'font-normal': currentRoute !== '/projects',
          'font-bold': currentRoute === '/projects',
        }">
        <div class="w-full p-5 flex" :class="{ 'bg-primary-light': currentRoute === '/projects' }">
          <div class="pr-3">
            <img :src="currentRoute !== '/projects' ? '/hammer.svg' : '/hammerFill.svg'" alt="hammer icon" class="w-[20px]" />
          </div>
          Projects
        </div>
      </router-link>

      <router-link to="/projects/recommended" :class="{
          'font-normal': currentRoute !== '/projects/recommended',
          'font-bold': currentRoute === '/projects/recommended',
        }">
        <div class="w-full p-5 text-[0.9rem] pl-[70px]" :class="{ 'bg-primary-light': currentRoute === '/projects/recommended' }">
          Aanbevolen
        </div>
      </router-link>

      <router-link to="/projects/active" :class="{
          'font-normal': currentRoute !== '/projects/active',
          'font-bold': currentRoute === '/projects/active',
        }">
        <div class="w-full p-5 text-[0.9rem] pl-[70px]" :class="{ 'bg-primary-light': currentRoute === '/projects/active' }">
          Actief
        </div>
      </router-link>

      <router-link to="/projects/completed" :class="{
          'font-normal': currentRoute !== '/projects/completed',
          'font-bold': currentRoute === '/projects/completed',
        }">
        <div class="w-full p-5 text-[0.9rem] pl-[70px]" :class="{ 'bg-primary-light': currentRoute === '/projects/completed' }">
          Voltooid
        </div>
      </router-link>

      <router-link to="/projects/saved" :class="{
          'font-normal': currentRoute !== '/projects/saved',
          'font-bold': currentRoute === '/projects/saved',
        }">
        <div class="w-full p-5 text-[0.9rem] pl-[70px]" :class="{ 'bg-primary-light': currentRoute === '/projects/saved' }">
          Opgeslagen
        </div>
      </router-link>
  
      <router-link to="/promotors" :class="{
        'font-normal': currentRoute !== '/promotors',
        'font-bold': currentRoute === '/promotors',
      }">
      <div class="w-full p-5 flex" :class="{ 'bg-primary-light': currentRoute === '/promotors' }">
        <div class="pr-3 self-center">
          <img :src="currentRoute !== '/promotors' ? '/helmetFill.svg' : '/helmetNoFill.svg'" alt="helmet icon" class="w-[20px]" />
        </div>
        Renovatoren
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
