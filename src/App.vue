<script setup>
import SideNav from './components/SideNav.vue';
import TopNav from './components/TopNav.vue';
</script>

<template>
  <main class="w-full">
    <div class="xl:flex">
      <SideNav />
      <TopNav class="xl:w-full"/>
    </div>
    <router-view></router-view>
  </main>
</template>

<style scoped></style>
