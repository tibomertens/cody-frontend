<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();

document.addEventListener("DOMContentLoaded", () => {
  const dropdown = document.querySelector(".dropdown");
  const hamburger = document.querySelector(".hamburger");

  hamburger.addEventListener("click", () => {
    const advFilter = document.querySelector(".adv-filter");
    const advFilterText = document.querySelector(".adv-filter-text");
    const searchbar = document.querySelector(".searchbar");
    const searchbarIcon = document.querySelector(".searchbar-icon");

    dropdown.classList.toggle("hidden");
    hamburger.classList.toggle("active");

    if (advFilter !== null) {
      advFilter.classList.toggle("relative");
      advFilterText.classList.toggle("relative");
    }

    if (searchbar !== null) {
      searchbar.classList.toggle("relative");
      searchbarIcon.classList.toggle("hidden");
    }

    dropdown.addEventListener("click", () => {
      dropdown.classList.add("hidden");
      hamburger.classList.remove("active");
    });
  });
});

const currentRoute = ref("");
const route = useRoute();

const logout = () => {
  localStorage.removeItem("token");
  router.push("/login");
};

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
  <div class="w-full xl:w-[20%] fixed xl:left-0">
    <div class="w-full h-[20%] bg-offWhite-light xl:h-screen">
      <div class="flex justify-between xl:justify-center items-center py-5 px-[40px]">
        <router-link to="/">
          <img src="/logo.svg" alt="logo icon" />
        </router-link>
        <i class="hamburger self-center inline-block xl:hidden cursor-pointer">
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </i>
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
          <div class="pl-5 ml-5 py-[12px] rounded-l-[5px] flex"
            :class="{ 'bg-primary-light': currentRoute === '/projects' }">
            <div class="pr-3">
              <img :src="currentRoute !== '/projects' ? '/hammer.svg' : '/hammerFill.svg'" alt="hammer icon"
                class="w-[20px]" />
            </div>
            Projects
          </div>
        </router-link>

        <router-link to="/projects/recommended" :class="{
          'font-normal': currentRoute !== '/projects/recommended',
          'font-bold': currentRoute === '/projects/recommended',
        }">
          <div class="pl-5 ml-[70px] py-[12px] rounded-l-[5px] flex text-[0.9rem]"
            :class="{ 'bg-primary-light': currentRoute === '/projects/recommended' }">
            Aanbevolen
          </div>
        </router-link>

        <router-link to="/projects/active" :class="{
          'font-normal': currentRoute !== '/projects/active',
          'font-bold': currentRoute === '/projects/active',
        }">
          <div class="pl-5 ml-[70px] py-[12px] rounded-l-[5px] flex text-[0.9rem]"
            :class="{ 'bg-primary-light': currentRoute === '/projects/active' }">
            Actief
          </div>
        </router-link>

        <router-link to="/projects/completed" :class="{
          'font-normal': currentRoute !== '/projects/completed',
          'font-bold': currentRoute === '/projects/completed',
        }">
          <div class="pl-5 ml-[70px] py-[12px] rounded-l-[5px] flex text-[0.9rem]"
            :class="{ 'bg-primary-light': currentRoute === '/projects/completed' }">
            Voltooid
          </div>
        </router-link>

        <router-link to="/projects/saved" :class="{
          'font-normal': currentRoute !== '/projects/saved',
          'font-bold': currentRoute === '/projects/saved',
        }">
          <div class="pl-5 ml-[70px] py-[12px] rounded-l-[5px] flex text-[0.9rem]"
            :class="{ 'bg-primary-light': currentRoute === '/projects/saved' }">
            Opgeslagen
          </div>
        </router-link>
        <router-link to="/promotors" :class="{
          'font-normal': currentRoute !== '/promotors',
          'font-bold': currentRoute === '/promotors',
        }">
          <div class="pl-5 ml-5 py-[12px] rounded-l-[5px] flex"
            :class="{ 'bg-primary-light': currentRoute === '/promotors' }">
            <div class="pr-3 self-center">
              <img :src="currentRoute !== '/promotors' ? '/helmetNoFill.svg' : '/helmetFill.svg'" alt="helmet icon"
                class="w-[20px]" />
            </div>
            Renovatoren
          </div>
        </router-link>
        <router-link to="/account" :class="{
          'font-normal': currentRoute !== '/account',
          'font-bold': currentRoute === '/account',
        }">
          <div class="p-5 ml-5 py-[12px] rounded-l-[5px]" :class="{ 'bg-primary-light': currentRoute === '/account' }">
            <i class="pr-3 w-[20px]" :class="{
              'fa-regular': currentRoute !== '/account',
              'fa-solid': currentRoute === '/account',
              'fa-user': true,
            }"></i>
            Account
          </div>
        </router-link>
      
        <!-- only show this if the currentRoute is /account -->
        <div v-if="currentRoute === '/account'" class="py-[32px] rounded-l-[5px] flex justify-center text-btn text-secondary-red font-bold" @click="logout">
          Uitloggen
        </div>
      </div>
    </div>

    <div class="dropdown bg-offWhite-light hidden relative z-50">
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
            <img :src="currentRoute !== '/projects' ? '/hammer.svg' : '/hammerFill.svg'" alt="hammer icon"
              class="w-[20px]" />
          </div>
          Projects
        </div>
      </router-link>

      <router-link to="/projects/recommended" :class="{
        'font-normal': currentRoute !== '/projects/recommended',
        'font-bold': currentRoute === '/projects/recommended',
      }">
        <div class="w-full p-5 text-[0.9rem] pl-[70px]"
          :class="{ 'bg-primary-light': currentRoute === '/projects/recommended' }">
          Aanbevolen
        </div>
      </router-link>

      <router-link to="/projects/active" :class="{
        'font-normal': currentRoute !== '/projects/active',
        'font-bold': currentRoute === '/projects/active',
      }">
        <div class="w-full p-5 text-[0.9rem] pl-[70px]"
          :class="{ 'bg-primary-light': currentRoute === '/projects/active' }">
          Actief
        </div>
      </router-link>

      <router-link to="/projects/completed" :class="{
        'font-normal': currentRoute !== '/projects/completed',
        'font-bold': currentRoute === '/projects/completed',
      }">
        <div class="w-full p-5 text-[0.9rem] pl-[70px]"
          :class="{ 'bg-primary-light': currentRoute === '/projects/completed' }">
          Voltooid
        </div>
      </router-link>

      <router-link to="/projects/saved" :class="{
        'font-normal': currentRoute !== '/projects/saved',
        'font-bold': currentRoute === '/projects/saved',
      }">
        <div class="w-full p-5 text-[0.9rem] pl-[70px]"
          :class="{ 'bg-primary-light': currentRoute === '/projects/saved' }">
          Opgeslagen
        </div>
      </router-link>

      <router-link to="/promotors" :class="{
        'font-normal': currentRoute !== '/promotors',
        'font-bold': currentRoute === '/promotors',
      }">
        <div class="w-full p-5 flex" :class="{ 'bg-primary-light': currentRoute === '/promotors' }">
          <div class="pr-3 self-center">
            <img :src="currentRoute !== '/promotors' ? '/helmetNoFill.svg' : '/helmetFill.svg'" alt="helmet icon"
              class="w-[20px]" />
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
    </div>
  </div>
</template>

<style>
.hamburger {
  position: relative;
  width: 22px;
  height: 16px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.hamburger .bar {
  display: block;
  width: 100%;
  height: 2.5px;
  background-color: black;
  transition: all 0.3s ease;
  position: absolute;
}

.hamburger .bar:nth-child(1) {
  top: 0;
}

.hamburger .bar:nth-child(2) {
  top: 50%;
  transform: translateY(-50%);
}

.hamburger .bar:nth-child(3) {
  bottom: 0;
}

.hamburger.active .bar:nth-child(1) {
  transform: rotate(45deg);
  top: 50%;
}

.hamburger.active .bar:nth-child(2) {
  opacity: 0;
}

.hamburger.active .bar:nth-child(3) {
  transform: rotate(-45deg);
  top: 50%;
}
</style>
