
Selected subject is wrong

<template>
  <section>
    <PrtField :label="label" :variant="variant" :message="validation.errorMessage">
      <PrtTextarea
        v-model="computedValue"
        v-bind="$attrs"
        :value="modelValue"
        @input="update($event.target.value)"
      >
      </PrtTextarea>
    </PrtField>
  </section>
</template>

<script setup lang="ts">

import { defineEmits, defineProps, ref, watch, computed } from 'vue'

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

const emit = defineEmits(['update:modelValue'])
let newValue = props.modelValue

const update = (value) => {
  emit('update:modelValue', value)
}

const computedValue = computed({
  get() {
    return newValue
  },
  set(value) {
    newValue = value
    emit('update:modelValue', newValue)
  },
})

</script>
