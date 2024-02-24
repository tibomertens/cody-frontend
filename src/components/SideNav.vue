<script setup>
//select the div with dropdown class
// const dropdown = document.querySelector('.dropdown');
// const burger = document.querySelector('#hamburger');
// burger.addEventListener('click', () => {
//   dropdown.classList.toggle('hidden');
// });

</script>
    
<template>
  <div class="">
    <div class="w-full h-15 bg-red-200 flex justify-between p-5">
      <!-- Quintt: dit is voorbeeld, voeg eigen routes toe. -->
      <img src="" alt="logo icon" />
      <i class="fa-solid fa-bars self-center" id="hamburger"></i>
    </div>
    <div class="dropdown hidden">
      <div class="w-full bg-red-300 p-5">
        <router-link to="/home">
          <i class="fa-solid fa-house pr-3 relative right-[2.5px]"></i>
          Home
        </router-link>
      </div>
      <div class="w-full bg-red-300 p-5">
        <router-link to="/bewaard" class="">
          <i class="fa-solid fa-bookmark pr-3"></i>
          Bewaard
        </router-link>
      </div>
      <div class="w-full bg-red-300 p-5">
        <router-link to="/account" class="">
          <i class="fa-solid fa-user pr-3"></i>
          Account
        </router-link>
      </div>
      <div class="hidden">
        <router-link to="/account" class="">
          <img src="" alt="mascotte" />
        </router-link>
      </div>
    </div>
  </div>
</template>
