<template>
    <so-input-wrapper :name="name" :label="label" :placeholder="placeholder" :help="help">

        <div class="custom-control custom-radio" v-for="(option, key, index) in options">
            <input type="radio"
                class="custom-control-input"
                :class="{
                    [settings.invalidClass]: formState.errors.get(name)
                }"
                v-model="formState.fields[name]"
                :value="getValue(option, key)"
                :id="`${identifier}-${index ? index : key}`"
                @change="handleChange"
            >
            <label class="custom-control-label" :for="`${identifier}-${index ? index : key}`">{{ option }}</label>
        </div>

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
        },
        getValue(option, key) {
            if(Array.isArray(this.options)) {
                return option;
            }

            return key;
        }
    }

}
</script>

