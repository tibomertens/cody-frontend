<script setup>
import Dropdown from '../UI/Dropdown.vue';
import Checkbox from '../UI/Checkbox.vue';
import { ref } from 'vue';

const verwarmingEnergieDrager = [
  {
    title: 'Gas',
    name: 'Gas'
  },
  {
    title: 'Elektriciteit/warmtepomp',
    name: 'Elektriciteit'
  },
  {
    title: 'Stookolie',
    name: 'Stookolie'
  },
  {
    title: 'Pellets',
    name: 'Pellets'
  },
  {
    title: 'Hout',
    name: 'Hout (overig)'
  },
  {
    title: 'Warmtenet',
    name: 'Warmtenet'
  }
];

const typeVerwarming = [
  {
    title: 'Hybride waterpomp',
    name: 'Hybride waterpomp'
  },
  {
    title: 'Condenserende ketel',
    name: 'Condenserende ketel'
  },
  {
    title: 'Niet-condenserende ketel',
    name: 'Niet-condenserende ketel'
  },
  {
    title: 'Kachel(s)',
    name: 'Kachel'
  }
];

const verwarmSanitairWarmWaterMet = [
  {
    title: 'Gas',
    name: 'gas'
  },
  {
    title: 'Stookolie',
    name: 'stookolie'
  },
  {
    title: 'Elektrische boiler',
    name: 'elektrische boiler'
  },
  {
    title: 'Warmtepompboiler',
    name: 'warmtepompboiler'
  }
];

const emit = defineEmits(['selectedHeatingType', 'selectedHeatingSystem', 'selectedWaterHeatingSystem', 'solarBoiler', 'solarPanels']);

const selectedHeatingType = ref('');
const selectedHeatingSystem = ref('');
const selectedWaterHeatingSystem = ref('');
const solarBoiler = ref(false);
const solarPanels = ref(false);
const hideDropdowns = ref(false);

const handleSelectedHeatingType = (selectedItem) => {
  selectedHeatingType.value = selectedItem;
  emit('selectedHeatingType', selectedItem);
}

const handleSelectedHeatingSystem = (selectedItem) => {
  selectedHeatingSystem.value = selectedItem;
  emit('selectedHeatingSystem', selectedItem);
  hideDropdowns.value = selectedItem === 'Warmtenet';
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
        <Dropdown :label="'Mijn woning wordt verwarmd met:'" :width="'full'" :items="verwarmingEnergieDrager" class="mb-[24px] xs:mb-0"
          @itemSelected="handleSelectedHeatingSystem" />
          <Dropdown :label="'Ik verwarm mijn sanitair water met:'" :width="'full'" :items="verwarmSanitairWarmWaterMet"
          @itemSelected="handleSelectedWaterHeatingSystem" />
      </div>
      <div v-if="!hideDropdowns" class="xs:flex gap-[24px]">
        <Dropdown :label="'Mijn verwarming is:'" :width="'full'" :items="typeVerwarming"
          @itemSelected="handleSelectedHeatingType" />
        <Dropdown :label="'Mijn woning wordt verwarmd met'" :width="'full'" :items="typeVerwarming" class="dirtyFix" />
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