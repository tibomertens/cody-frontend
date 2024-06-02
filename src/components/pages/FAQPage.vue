<template>
    <div class="m-[32px] lg:m-[40px] flex flex-col gap-[24px]">
        <FAQCard question="Kan ik mijn wachtwoord veranderen?"
            answer="Je kunt je wachtwoord wijzigen door in te loggen op je account en naar de instellingen te gaan. Hier kun je je wachtwoord wijzigen." />
        <FAQCard question="Zijn er financiële steunmaatregelen beschikbaar voor energiebesparende renovaties?"
            answer="Ja, er zijn verschillende financiële steunmaatregelen beschikbaar voor energiebesparende renovaties. Deze omvatten subsidies, leningen tegen gunstige voorwaarden en belastingvoordelen, afhankelijk van de regio en specifieke omstandigheden. Raadpleeg lokale overheidsinstanties of hun websites voor gedetailleerde informatie." />
        <FAQCard question="Hoe lang duurt het voordat ik resultaten zie aan mijn label na het uitvoeren van renovaties?"
            answer="De tijd tot je resultaten ziet na renovaties hangt af van de impact van de uitgevoerde maatregelen. In onze app kun je de specifieke impact van je renovaties terugvinden en een beter idee krijgen van de verwachte resultaten." />
        <FAQCard question="Kan ik mijn EPC-label opnieuw laten beoordelen na renovaties?"
            answer="Ja, je kunt je EPC-label opnieuw laten beoordelen na renovaties door een test te doen of een expert langs te laten komen. Je kunt je label ook aanpassen door de test in de app opnieuw in te vullen via de instellingen." />
        <FAQCard question="Welke rol speelt de isolatie bij het verbeteren van het EPC-label?"
            answer="Isolatie speelt een cruciale rol bij het verbeteren van het EPC-label, omdat het energieverlies vermindert en de energie-efficiëntie van je woning verhoogt. Door betere isolatie kan je woning minder energie verbruiken voor verwarming en koeling. Meer details over de impact van isolatie vind je in onze app." />
        <FAQCard question="Is er een optimaal moment om renovaties uit te voeren voor maximale efficiëntie?"
            answer="Het optimale moment om renovaties uit te voeren hangt af van verschillende factoren zoals seizoensgebonden weersomstandigheden en je persoonlijke planning. Het is vaak efficiënt om tijdens de warmere maanden te renoveren vanwege betere werkomstandigheden en snellere droogtijden van materialen. Voor een gepersonaliseerd advies kun je onze app raadplegen." />
        <FAQCard question="Helpt het vervangen van oude apparaten echt bij het verlagen van mijn energieverbruik?"
            answer="Ja, het vervangen van oude apparaten door energiezuinige modellen helpt daadwerkelijk bij het verlagen van je energieverbruik. Nieuwe apparaten zijn vaak efficiënter en verbruiken minder energie voor dezelfde taken. In onze app kun je meer informatie vinden over de energiebesparing die je kunt realiseren met nieuwe apparaten." />
    </div>
</template>

<script setup>
import { ref } from 'vue';

import FAQCard from '../widgets/FAQ-card.vue';
</script>