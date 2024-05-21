<template>
    <div class="flex">
        <div class="w-1/2 h-screen justify-center items-center bg-[#FDFDFD] hidden lg:flex">
            <div><img src="/resetpassword.svg" alt="flat design" class="w-full"></div>
        </div>
        <div class="w-full lg:w-1/2 h-screen flex justify-center items-center">
            <div class="w-[80%] lg:w-[80%]">
                <div>
                    <BackArrow />
                    <h1 class="text-title font-bold mt-5">Verander je wachtwoord?</h1>
                    <resetPasswordForm />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import ResetPasswordForm from "../forms/ResetPasswordForm.vue";
import BackArrow from "../UI/Back-arrow.vue";
</script>