<script setup>
import TableExpense from '../widgets/Table-Expense.vue';

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
<TableExpense />
</template>

<style scoped></style>