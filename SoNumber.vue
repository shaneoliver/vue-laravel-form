<template>
    <so-input-wrapper :name="name" :label="label" :placeholder="placeholder" :help="help">
        <input v-model="formState.fields[name]"
            :class="{
                [settings.inputClass]: true,
                [settings.invalidClass]: formState.errors.get(name)
            }"
            :name="name"
            type="number"
            :min="min"
            :max="max"
            :aria-describedby="identifier"
            :placeholder="placeholder">
    </so-input-wrapper>
</template>

<script>

import InputMixin from './InputMixin';

export default {
    mixins: [InputMixin],

    props: {
        min: {
            required: false,
            type: Number,
            default: 0,
        },
        max: {
            required: false,
            type: Number,
            default: 100000,
        },
    }
}
</script>

