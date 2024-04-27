<script setup>
import AdminLoginForm from "../forms/AdminLoginForm.vue";
import Mascot from "../shared/Mascot.vue";
</script>

<template>
    <div class="flex">
        <Mascot />
        <div class="w-full lg:w-1/2 h-screen flex justify-center items-center">
            <div class="w-[80%] lg:w-[80%]">
                <div>
                    <h1 class="text-title font-bold">Login als admin</h1>
                    <AdminLoginForm />
                </div>
            </div>
        </div>
    </div>

</template>

<style scoped></style>
