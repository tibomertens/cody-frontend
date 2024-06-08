<script setup>
import ChangeReviewForm from '../forms/ChangeReviewForm.vue';

import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { isValidToken, getUser, checkLabelUser, checkEmailConfirmed } from '../../functions/user';

const token = localStorage.getItem('token');
let userData = ref({});
let userId = ref('');

const router = useRouter();

onMounted(async () => {
    if (isValidToken(token)) {
        userData.value = await getUser(token);

        let emailConfirmed = await checkEmailConfirmed(userData.value);
        if (!emailConfirmed) {
            router.push('/login');
            return;
        }

        let hasLabel = await checkLabelUser(userData.value);
        if (!hasLabel) {
            router.push('/determinelabelchoice');
            return;
        }

        if (userData.value !== null) {
            userId.value = userData.value._id;
        } else {
            router.push('/login');
        }
    } else {
        router.push('/login');
    }
});
</script>

<template>
    <div class="w-full pt-[3%] pl-[10%] pr-[10%] flex justify-center items-center">
        <div class="w-[400px]">
            <ChangeReviewForm />
        </div>
    </div>
</template>

<style scoped></style>
