<script setup>
import SideNav from './components/SideNav.vue';
</script>

<template>
  <main class="w-full h-screen">
    <SideNav />
    <router-view></router-view>
  </main>
</template>

<style scoped></style>
