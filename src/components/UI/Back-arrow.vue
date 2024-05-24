<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goBack = () => {
  router.go(-1);
}

</script>

<template>
    <div class="w-[24px] h-[24px] xl:w-[30px] xl:h-[30px]">
        <a href="#" @click="goBack">
            <img class="w-full h-full" src="/backArrow.svg" alt="arrow back">
        </a>
    </div>
</template>

<style scoped></style>