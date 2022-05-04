<script setup lang="ts">
import { ref, toRaw, toRef, toRefs } from 'vue'

import { useStoreForms } from '@/stores/forms'
import { useStoreTx } from '@/stores/taxonomies'
import { useStoreItems } from '@/stores/items'

const itemsDB = useStoreItems()

const storeForms = useStoreForms()
const formType = ref('itemForm')

const confirmData = storeForms.getModalConfirmData
const storeTaxonomiesDB = useStoreTx()

// console.log('Zzz', toRaw(confirmData))

const { isModalConfirmOpen } = toRefs(storeForms)
const closeConfirm = () => {
  storeForms.closeModalConfirm()
}
const deleteItem = async (confirmData) => {
  await storeForms.CRUDHandler({ dataObj: confirmData }, true) // 2nd param is del
  storeTaxonomiesDB.getCats()
  storeTaxonomiesDB.getTags()
  itemsDB.getItems()
  storeForms.closeModalConfirm()
}

</script>
<template>
  <div class="prt-modal-confirm">
    <prt-modal
      :active="isModalConfirmOpen"

      @update:active="isModalConfirmOpen=!isModalConfirmOpen"
    >
      <div class="mb-6">
        <h1>
          <!-- storeForms.getFormType -->
          Delete <b class="font-bold uppercase"> {{ confirmData.name }}</b>
          <span> and its links.</span>
          <span>and remove it from links</span>
          <br>Are you sure?
        </h1>
      </div>

      <div class="flex items-center justify-between">
        <PrtButton :type="'small'" @click="deleteItem(confirmData)">
          Ok
        </PrtButton>
        <PrtButton :type="'small'" @click="closeConfirm()">
          Cancel
        </PrtButton>
      </div>
      {{ confirmData }}
    </prt-modal>
  </div>
</template>
