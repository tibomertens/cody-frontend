<script setup>
import { ref, onMounted, reactive, defineProps } from "vue";
import { useRouter } from "vue-router";
import { isValidToken, getUser } from "../../functions/user.js";
import ChecklistFrame from "../widgets/Checklist-frame.vue";
import Dropdown from "../UI/Dropdown.vue";
import Btn from "../UI/Btn.vue";
import BackArrow from "../UI/Back-arrow.vue";

//import label functions
import CalculatedLabelModal from "../modals/CalculatedLabel.vue";
import Confirm from "../modals/Confirm.vue";

const router = useRouter();
const currentPath = ref("");

const token = localStorage.getItem("token");
let userData = ref({});
let userId = ref(null);

const selectedItems = reactive([
  "Dak-isolatie",
  "Vloer-isolatie",
  "Muur-isolatie",
  "Zonne-energie",
  "Verwarming",
  "Koeling",
  "Ventilatie",
  "Sanitair-warm-water",
  "Beglazing",
]);

onMounted(async () => {
  if (isValidToken(token)) {
    userData = await getUser(token);
    userId = userData._id;
  } else {
    router.push("/login");
  }
});

const addSelectedItem = (selectedItem) => {
  if (selectedItems.includes(selectedItem)) {
    selectedItems.splice(selectedItems.indexOf(selectedItem), 1);
  } else {
    selectedItems.push(selectedItem);
  }
};

const emit = defineEmits(["selectedSurface"]);

const selectedLabel = ref("");
let labelData = ref({
  label: selectedLabel,
});
let showModal = ref(false);
let showConfirm = ref(false);
let error = ref(null);

const labelOptions = [
  {
    title: "Label A+",
    name: "A+",
  },
  {
    title: "Label A",
    name: "A",
  },
  {
    title: "Label B",
    name: "B",
  },
  {
    title: "Label C",
    name: "C",
  },
  {
    title: "Label D",
    name: "D",
  },
  {
    title: "Label E",
    name: "E",
  },
  {
    title: "Label F",
    name: "F",
  },
];

const handleSelectedLabel = (itemAlias) => {
  selectedLabel.value = itemAlias;
};

const checkLabelNotEmpty = async () => {
  if (!selectedLabel.value) {
    error.value = "Selecteer een label om door te gaan.";
    return;
  } else if (selectedItems.length !== 9) {
    showModal.value = true;
  } else {
    showConfirm.value = true;
  }
};

const closeModal = () => {
  showModal.value = false;
};
const closeConfirm = () => {
  showConfirm.value = false;
};

onMounted(() => {
  currentPath.value = router.currentRoute.value.path;
});
</script>

<template>
  <div>
    <div class="flex items-center pt-[64px] pb-[20px] ml-[10%] xl:ml-[20%]">
      <div class="mr-[20px]">
        <Back-arrow />
      </div>
      <h1 class="text-title font-bold text-center">Checklist</h1>
    </div>
    <p class="text-body w-[80%] xl:w-[60%] ml-[10%] xl:ml-[20%] pb-[32px]">
      Duid in volgende lijst aan welke verbeterpunten op jouw EPC rapport staan.
    </p>
    <h2 class="text-subtitle font-bold ml-[10%] xl:ml-[20%] pb-[12px]">
      Huidig label
    </h2>
    <div class="ml-[10%] mr-[10%] xl:ml-[20%] pb-[32px]">
      <Dropdown
        :items="labelOptions"
        :labelData="labelData"
        @itemSelected="handleSelectedLabel"
      />
    </div>
    <h2 class="text-subtitle font-bold ml-[10%] xl:ml-[20%] pb-[20px]">
      Duid aan
    </h2>
    <ChecklistFrame
      @select="addSelectedItem"
      :title="'Dak-isolatie'"
      :paragraph="'Verbeter de energie-efficiëntie van je woning door te investeren in hoogwaardige dakisolatie, waardoor warmteverlies wordt geminimaliseerd.'"
    />
    <ChecklistFrame
      @select="addSelectedItem"
      :title="'Vloer-isolatie'"
      :paragraph="'Verhoog het comfort en de duurzaamheid van je huis met vloerisolatie, waardoor koude vanuit de grond wordt tegengehouden en de energieprestaties verbeteren.'"
    />
    <ChecklistFrame
      @select="addSelectedItem"
      :title="'Muur-isolatie'"
      :paragraph="'Optimaliseer de thermische prestaties van je woning met muurisolatie, die zorgt voor een effectieve barrière tegen warmteverlies en koude infiltratie.'"
    />
    <ChecklistFrame
      @select="addSelectedItem"
      :title="'Zonne-energie'"
      :paragraph="'Maak gebruik van duurzame zonne-energie om je huis van groene stroom te voorzien, waardoor je niet alleen kosten bespaart, maar ook bijdraagt aan milieuvriendelijke energieproductie.'"
    />
    <ChecklistFrame
      @select="addSelectedItem"
      :title="'Verwarming'"
      :paragraph="'Kies voor energiezuinige verwarmingsopties om het comfort in huis te handhaven terwijl je het energieverbruik minimaliseert.'"
    />
    <ChecklistFrame
      @select="addSelectedItem"
      :title="'Koeling'"
      :paragraph="'Implementeer efficiënte koelsystemen om een aangename temperatuur te behouden en tegelijkertijd energie te besparen.'"
    />
    <ChecklistFrame
      @select="addSelectedItem"
      :title="'Ventilatie'"
      :paragraph="'Optimaliseer de luchtkwaliteit in je woning door middel van doeltreffende ventilatiesystemen, die zorgen voor een gezond en comfortabel binnenklimaat.'"
    />
    <ChecklistFrame
      @select="addSelectedItem"
      :title="'Sanitair warm water'"
      :paragraph="'Bespaar energie en kosten door te investeren in geavanceerde systemen voor sanitair warm water, die efficiëntie en duurzaamheid bevorderen.'"
    />
    <ChecklistFrame
      @select="addSelectedItem"
      :title="'Beglazing'"
      :paragraph="'Verhoog de isolatiewaarde van je huis door energiezuinige beglazing te installeren, waardoor warmteverlies wordt verminderd en de energie-efficiëntie toeneemt.'"
    />
    <div class="flex justify-center pb-[32px]">
      <Btn :name="'Doorgaan'" @click="checkLabelNotEmpty()" :width="''" />
    </div>
    <CalculatedLabelModal
      :showModal="showModal"
      :labelData="labelData"
      :items="selectedItems"
      :userId="userId"
      @closeModal="closeModal"
      :path="currentPath"
    />
    <div v-if="error" class="text-red-500 text-center pb-[32px]">
      {{ error }}
    </div>
    <Confirm
      :showConfirm="showConfirm"
      :title="'Weet je zeker dat je niets wilt aanduiden?'"
      @closeConfirm="closeConfirm"
      @confirmAction="showModal = true"
    />
  </div>
</template>
