
<template>
  <div class="prt-sort-box">
    <PrtSelect
      v-model="selected"

      placeholder="Select a name"
    >
      <option v-for="item,key in options" :key="key" :value="item.value">
        {{ item.label }}
      </option>
    </PrtSelect>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useStoreItems } from '@/stores/items'
const store = useStoreItems()
const optionsList = [
  { value: 'date-asc', label: 'DATE ASC' },
  { value: 'date-desc', label: 'DATE DESC' },
  { value: 'name-asc', label: 'ASC' },
  { value: 'name-desc', label: 'DESC' },
]

const selected = ref('name-desc')

const options = ref(optionsList)

watch(selected, (value) => {
  store.sortByOrder(value)
})

</script>

<style lang="postcss">
.prt-sort-box {
  width: 100%;
}
</style>
