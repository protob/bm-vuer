
<template>
  <div class="prt-items-listing ">
    <div class="prt-items-listing__items">
      <itemCatCollection
        v-for="item in itemsDB"
        :key="item.uuid"
        :collection-item="item"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, computed, toRefs } from 'vue'
import { useStoreItems } from '@/stores/items'
const store = useStoreItems()
const itemsDB = computed(() => store.itemsDB)
onMounted(() => {
  store.getItems()
})

</script>
<style lang="postcss">
.prt-items-listing {
  /* max-height: calc(100vh - 149px);
  height: calc(100vh - 149px); */
}
.prt-items-listing__items {
  height: 100%;
  /* overflow: hidden; */
}
</style>
