<script setup>
import Input from "../UI/Input.vue";
import Btn from "../UI/Button-Btn.vue";
import { resetpassword } from "../../functions/user";

import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// get token from url
const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get("token");

const hasError = ref(false);
const error = ref(null);

const password = ref("");
const confirmPassword = ref("");

let loadingState = ref(false);

const passwordInput = (value) => {
    password.value = value;
};

const passwordConfirm = (value) => {
    confirmPassword.value = value;
};

const updatePassword = async () => {
    // check if password and confirm password are the same and not empty
    if (!password.value || !confirmPassword.value) {
        hasError.value = true;
        error.value = "Gelieve alle velden in te vullen";
        return;
    }

    if (password.value !== confirmPassword.value) {
        hasError.value = true;
        error.value = "Wachtwoorden komen niet overeen";
        return;
    }

    loadingState.value = true;

    let result = await resetpassword(
        {
            password: password.value, token: token,
        }
    );

    loadingState.value = false;

    if (result.success) {
        // redirect to login page
        router.push("/login");
    } else {
        // Handle authentication error
        hasError.value = true;
        error.value = result.message;
    }
};

// watch to see if the token in the url changes
window.onpopstate = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
};
</script>

<template>
    <form>
        <Input :label="'Nieuw wachtwoord:'" :type="'password'" @input-change="passwordInput" :error="hasError"
            :forget="true"></Input>
        <Input :label="'Bevestig wachtwoord:'" :type="'password'" @input-change="passwordConfirm" :error="hasError"
            :forget="true"></Input>
        <div v-if="error" class="text-secondary-red">{{ error }}</div>
        <div class="mt-8 mb-4">
            <Btn :name="'Wachtwoord veranderen'" @click="updatePassword" :width="'full'" :loading="loadingState" />
        </div>
    </form>
</template>

<style scoped></style>