<script setup>
  document.addEventListener('DOMContentLoaded', () => {
    //select the div with dropdown class
    const dropdown = document.querySelector('.dropdown');
    const hamburger = document.querySelector('.hamburger');
    //add event listener to the hamburger icon
    hamburger.addEventListener('click', () => {
      //toggle the hidden class
      dropdown.classList.toggle('hidden');
      //change fa-solid fa-bars to fa-solid fa-xmark
      hamburger.classList.toggle('fa-bars');
      hamburger.classList.toggle('fa-xmark');
    });
  });
</script>

    
<template>
  <div class="">
    <div class="w-full h-15 bg-red-200 flex justify-between p-5">
      <!-- Quintt: dit is voorbeeld, voeg eigen routes toe. -->
      <img src="" alt="logo icon" />
      <i class="hamburger fa-solid fa-bars self-center"></i>
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
