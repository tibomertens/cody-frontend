<template>
    <div class="flex gap-[48px] justify-center h-calc-100vh-176 xl:h-calc-100vh-71 items-center m-[32px] sm:m-[40px]">
        <div class="hidden sm:block">
            <img src="/404.svg" alt="404" />
        </div>
        <div class="sm:relative top-[12px]">
            <h1 class="font-bold text-[7em] text-offBlack mb-0">404</h1>
            <p class="max-w-[400px]">Deze pagina bestaat niet. Ga terug naar het dashboard of gebruik een andere url.</p>
            <Btn name="Ga naar dashboard" class="mt-[26px]" @click="navigateToDashboard" />
        </div>
    </div>
</template>

<script setup>
import Btn from '../UI/Btn.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const navigateToDashboard = () => {
    router.push('/');
}
</script>