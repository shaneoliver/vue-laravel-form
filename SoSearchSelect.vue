<template>
    <so-input-wrapper :name="name" :label="label" :placeholder="placeholder" :help="help">
        <on-click-outside :do="close">
            <div class="search-select">
                <button
                    ref="button"
                    @click="open"
                    @keydown.esc="close"
                    type="button"
                    class="form-control col-12 text-left search-select-input"
                    :class="{
                        [settings.invalidClass]: formState.errors.get(name)
                    }"
                >
                    <span v-if="formState.fields[name] !== ''">
						{{ selectedMarkup(formState.fields[name]) }}
					</span>
                    <span v-else class="search-select-placeholder text-gray-500">{{ placeholder }}</span>
                </button>

                <div ref="dropdown"
					v-show="isOpen"
					:class="{ 'show': isOpen }"
					class="dropdown-menu">

                    <div class="p-4">
						<input class="form-control"
							placeholder="Search"
							v-model="search"
							ref="search"
							@keydown.esc="close"
							@keydown.up="highlightPrev"
							@keydown.down="highlightNext"
							@keydown.enter.prevent="selectHighlighted"
							@keydown.tab.prevent
							:name="name"
							autocomplete="off">
                    </div>
					<div ref="options" v-show="options.length > 0" class="search-select-options">
						<a class="dropdown-item cursor-pointer px-4"
						v-for="(option, index) in options"
						:key="option.id"
						@click="select(option)"
						:class="{ 'active text-white': index === highlightedIndex}"
						v-html="getSlot(option)"
						></a>
					</div>
					<p class="px-4 text-sm text-danger" v-show="options.length === 0">No results found for "{{ search }}"</p>
                </div>
            </div>
        </on-click-outside>
    </so-input-wrapper>
</template>

<script>

import Popper from "popper.js"
import InputMixin from './InputMixin';
import OnClickOutside from "./OnClickOutside.vue"

export default {
    mixins: [InputMixin],

    components: {
        OnClickOutside,
    },

    data() {
        return {
            search: '',
            options: [],
            isOpen: true,
            highlightedIndex: 0,
        }
    },

    watch: {
        search() {
            this.fetch();
        }
    },

    mounted() {
        this.fetch();
    },

    props: {
        url: {
            required: true,
            type: String,
        },
        markup: {
            default: () => {
                return ''
            }
		},
		selectedMarkup: {
			default: () => {
                return ''
            }
		},
        limit: {
            type: Number,
            default: 10,
        }
    },

    methods: {
        handleChange() {
            this.formState.errors.clear(this.name);
        },

        fetch() {
            axios.get(`${this.url}`, {params: { search: this.search, count: this.limit }})
                .then(response => {
                    this.options = response.data.data;
                })
                .catch(error => {

                });
        },

        getSlot(option) {
			if(! option) {
				return;
			}

            return this.markup(option);
		},

        open() {
			if (this.isOpen) {
				return
			}
			this.isOpen = true
			this.$nextTick(() => {
				this.setupPopper()
				this.$refs.search.focus()
				this.scrollToHighlighted()
			})
		},

        close() {
			if (!this.isOpen) {
				return
			}
			this.isOpen = false
			this.$refs.button.focus();
        },

        setupPopper() {
			if (this.popper === undefined) {
				this.popper = new Popper(this.$refs.button, this.$refs.dropdown, {
					placement: "bottom-start"
				})
			} else {
				this.popper.scheduleUpdate()
			}
        },

        select(option) {
			this.formState.fields[this.name] = option
			this.search = ""
			this.highlightedIndex = 0
			this.close()
            this.$emit('clearError');
		},

		selectHighlighted() {
			this.select(this.options[this.highlightedIndex])
		},

		scrollToHighlighted() {
			if(this.options.length === 0 ) {
				return;
			}
			this.$refs.options.children[this.highlightedIndex].scrollIntoView({
				block: "nearest"
			})
		},

		highlight(index) {
			this.highlightedIndex = index

			if (this.highlightedIndex < 0) {
				this.highlightedIndex = this.options.length - 1
			}

			if (this.highlightedIndex > this.options.length - 1) {
				this.highlightedIndex = 0
			}

			this.scrollToHighlighted()
		},

		highlightPrev() {
			this.highlight(this.highlightedIndex - 1)
		},

		highlightNext() {
			this.highlight(this.highlightedIndex + 1)
		}
    },
}
</script>