
<template>
  <div class="prt-collection-item">
    <itemCatHeading :cat-id="collectionItem.id" :text="collectionItem.name" />

    <item
      v-for="item in collectionItem.items_cats"
      :key="item.uuid"
      :cat-id="collectionItem.id"
      :item="item.item"
    />
  </div>
</template>
<script lang="ts">

export default {
  name: 'PrtCollectionItem',

  props: {
    collectionItem: {
      type: Object,
      required: true,
      default: () => {
        return {}
      },
    },
  },
}

</script>
