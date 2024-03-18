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
        <h2 class="text-subtitle font-bold ml-[10%] xl:ml-[20%] pb-[20px]">Duid aan</h2>
        <ChecklistFrame title="Dak-isolatie" paragraph="Verbeter de energie-efficiëntie van je woning door te investeren in hoogwaardige dakisolatie, waardoor warmteverlies wordt geminimaliseerd." />
        <ChecklistFrame title="Vloer-isolatie" paragraph="Verhoog het comfort en de duurzaamheid van je huis met vloerisolatie, waardoor koude vanuit de grond wordt tegengehouden en de energieprestaties verbeteren." />
        <ChecklistFrame title="Muur-isolatie" paragraph="Optimaliseer de thermische prestaties van je woning met muurisolatie, die zorgt voor een effectieve barrière tegen warmteverlies en koude infiltratie." />
        <ChecklistFrame title="Zonne-energie" paragraph="Maak gebruik van duurzame zonne-energie om je huis van groene stroom te voorzien, waardoor je niet alleen kosten bespaart, maar ook bijdraagt aan milieuvriendelijke energieproductie." />
        <ChecklistFrame title="Verwarming" paragraph="Kies voor energiezuinige verwarmingsopties om het comfort in huis te handhaven terwijl je het energieverbruik minimaliseert." />
        <ChecklistFrame title="Koeling" paragraph="Implementeer efficiënte koelsystemen om een aangename temperatuur te behouden en tegelijkertijd energie te besparen." />
        <ChecklistFrame title="Ventilatie" paragraph="Optimaliseer de luchtkwaliteit in je woning door middel van doeltreffende ventilatiesystemen, die zorgen voor een gezond en comfortabel binnenklimaat." />
        <ChecklistFrame title="Sanitair warm water" paragraph="Bespaar energie en kosten door te investeren in geavanceerde systemen voor sanitair warm water, die efficiëntie en duurzaamheid bevorderen." />
        <ChecklistFrame title="Beglazing" paragraph="Verhoog de isolatiewaarde van je huis door energiezuinige beglazing te installeren, waardoor warmteverlies wordt verminderd en de energie-efficiëntie toeneemt." />
    </div>
</template>

<style scoped></style>
