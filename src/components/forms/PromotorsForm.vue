<template>
    <form>
        <div class="grid grid-cols-1 xs:grid-cols-2 gap-x-[32px] gap-y-[12px]">
            <Dropdown :label="'Tier:'" :items="tiers" @itemSelected="handleTierSelected" :bold="true" :width="'full'"
                class="mt-[26px]" :display="false"/>
            <Input :label="'Telefoonnummer:'" :type="'text'" @input-change="handlePhoneChange"
                :error="hasError"></Input>
            <Input :label="'E-mail:'" :type="'email'" @input-change="handleEmailChange" :error="hasError"></Input>
            <Input :label="'Website url:'" :type="'text'" @input-change="handleWebsiteChange" :error="hasError"></Input>
            <Input :label="'Straat:'" :type="'text'" @input-change="handleStreetChange" :error="hasError"></Input>
            <Input :label="'Huisnummer:'" :type="'text'" @input-change="handleStreetNumberChange"
                :error="hasError"></Input>
            <Input :label="'Postcode:'" :type="'text'" @input-change="handlePostalCodeChange" :error="hasError"></Input>
            <Input :label="'Gemeente:'" :type="'text'" @input-change="handleCityChange" :error="hasError"></Input>
            <Input :label="'Bedrijfsnaam:'" :type="'text'" @input-change="handleCompanyNameChange"
                :error="hasError"></Input>
            <Input :label="'Logo:'" :type="'file'" @change="handleLogoChange" :error="hasError"></Input>
            <label for="msg" class="font-bold mt-[24px]">Bericht:</label>
            <textarea id="msg" v-model="message" placeholder="Bericht..."
                class="h-[150px] w-full rounded p-4 whitespace-pre-wrap break-words resize-none bg-offWhite-light focus:outline-primary-dark xs:col-span-2"></textarea>
        </div>
        <div v-if="error" class="text-secondary-red">{{ error }}</div>

        <div v-if="success">
            <p class="text-secondary-green">U ontvangt een mail zodra uw verzoek is behandelt. Deze mail bevat een eventueel contract en meer
                informatie over de verdere samenwerking. </p>
        </div>

        <div class="mt-8 mb-4">
            <Btn :name="'Plaats verzoek'" @click="upload" :width="'full'" :loading="loadingState" />
        </div>
    </form>
</template>

<script setup>
import Input from "../UI/Input.vue";
import Btn from "../UI/Button-Btn.vue";
import Dropdown from "../UI/Dropdown.vue";

import { ref } from "vue";

import { createPromotor, uploadImage } from "../../functions/promotor";

let hasError = ref(false);
let error = ref('');
let success = ref(false);

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

let loadingState = ref(false);

const upload = async () => {
    // check if postalcode is a number
    if (isNaN(postalCode.value)) {
        hasError.value = true;
        error.value = 'Gelieve een geldige postcode in te vullen';
        return;
    }

    // check if postalcode is a belgian postalcode without using length 
    if (postalCode.value < 1000 || postalCode.value > 9992) {
        hasError.value = true;
        error.value = 'Gelieve een geldige postcode in te vullen';
        return;
    }

    // check if email is an email
    if (!email.value.includes('@')) {
        hasError.value = true;
        error.value = 'Gelieve een geldig emailadres in te vullen';
        return;
    }

    // check if phone is a phone number
    if (phone.value.length < 9) {
        hasError.value = true;
        error.value = 'Gelieve een geldig telefoonnummer in te vullen';
        return;
    }

    // check if huisnummer is a number
    if (isNaN(streetNumber.value)) {
        hasError.value = true;
        error.value = 'Gelieve een geldig huisnummer in te vullen';
        return;
    }

    // convert phonenumber to string
    phone.value = phone.value.toString();

    loadingState.value = true;

    const uploadedUrl = await uploadImage(logo.value);

    const result = await createPromotor({
        phoneNumber: phone.value,
        email: email.value,
        website: website.value,
        street: street.value,
        streetNumber: streetNumber.value,
        postalCode: postalCode.value,
        city: city.value,
        name: companyName.value,
        logo: uploadedUrl,
        message: message.value,
        tier: tier.value
    });

    loadingState.value = false;

    if (result.success) {
        hasError.value = false;
        error.value = '';
        success.value = true;
    } else {
        hasError.value = true;
        error.value = result.message;
    }
}

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
    const file = value.target.files[0];
    logo.value = file;
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