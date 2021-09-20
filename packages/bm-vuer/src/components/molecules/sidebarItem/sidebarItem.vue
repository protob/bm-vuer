<template>
  <div class="prt-sidebar-item flex flex-wrap justify-between">
    <div
      class="w-auto sm:w-full lg:w-auto"
    >
      <h2
        class="prt-sidebar-item__text"
        @click="filterItemsByTx(itemTx.id, itemTx.name, itemTx.__typename)"
      >
        {{ itemTx.name }}
      </h2>
    </div>

    <div class="prt-sidebar-item__btns w-auto sm:w-full lg:w-auto">
      <PrtButton
        v-show="tax != 'tag'"
        class="ml-2 bg-gray-600"
        variant="warning"
        @click.prevent="openModal('item', null,null,itemTx.id, false)"
      >
        <prt-icon pack="fas" size="small" icon="plus">
        </prt-icon>
      </PrtButton>
      <PrtButton
        class="ml-2 bg-gray-600"
        @click="openModalTx(tax, itemTx.id, itemTx.name, true)"
      >
        <prt-icon pack="fas" size="small" icon="edit">
        </prt-icon>
      </PrtButton>
      <PrtButton
        class="ml-2  bg-gray-600"
        variant="danger"
        @click="toggleDeleteTxModal(tax, itemTx.id, itemTx.name)"
      >
        {{ tax }}

        <prt-icon

          class="text-white"
          pack="fas"
          size="small"
          icon="trash"
        >
        </prt-icon>
      </PrtButton>
    </div>
  </div>
</template>
<script setup lang="ts" >


import { useStoreItems } from '@/stores/items'
import { useStoreForms } from '@/stores/forms'
import { defineProps, toRefs } from 'vue'
const store = useStoreItems()
const storeForms = useStoreForms()

const props = defineProps({
  itemTx: {
    type: Object,
    default: () => {
      return {}
    },
  },
  tax: {
    type: String,
    default: 'cat',
  },
})

const { item, tax } = toRefs(props)

const filterItemsByTx = (id, name, tax) => {
  return tax === 'cats'
    ? store.filterItemsByCat(id, name)
    : store.filterItemsByTag(id, name)
}

const toggleDeleteTxModal = (targetTx, taxId, name) => {
  storeForms.openModalConfirm(targetTx, taxId, name)
}
const openModalTx = (targetTax, taxId, name, isEditing = true) => {
  storeForms.openModalTx(targetTax, taxId, name, true)
}

function openModal(target, itemId = null, item = null, cat_id, isEditing = false) {
  const itemObj = item || { name: '', slug: '', url: '', items_tags: [], desc: '' }
  storeForms.openModal(target, itemId, itemObj, cat_id, isEditing)
}

</script>

<style lang="postcss">
.prt-sidebar-item__text {
  @apply text-gray-300 py-2 font-bold capitalize cursor-pointer;
}
.prt-sidebar-item {
  @apply flex justify-between p-4  border-t border-gray-600;
}
</style>
