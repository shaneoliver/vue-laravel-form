import settings from './settings';

export default {
    inject: ['formState'],
    props: {
        name: {
            required: true,
            type: String,
        },
        help: {
            required: false,
            type: String,
        },
        label: {
            required: false,
            type: String,
        },
        placeholder: {
            required: false,
            type: String,
            default: '',
        },
        settings: {
            default: () => {
                return settings
            }
        }
    },

    computed: {
        identifier() {
            return `input-${this.name}`;
        }
    }
}