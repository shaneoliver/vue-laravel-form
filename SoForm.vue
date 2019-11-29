<template>
    <form @keydown="handleKeydown" @change="handleChange" @input="handleChange">
        <slot></slot>
        <div class="row">
            <div class="col-12">
                <button class="btn btn-primary" :disabled="sharedState.errors.any()" type="submit" @click.prevent="submit">{{ submitLabel }}</button>
                <button v-if="cancellable" class="btn btn-outline-dark" type="button" @click.prevent="cancel">{{ cancelLabel }}</button>
                <slot name="buttons"></slot>
            </div>
        </div>
    </form>
</template>

<script>
import Errors from './Errors';

export default {
    provide() {
        return {
            formState: this.sharedState,
        }
    },
    props: {
        form: {
            required: true,
            type: Object,
        },
        method: {
            required: false,
            default: 'POST',
            type: String,
        },
        action: {
            required: true,
            type: String,
        },
        cancellable: {
            default: true,
            type: Boolean,
        },
        clearOnSuccess: {
            default: true,
            type: Boolean,
        },
        submitLabel: {
            default: 'Submit',
            type: String,
        },
        cancelLabel: {
            default: 'Cancel',
            type: String,
        }
    },
    data() {
        return {
            hasErrors: false,
            sharedState: {
                fields: {...this.form},
                errors: new Errors(),
            }
        }
    },
    methods: {
        submit() {
            axios[this.method.toLowerCase()](this.action, this.sharedState.fields)
                .then(response => {
                    this.clear();
                    this.$emit('successful', response.data, this.sharedState.fields);
                })
                .catch(error => {
                    this.hasErrors = true;
                    this.$emit('unsuccessful', error);
                    this.sharedState.errors.record(error.response.data.errors);
                })
        },
        cancel() {
            this.clear();
            this.$emit('cancelled');
        },
        clear() {
            if(this.clearOnSuccess) {
                this.sharedState.errors.clear();
                this.sharedState.fields = {...this.form};
            }
        },
        handleKeydown(event) {
            if(event.key === 'Enter') {
                event.preventDefault();
                this.submit();
                return;
            };

            this.sharedState.errors.clear(event.target.name);
            if(! this.sharedState.errors.any()) {
                this.sharedState.errors.clear();
            }
        },
        handleChange() {
            this.$emit('changed', this.sharedState.fields);
        },
        handleInput() {
            this.$emit('changed', this.sharedState.fields);
        }
    },
}
</script>

