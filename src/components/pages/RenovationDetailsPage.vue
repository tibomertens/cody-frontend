<template>

</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import { getUserRenovationById } from '../../functions/renovation';
import { isValidToken, getUser } from '../../functions/user.js';

let route = useRoute();
let renovationId = ref('');
let renovation = ref({});
let userRenovation = ref({});
let userData = ref({});
let userId = ref('');

const router = useRouter();

const token = localStorage.getItem('token');

onMounted(async () => {
    renovationId.value = route.params.id;
    await fetchUser();
    fetchData();
});

const fetchUser = async () => {
    if (isValidToken(token)) {
        userData.value = await getUser(token);
        userId.value = userData.value._id;
    } else {
        router.push('/login');
    }
};

const fetchData = async () => {
    userRenovation.value = await getUserRenovationById(userId.value, renovationId.value);
    renovation.value = userRenovation.value.renovation;
};
</script>
