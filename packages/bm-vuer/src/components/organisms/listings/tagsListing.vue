<template>
  <div class="prt-cats-listing">
    <sidebarHeading :tax="'tags'" :text="'tags'" />
    <div class="prt-tags-listing__items">
      <div class="scrollbar-content">
        <sidebarItem
          v-for="item in store.tagsDB"
          :key="item.id"
          :item-tx="item"
          :tax="'tag'"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useStoreTx } from "@/stores/taxonomies";
import { ref, onMounted, computed } from "vue";
const store = useStoreTx();
const isLoading = ref(true);
onMounted(() => {
  store.getTags();
});
</script>

<style lang="postcss">
.prt-cats-listing {
  max-height: calc(50vh - 80px);
  height: calc(50vh - 80px);
  @media screen and (max-width: 640px) {
    max-height: 146px;
    height: 146px;
  }
}
.prt-cats-listing__items {
  height: calc(100% - 72px);
  overflow: hidden;
}
</style>
