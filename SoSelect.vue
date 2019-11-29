<template>
    <so-input-wrapper :name="name" :label="label" :placeholder="placeholder" :help="help">
        <select
            v-model="formState.fields[name]"
            :class="{
                [settings.inputClass]: true,
                [settings.invalidClass]: formState.errors.get(name)
            }"
            :name="name"
            :aria-describedby="identifier"
            :placeholder="placeholder"
            @change="handleChange"
        >
            <option disabled value="">{{ placeholder }}</option>
            <option v-for="option in options" :key="option.label" :value="option.value">{{ option.label }}</option>
        </select>
    </so-input-wrapper>
</template>

<script>

import InputMixin from './InputMixin';

export default {
    mixins: [InputMixin],

    props: {
        options: {
            required: true,
            type: [Array, Object],
            default: [],
        },
    },
    methods: {
        handleChange() {
            this.formState.errors.clear(this.name);
        }
    }

}
</script>

