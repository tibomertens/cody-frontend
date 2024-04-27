<script setup>
import Input from "../UI/Input.vue";
import Btn from "../UI/Btn.vue";

// Import necessary functions from 'vue' for script setup
import { ref } from "vue";
import { useRouter } from "vue-router";

import { loginAdmin } from "../../functions/user";

const router = useRouter();

// Create refs for email and password
const updatedEmail = ref("");
const updatedPassword = ref("");
const hasError = ref(false);
const error = ref(null);

// Event handlers to update email and password
const updateEmail = (value) => {
    updatedEmail.value = value;
};

const updatePassword = (value) => {
    updatedPassword.value = value;
};

const login = async () => {
    const data = await loginAdmin(updatedEmail.value, updatedPassword.value);

    if (data.success) {

        localStorage.setItem("token", data.token);

        router.push("/admin/dashboard");
    } else {
        // Handle authentication error
        hasError.value = true;
        error.value = data.message;
    }
}
</script>

<template>
    <form>
        <Input :label="'E-mail'" :type="'email'" @input-change="updateEmail" :error="hasError"></Input>
        <Input :label="'Wachtwoord'" :type="'password'" @input-change="updatePassword" :error="hasError" :admin="true"></Input>
        <div v-if="error" class="text-secondary-red">{{ error }}</div>
        <div class="mt-8 mb-4">
            <Btn :name="'Login'" @click="login" :width="'full'" />
        </div>
    </form>
</template>