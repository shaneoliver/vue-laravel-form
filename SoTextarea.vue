<template>
    <so-input-wrapper :name="name" :label="label" :placeholder="placeholder" :help="help">
        <textarea v-model="formState.fields[name]" 
            :class="{
                [settings.inputClass]: true,
                [settings.invalidClass]: formState.errors.get(name) 
            }"
            :name="name"
            :aria-describedby="identifier" 
            :placeholder="placeholder"
            :rows="rows">
        </textarea>
    </so-input-wrapper>
</template>

<script>
import InputMixin from './InputMixin.js';

export default {
    mixins: [InputMixin],
    props: {
        rows: {
            required: false,
            type: Number,
            default: null,
        }
    }
}
</script>