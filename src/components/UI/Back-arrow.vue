<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goBack = () => {
  router.go(-1);
}

</script>

<template>
    <div class="w-[32px] h-[32px] xl:w-[48px] xl:h-[48px]">
        <a href="#" @click="goBack">
            <img class="w-full h-full" src="/backArrow.svg" alt="arrow back">
        </a>
    </div>
</template>

<style scoped></style>