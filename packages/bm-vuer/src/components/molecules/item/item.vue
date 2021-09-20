<template>
  <div class="prt-item flex justify-between flex-wrap">
    <div class="prt-item__panel">
      <h1 class="prt-item__h">
        <a href="" target="_blank" class="prt-item__link">{{ item.name }}</a>
      </h1>
      <p>{{ item.url }}</p>
      <p>{{ item.desc }}</p>
      <p>
        {{ formatedDate }}
      </p>
    </div>

    <div class="prt-item__buttons">
      <PrtButton
        variant="warning"
        class="mr-2 text-black"
        @click.prevent="openModal('item', item.id, item, catId , true)"
      >
        <prt-icon class="text-black" pack="fas" size="small" icon="edit">
        </prt-icon>
      </PrtButton>
      <PrtButton
        variant="danger"
        @click.prevent="toggleDeleteItemModal('item', item.id, item.name)"
      >
        <prt-icon class="text-white" pack="fas" size="small" icon="trash">
        </prt-icon>
      </PrtButton>
    </div>

    <div class="w-full prt-item__tags">
      <tags :tags="item.items_tags" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps, toRefs, computed } from 'vue'

import { useStoreForms } from '@/stores/forms'

const storeForms = useStoreForms()
const props = defineProps({
  item: {
    type: Object,
    required: true,
    default: () => {
      return {}
    },
  },

  catId: {
    type: String,
    required: true,
    default: null,
  },
})

// catUuid: {
//   type: String | Number,
//   required: true,
//   default: null,
// },
// title: {
//   type: String | Number,
//   default: 'Categories',
// },
// },

const { item } = toRefs(props)

const formatedDate = computed(() => {
  return new Date().toLocaleDateString('en-AU') // 9/17/2016
})

function toggleDeleteItemModal(target, taxUuid, taxName) {
  storeForms.openModalConfirm(target, taxUuid, taxName)
}

function openModal(target, itemUuid, item = null, catUuid, isEditing = true) {
  storeForms.openModal(target, itemUuid, item, catUuid, isEditing)
}
</script>
<style lang="postcss">
.prt-item {
  @apply border-t border-gray-700 pl-4 pr-3 pt-4 pb-8 flex justify-between bg-gray-900 text-left;
  p {
    @apply text-white  pb-2;
  }
  &__h {
    @apply text-white text-2xl pb-2 capitalize;
  }
}
</style>
