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
    <div :class="{ 'xl:flex xl:pl-[20%]': routeHasSidebar($route) }">
      <router-view name="sidebar"></router-view>
      <div class="xl:flex-1">
        <router-view name="topNav"></router-view>
        <div :class="{ 'xl:pt-[115px]': routeHasSidebar($route) }">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped></style>