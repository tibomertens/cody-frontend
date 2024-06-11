<template>
    <div class="flex justify-center items-center h-screen flex-row">
        <p v-if="checkingEmail">We zijn je email aan het bevestigen!</p>
        <p v-else-if="emailConfirmed">Je e-mailadres is bevestigd! Je kunt nu terugkeren naar de app op je telefoon om in te loggen, of verdergaan via de web-app.</p>
        <button v-else>{{ error }}</button>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { confirmEmail, checkLabelUser } from '../../functions/user.js';

let checkingEmail = ref(true);
let emailConfirmed = ref(false);
let error = ref('');
let token = ref('');

const router = useRouter();

const checkEmail = async () => {
    if (!token.value) {
        error.value = 'Je hebt geen token meegegeven! Probeer het opnieuw met een geldige token.';
        checkingEmail.value = false;
        return;
    }

    const result = await confirmEmail(token.value);

    if (result.success) {
        checkingEmail.value = false;
        emailConfirmed.value = true;
        console.log(result);

        localStorage.setItem("token", result.token);
        let hasLabel = await checkLabelUser(result.user);

        if (hasLabel) {
            router.push("/account");
            return;
        }
    } else {
        checkingEmail.value = false;
        error.value = result.message;
    }
};

onMounted(() => {
    const route = useRoute();
    token.value = route.params.token;

    checkEmail();
});

window.onpopstate = function () {
    const route = useRoute();
    token.value = route.params.token;
    checkEmail();
};
</script>