<template>
    <div :class="settings.formGroupClass">
        <label :class="settings.labelClass" :for="identifier" v-if="label">{{ label }}</label>

        <slot></slot>

        <small :id="identifier" :class="settings.helpClass" v-if="help">{{ help }}</small>

        <div :class="settings.invalidFeedbackClass" role="alert">
            {{ formState.errors.get(name) }}
        </div>
    </div>
</template>

<script>
import InputMixin from './InputMixin';

export default {
    mixins: [InputMixin],
}
</script>

