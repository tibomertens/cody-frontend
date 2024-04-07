<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goBack = () => {
  router.go(-1);
}

</script>

<template>
    <div class="w-[32px] xl:w-[48px]">
        <a href="#" @click="goBack">
            <img src="/backArrow.svg" alt="arrow back">
        </a>
    </div>
</template>

<style scoped></style>