<template>
    <so-input-wrapper :name="name" :label="label" :placeholder="placeholder" :help="help">

        <div class="custom-control custom-checkbox" v-for="(option, key, index) in options">
            <input type="checkbox"
                class="custom-control-input"
                :class="{
                    [settings.invalidClass]: formState.errors.get(name)
                }"
                v-model="formState.fields[name]"
                :value="getValue(option, key)"
                :id="`${identifier}-${index}`"
                @change="handleChange"
            >
            <label class="custom-control-label" :for="`${identifier}-${index}`">{{ option }}</label>
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

    data() {
        return {
            mutableOptions: null,
        }
    },

    methods: {
        handleChange() {
            this.formState.errors.clear(this.name);
        },
        getValue(option, key) {
            if(Array.isArray(this.options)) {
                return option;
            }

            return key ? key : option;
        }
    }

}
</script>

