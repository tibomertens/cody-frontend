<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const showTermsOfUse = ref(false);


</script>

<template>
    <div class=" md:m-[40px] m-[24px]">
        <div class="mb-[32px]">
            <h2 class="text-subtitle font-bold md:mb-[12px] mb-[8px]">1. Gebruiksrechten en Beperkingen</h2>
            <p>We verlenen jou een beperkte, niet-exclusieve, niet-overdraagbare licentie om de app te gebruiken in
                overeenstemming met deze gebruiksvoorwaarden. Je stemt ermee in de app niet te decompileren,
                reverse-engineeren, wijzigen, reproduceren, distribueren, de assemblage omkeren, afgeleide werken maken,
                of
                enige poging tot dergelijke handelingen. </p>
        </div>
        <div class="mb-[32px]">
            <h2 class="text-subtitle font-bold md:mb-[12px] mb-[8px]">2. Accountinformatie</h2>
            <p>Je kunt mogelijk een account aanmaken om van bepaalde functies van de app gebruik te maken. Je bent
                verantwoordelijk voor de vertrouwelijkheid van je accountgegevens. Je stemt ermee in om correcte,
                actuele en
                volledige informatie te verstrekken bij het aanmaken van je account en deze informatie bij te werken
                indien
                nodig.</p>
        </div>
        <div class="mb-[32px]">
            <h2 class="text-subtitle font-bold md:mb-[12px] mb-[8px]">3. Privacy</h2>
            <p>Door de app te gebruiken, ga je ook akkoord met onze privacyverklaring, die beschikbaar is in de app.</p>
        </div>
        <div class="mb-[32px]">
            <h2 class="text-subtitle font-bold md:mb-[12px] mb-[8px]">4. Wijzigingen in de Dienst</h2>
            <p>We behouden ons het recht voor om de app op elk moment bij te werken of te wijzigen, inclusief het
                toevoegen
                of verwijderen van functies, zonder voorafgaande kennisgeving.</p>
        </div>
        <div class="mb-[32px]">
            <h2 class="text-subtitle font-bold md:mb-[12px] mb-[8px]">5. Beëindiging</h2>
            <p>Je kunt jouw gebruik van de app op elk moment beëindigen. We behouden ons het recht voor om jouw toegang
                tot
                de app op elk moment en om welke reden dan ook te beëindigen.</p>
        </div>
        <div class="mb-[32px]">
            <h2 class="text-subtitle font-bold md:mb-[12px] mb-[8px]">6. Aansprakelijkheid</h2>
            <p>Wij zijn niet aansprakelijk voor directe, indirecte, incidentele, speciale of gevolgschade die
                voortvloeit
                uit jouw gebruik van de app.</p>
        </div>
        <div class="mb-[32px]">
            <h2 class="text-subtitle font-bold md:mb-[12px] mb-[8px]">7. Wijzigingen in de Gebruiksvoorwaarden</h2>
            <p>We behouden ons het recht voor om deze gebruiksvoorwaarden op elk moment bij te werken. Wijzigingen
                worden
                effectief bij publicatie in de app. Door de app te blijven gebruiken na wijzigingen in de
                gebruiksvoorwaarden, stem je in met de herziene voorwaarden.</p>
        </div>
    </div>
</template>

<style scoped></style>
