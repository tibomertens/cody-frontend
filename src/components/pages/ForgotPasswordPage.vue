<script setup>
import PasswordForm from "../forms/ForgotPasswordForm.vue";
import BackArrow from "../UI/Back-arrow.vue";
</script>

<template>
    <div class="flex">
        <div class="w-1/2 h-screen justify-center items-center bg-[#FDFDFD] hidden lg:flex">
            <div><img src="/wwVergeten.svg" alt="flat design" class="w-full"></div>
        </div>
        <div class="w-full lg:w-1/2 h-screen flex justify-center items-center">
            <div class="w-[80%] lg:w-[80%]">
                <div>
                    <BackArrow />
                    <h1 class="text-title font-bold mt-5">Wachtwoord vergeten?</h1>
                    <PasswordForm />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
