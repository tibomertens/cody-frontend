<template>
    <div class="">
        <div class="mb-4">
            <input v-model="newItem" @keyup.enter="addItem" type="text" placeholder="Voeg een notitie toe..."
                class="border-2 border-offWhite-light bg-offWhite-light outline-none focus:border-primary-dark rounded-[5px] p-[12px] w-full" />
        </div>
        <div>
            <ul>
                <li v-for="(item, index) in items" :key="index">
                    <div class="flex gap-[12px]">
                        <Checkbox :label="item.label" @selectedItem="handleSelectedItem(index)"
                            :isChecked="item.checked" class="mb-[12px]" />
                        <div class="h-[16px] w-[16px] relative top-[4.5px] cursor-pointer" @click="deleteItem(index)"><img src="/delete_no_fill.svg" alt="delete icon"></div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

import Checkbox from '../UI/Checkbox.vue';

import { updateChecklist } from '../../functions/renovation';

const props = defineProps({
    items: {
        type: Array,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    renovationId: {
        type: String,
        required: true,
    },
});

let items = ref(props.items);
const newItem = ref('');

const addItem = async () => {
    let body = {
        label: newItem.value,
        checked: false,
    };

    items.value.push(body);

    await updateChecklist(props.userId, props.renovationId, items.value);
    newItem.value = '';
};

const handleSelectedItem = async (index) => {
    items.value[index].checked = true;
    await updateChecklist(props.userId, props.renovationId, items.value);
};

const deleteItem = async (index) => {
    items.value.splice(index, 1);
    await updateChecklist(props.userId, props.renovationId, items.value);
};
</script>
