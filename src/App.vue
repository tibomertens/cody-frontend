<script setup>
const routeHasSidebar = (route) => {
  if (route.meta.sidebar === false) {
    return false;
  } else {
    return true;
  }
};
</script>

<template>
  <main class="w-full bg-offWhite-dark">
    <div :class="{ 'xl:flex': routeHasSidebar($route) }">
      <router-view name="sidebar"></router-view>
      <div>
        <router-view name="topNav"></router-view>
        <router-view></router-view>
      </div>
    </div>
  </main>
</template>

<style scoped></style>