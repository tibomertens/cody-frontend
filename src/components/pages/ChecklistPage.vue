<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { isValidToken, getUser } from "../../functions/user.js";
import ChecklistFrame from "../widgets/Checklist-frame.vue";

const router = useRouter();

const token = localStorage.getItem("token");
let userData = ref({});

onMounted( async () => {
  if (isValidToken(token)) {
    userData = await getUser(token);
    console.log(userData);
  } else {
    router.push("/login");
  }
});
</script>

<template>
    <div>
        <h1 class="text-title font-bold text-center pt-[62px] pb-[20px] xl:text-left xl:ml-[20%]">Checklist</h1>
        <p class="text-body w-[80%] xl:w-[60%] ml-[10%] xl:ml-[20%] pb-[32px]">Duid in volgende lijst aan welke verbeterpunten op jouw EPC rapport staan.</p>

        <h2 class="text-subtitle font-bold ml-[10%] xl:ml-[20%] pt-[32px] pb-[20px]">Duid aan</h2>
        <ChecklistFrame title="Dak-isolatie" paragraph="Verbeter de energie-efficiëntie van je woning door te investeren in hoogwaardige dakisolatie, waardoor warmteverlies wordt geminimaliseerd." />
    </div>
</template>

<style scoped></style>
