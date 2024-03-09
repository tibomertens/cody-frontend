<script setup>
import Dropdown from '../UI/Dropdown.vue';
import Checkbox from '../UI/Checkbox.vue';
import { ref } from 'vue';

const choices = [
  'Gas',
  'Elektriciteit/warmtepomp',
  'Stookolie',
  'Pellets',
  'Hout',
  'Warmtenet'
];

const choices2 = [
  'Hybride waterpomp',
  'condenserende ketel',
  'Niet-condenserende ketel',
  'Kachel(s)'
];

const choices3 = [
  'Gas',
  'Stookolie',
  'Elektrische boiler',
  'Warmtepompboiler'
];

const emit = defineEmits(['selectedHeatingType', 'selectedHeatingSystem', 'selectedWaterHeatingSytem', 'solarBoiler', 'solarPanels']);

const selectedHeatingType = ref('');
const selectedHeatingSystem = ref('');
const selectedWaterHeatingSystem = ref('');
const solarBoiler = ref(false);
const solarPanels = ref(false);

const handleSelectedHeatingType = (selectedItem) => {
  selectedHeatingType.value = selectedItem;
  emit('selectedHeatingType', selectedItem);
}

const handleSelectedHeatingSystem = (selectedItem) => {
  selectedHeatingSystem.value = selectedItem;
  emit('selectedHeatingSystem', selectedItem);
}

const handleSelectedWaterHeatingSystem = (selectedItem) => {
  selectedWaterHeatingSystem.value = selectedItem;
  emit('selectedWaterHeatingSystem', selectedItem);
}

const handleSolarBoiler = (selectedItem) => {
  solarBoiler.value = !solarBoiler.value;
  emit('solarBoiler', solarBoiler.value);
}

const handleSolarPanels = (selectedItem) => {
  solarPanels.value = !solarPanels.value;
  emit('solarPanels', solarPanels.value);
}
</script>

<template>
  <section class="mt-[64px]">
    <h2 class="text-subtitle font-bold mt-[24px] mb-[12px]">Verwarming</h2>
    <div>
      <div class="xs:flex gap-[24px] mb-[24px]">
        <Dropdown :label="'Mijn woning wordt verwarmd met:'" :width="'full'" :items="choices" class="mb-[24px] xs:mb-0"
          @itemSelected="handleSelectedHeatingType" />
        <Dropdown :label="'Mijn verwarming is:'" :width="'full'" :items="choices2"
          @itemSelected="handleSelectedHeatingSystem" />
      </div>
      <div class="xs:flex gap-[24px]">
        <Dropdown :label="'Ik verwarm mijn sanitair water met:'" :width="'full'" :items="choices3"
          @itemSelected="handleSelectedWaterHeatingSystem" />
        <Dropdown :label="'Mijn woning wordt verwarmd met'" :width="'full'" :items="choices3" class="dirtyFix" />
      </div>
    </div>
    <div class="mt-[32px]">
      <h3 class="text-btn font-bold">Mijn hernieuwbare systemen</h3>
      <div class="mt-[12px]">
        <Checkbox :label="'Zonneboiler'" @selectedItem="handleSolarBoiler" class="mb-[12px]" />
        <Checkbox :label="'Zonnepanelen'" @selectedItem="handleSolarPanels" />
      </div>
    </div>
  </section>
</template>

<style scoped></style>