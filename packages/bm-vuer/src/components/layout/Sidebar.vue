<script setup lang="ts">

</script>

<template>
  <div class="prt-sidebar bg-gray-700 h-full">
    <div class="sidebar__cats">
      <h1>catsListing</h1>
    </div>
    <div class="sidebar__tags">
      <h1>tagsListing </h1>
    </div>
  </div>
</template>
<style lang="postcss">
.prt-sidebar {
    min-height:calc(100vh - 128px);
}
.sidebar__cats,
.sidebar__tags {
  overflow: hidden;
}
</style>
