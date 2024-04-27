<template>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { isValidToken, getAdmin } from "../../functions/user.js";

const router = useRouter();

const token = localStorage.getItem("token");
let adminData = ref({});

onMounted(async () => {
    if (isValidToken(token)) {
        adminData.value = await getAdmin(token);

        if (adminData.value !== false) {

        } else {
            router.push('/admin/login');
        }
    } else {
        router.push("/admin/login");
    }
});
</script>