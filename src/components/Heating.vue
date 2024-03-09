<script setup>
import Dropdown from './Dropdown.vue';

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
</script>

<template>
  <section>
    <h2 class="text-subtitle font-bold mt-[24px] mb-[12px]">Verwarming</h2>
    <div>
      <div class="xs:flex gap-[24px] mb-[24px]">
        <Dropdown :label="'Mijn woning wordt verwarmd met:'" :width="'full'" :items="choices" class="mb-[24px] xs:mb-0" />
        <Dropdown :label="'Mijn verwarming is:'" :width="'full'" :items="choices2" />
      </div>
      <div class="xs:flex gap-[24px]">
        <Dropdown :label="'Ik verwarm mijn sanitair water met:'" :width="'full'" :items="choices3" />
        <Dropdown :label="'Mijn woning wordt verwarmd met'" :width="'full'" :items="choices3" class="dirtyFix" />
      </div>
    </div>
    <h3>Mijn hernieuwbare systemen</h3>
    <div>

    </div>
  </section>
</template>

<style scoped>
</style>