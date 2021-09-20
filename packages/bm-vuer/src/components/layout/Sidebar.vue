<script setup lang="ts">

</script>

<template>
  <div class="prt-sidebar bg-gray-700 h-full">
    <div class="sidebar__cats">
      <catsListing />
    </div>
    <div class="sidebar__tags">
      <tagsListing />
    </div>
  </div>
</template>
<style lang="postcss">
.sidebar__cats,
.sidebar__tags {
  overflow: hidden;
}
</style>
