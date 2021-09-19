
<template>
  <div class="prt-search-box  ">
    <prt-field class="flex w-full justify-between">
      <PrtTextinput
        v-model="filterPhrase"
        class="pb-0 w-full"
        placeholder="Search"
        @input="filterItems"
      />
    </prt-field>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useStoreItems } from '@/stores/items'
const store = useStoreItems()
const filterPhrase = ref('')

const filterItems = () => {
  const phrase = filterPhrase.value
  if (phrase.length > 0)
    store.sortByPhrase(phrase)
  else
    store.getItems()
}

function resetFilter() {
  store.sortByPhrase(null)
}
</script>

<style scoped lang="postcss">
  .prt-ctrl-input{
    width:100%;
  }
.prt-search-box {
  .prt-input input {
    --input-border: none;
    --input-padding: 0.75rem 0.75rem;
  }
}
</style>
