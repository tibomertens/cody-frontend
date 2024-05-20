<template>
    <form>
        <div class="grid grid-cols-1 xs:grid-cols-2 gap-x-[32px] gap-y-[12px]">
            <Dropdown :label="'Tier:'" :items="tiers" @itemSelected="handleTierSelected" :bold="true" :width="'full'"
                class="mt-[26px]" />
            <Input :label="'Telefoonnummer:'" :type="'number'" @input-change="handlePhoneChange"
                :error="hasError"></Input>
            <Input :label="'E-mail:'" :type="'email'" @input-change="handleEmailChange" :error="hasError"></Input>
            <Input :label="'Website url:'" :type="'text'" @input-change="handleWebsiteChange" :error="hasError"></Input>
            <Input :label="'Straat:'" :type="'text'" @input-change="handleStreetChange" :error="hasError"></Input>
            <Input :label="'Huisnummer:'" :type="'number'" @input-change="handleStreetNumberChange"
                :error="hasError"></Input>
            <Input :label="'Postcode:'" :type="'number'" @input-change="handlePostalCodeChange" :error="hasError"></Input>
            <Input :label="'Gemeente:'" :type="'text'" @input-change="handleCityChange" :error="hasError"></Input>
            <Input :label="'Bedrijfsnaam:'" :type="'text'" @input-change="handleCompanyNameChange"
                :error="hasError"></Input>
            <Input :label="'Logo:'" :type="'file'" @input-change="handleLogoChange" :error="hasError"></Input>
            <Input :label="'Bericht:'" :type="'textarea'" @input-change="handleMessageChange" :error="hasError"
                class="xs:col-span-2"></Input>
        </div>
        <div v-if="error" class="text-secondary-red">{{ error }}</div>

        <div class="mt-8 mb-4">
            <Btn :name="'Plaats verzoek'" @click="" :width="'full'" />
        </div>
        <div v-if="success">
            <p>U ontvangt een mail zodra uw verzoek is behandelt. Deze mail bevat een eventueel contract en meer
                informatie over de verdere samenwerking. </p>
        </div>
    </form>
</template>

<script setup>
import Input from "../UI/Input.vue";
import Btn from "../UI/Button-Btn.vue";
import Dropdown from "../UI/Dropdown.vue";

import { ref } from "vue";

let hasError = ref(false);
let error = ref('');
let succes = ref(false);

let phone = ref('');
let email = ref('');
let website = ref('');
let street = ref('');
let streetNumber = ref('');
let postalCode = ref('');
let city = ref('');
let companyName = ref('');
let logo = ref('');
let message = ref('');
let tier = ref('');

const handleTierSelected = (itemAlias) => {
    tier.value = itemAlias;
}

const handlePhoneChange = (value) => {
    phone.value = value;
}

const handleEmailChange = (value) => {
    email.value = value;
}

const handleWebsiteChange = (value) => {
    website.value = value;
}

const handleStreetChange = (value) => {
    street.value = value;
}

const handleStreetNumberChange = (value) => {
    streetNumber.value = value;
}

const handlePostalCodeChange = (value) => {
    postalCode.value = value;
}

const handleCityChange = (value) => {
    city.value = value;
}

const handleCompanyNameChange = (value) => {
    companyName.value = value;
}

const handleLogoChange = (value) => {
    logo.value = value;
}

const handleMessageChange = (value) => {
    message.value = value;
}

const tiers = [{
    title: 'Basis samenwerking',
    name: '1'
},
{
    title: 'Gevorderde samenwerking',
    name: '2'
},
{
    title: 'Top positie',
    name: '3'
}
]
</script>

<style>
input[type="textarea"] {
    min-height: 150px
}
</style>