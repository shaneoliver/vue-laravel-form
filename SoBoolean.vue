<template>
    <so-input-wrapper :name="name" :label="label" :help="help">

        <div class="custom-control custom-checkbox">
            <input type="checkbox"
                class="custom-control-input"
                :class="{
                    [settings.invalidClass]: formState.errors.get(name)
                }"
                v-model="formState.fields[name]"
                :id="identifier"
                @change="handleChange"
            >
            <label class="custom-control-label" :for="identifier">{{ placeholder }}</label>
        </div>

    </so-input-wrapper>
</template>

<script>

import InputMixin from './InputMixin';

export default {
    mixins: [InputMixin],

    methods: {
        handleChange() {
            this.formState.errors.clear(this.name);
        },
    }

}
</script>

