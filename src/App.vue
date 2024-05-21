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
      <div class="xl:flex-1 min-h-screen" :class="{ 'xl:max-w-[80vw]': routeHasSidebar($route) }">
        <router-view name="topNav" class="xl:pt-[0px] pt-[75px] xl:w-[80%]"></router-view>
        <div :class="{ 'xl:pt-[0px]': routeHasSidebar($route) }">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped></style>