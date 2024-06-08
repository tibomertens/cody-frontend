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

import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { isValidToken, getUser, checkLabelUser, checkEmailConfirmed } from "../../functions/user";

const token = localStorage.getItem("token");
let userData = ref({});
let userId = ref("");

const router = useRouter();

onMounted(async () => {
    if (isValidToken(token)) {
        userData.value = await getUser(token);

        let emailConfirmed = await checkEmailConfirmed(userData.value);
        if (!emailConfirmed) {
            router.push("/login");
            return;
        }

        let hasLabel = await checkLabelUser(userData.value);
        if (!hasLabel) {
            router.push("/determinelabelchoice");
            return;
        }

        if (userData.value !== null) {
            userId.value = userData.value._id;
        } else {
            router.push("/login");
        }
    } else {
        router.push("/login");
    }
});
</script>