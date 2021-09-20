Selected subject is wrong

<template>
  <section>
    <PrtField :label="label" :variant="variant" :message="validation.errorMessage">
      <PrtTextinput
        v-model="computedValue"
        v-bind="$attrs"
        type="text"
        :value="modelValue"
        maxlength="30"
        @input="update($event.target.value)"
      >
      </PrtTextinput>
    </PrtField>
  </section>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, ref, watch, toRaw, onMounted, computed } from 'vue'

const props = defineProps({
  modelValue: { required: true },
  label: {
    type: String,
    default: 'text',
  },
  validation: {
    type: Object,
    default: () => ({}),
  },
  validations: {
    type: [Object, String, Function],
    default: () => ({}),
  },
})

const variant = computed(() => (props.validation.errorMessage ? 'danger' : ''))

let newValue = props.modelValue

const emit = defineEmits(['update:modelValue'])
const update = (value) => {
  emit('update:modelValue', value)
}
const computedValue = computed({
  get() {
    return newValue
  },
  set(value) {
    newValue = value // unncescary
    emit('update:modelValue', newValue)
  },
})
</script>
