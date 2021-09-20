<template>
  <div class="prt-modal-form">
    <prt-modal
      :active="isModalOpen"

      @update:active="isModalOpen = !isModalOpen"
    >
      <div class="prt-heading-bar">
        <span class="prt-heading-bar__text">
          {{ title }}
        </span>
      </div>

      <item-form v-if="storeForms.getFormType == 'itemForm'" @updateEditFlag="updateEditFlag"></item-form>
      <tax-form v-else @updateEditFlag="updateEditFlag"></tax-form>
    </prt-modal>
  </div>
</template>
<script setup lang="ts">
import { ref, toRefs, reactive, computed, toRaw } from 'vue'
import { useStoreForms } from '@/stores/forms'
const storeForms = useStoreForms()
const { isModalOpen, modalFormMeta } = toRefs(storeForms)
const isEditing = ref(false)
const target = ref(null)
const updateEditFlag = (val, targetType) => {
  isEditing.value = val
  target.value = targetType
}

const form = reactive({})
const currentProperties = computed(() => {
  return {
    tax: target.value === 'cat' ? 'cat' : target.value === 'item' ? 'item' : 'tag',
  }
})

const title = computed(() => {
  const action = isEditing.value === true ? 'Edit' : 'Add'
  const title
    = target.value === 'cat' ? 'Category' : target.value == 'item' ? 'Item' : 'Tag'
  return `${action} ${title}`
})

// Misc

</script>
<style lang="postcss">
.prt-heading-bar {
  @apply bg-blue-600 flex justify-between px-4 pt-5 pb-4;

  &__text {
    @apply text-white py-2 font-bold uppercase;
  }
}
</style>
