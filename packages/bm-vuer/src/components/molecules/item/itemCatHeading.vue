
<template>
  <div class="prt-item-cat-heading">
    <h2 class="prt-item-cat-heading__text">
      {{ text }}
    </h2>
    <div class="prt-item-cat-heading__btns">
      <PrtButton class="mr-2" @click="openModal('item',null,null,catId,false)">
        <prt-icon pack="fas" size="small" icon="plus">
        </prt-icon>
      </PrtButton>
      <PrtButton>
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
  catId: {
    type: [String, Number],
    required: true,
    default: null,
  },
  tax: {
    type: String,
    default: null,
  },
  text: {
    type: String,
    default: null,
  },
})

function openModal(target = 'item', itemUuid = null, item = null, catUuid, isEditing = false) {
  storeForms.openModal(target, null, null, catUuid, false)
}

</script>
<style lang="postcss">
.prt-item-cat-heading {
  @apply bg-blue-600 flex justify-between px-4 pt-5 pb-4;

  &__text {
    @apply text-white py-2 font-bold uppercase;
  }
}
</style>
