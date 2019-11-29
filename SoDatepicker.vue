<template>
    <so-input-wrapper :name="name" :label="label" :placeholder="placeholder" :help="help">
        <flat-pickr
            v-model="formState.fields[name]"
            :class="{
                [settings.inputClass]: true,
                [settings.invalidClass]: formState.errors.get(name)
            }"
            :name="name"
            :aria-describedby="identifier"
            :placeholder="placeholder"
            :config="config"
            @on-change="handleChange"
        ></flat-pickr>
    </so-input-wrapper>
</template>

<script>

import InputMixin from './InputMixin';

// https://www.npmjs.com/package/vue-flatpickr-component
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';

export default {
    mixins: [InputMixin],

    components: {
        flatPickr
    },

    props: {
        type: {
            default: 'text',
            type: String,
        },
        config: {
            type: Object,
            required: false,
            default: () => {
                return {}
            },
        },
    },

    methods: {
        handleChange() {
            this.formState.errors.clear(this.name);
        },
    }
}
</script>

