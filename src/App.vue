<script setup>
</script>

<template>
  <main class="w-full h-screen">
    <div class="xl:flex">
      <router-view name="sidebar"></router-view>
      <router-view name="topNav"></router-view>
    </div>
    <router-view></router-view>
  </main>
</template>

<style scoped></style>