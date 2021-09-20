<template>
  <div class="prt-sidebar-heading flex justify-between shadow-xl">
    <h1 class="prt-sidebar-heading__text w-1/2 sm:w-full xl:w-1/2 xxl:w-full">
      {{ text }}
    </h1>

    <div
      class="prt-sidebar-heading__buttons flex justify-end sm:justify-between xl:justify-end w-1/2 sm:w-full xl:w-1/2 xxl:w-full"
    >
      <PrtButton
        class="bg-gray-900 mr-2"
        @click.prevent="openModalTx(tax, null, null, false)"
      >
        <prt-icon pack="fas" size="small" icon="plus">
        </prt-icon>
      </PrtButton>
      <PrtButton class="bg-gray-900">
        <prt-icon pack="fas" size="small" icon="caret-up">
        </prt-icon>
      </PrtButton>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue'
import { useStoreForms } from '@/stores/forms'
const storeForms = useStoreForms()

defineProps({
  tax: {
    type: String,
    default: 'cat',
  },
  text: {
    type: String,
    default: 'Categories',
  },
})

function openModalTx(target, itemUuid = null, item = null, isEditing = false) {
  storeForms.openModalTx(target, null, null, false)
}
</script>
<style lang="postcss">
.prt-sidebar-heading__text {
  @apply text-white py-2 font-bold uppercase text-left;

  @screen sm {
    @apply w-full;
  }
}

.prt-sidebar-heading {
  @apply bg-gray-800 flex  flex-wrap justify-between p-4;

  @screen xxl {
    @apply flex-no-wrap;
  }
}
</style>
