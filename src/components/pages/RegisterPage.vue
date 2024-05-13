<script setup>
import RegisterForm from "../forms/RegisterForm.vue";
import Input from "../UI/Input.vue";
import Btn from "../UI/Button-Btn.vue";
import Checkbox from "../UI/Checkbox.vue";
</script>

<template>
    <div class="flex">
        <div class="w-1/2 h-screen justify-center items-center bg-[#FDFDFD] hidden lg:flex">
            <div><img src="/register.svg" alt="mascot" class="w-full"></div>
        </div>
        <div class="w-full lg:w-1/2 h-screen flex justify-center items-center">
            <div class="w-[80%] lg:w-[80%]">
                <div>
                    <h1 class="text-title font-bold">Registreer</h1>
                    <RegisterForm />
                    <div class="flex justify-center gap-2">
                        <p class="text-sm font-bold">Heb je al een account?</p>
                        <a href="/login" class="text-sm underline">Login</a>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<style scoped></style>
