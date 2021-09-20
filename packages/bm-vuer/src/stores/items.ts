
import { defineStore } from 'pinia'

import useItemsDB from '@/composables/useItems'
const {
  filterItemsByCat,
  filterItemsByTag,
  getItems,
  sortByOrder,
  sortByPhrase,

} = useItemsDB()

export const useStoreItems = defineStore({
  id: 'itemsDB',
  state: () => ({
    itemsDB: [],
    isLoading: false,
    itemsSortOrder: 'DESC',
    itemsSearchPhrase: 'AAA',
    itmesTagFilterObj: 'BB',
    itemsCatFitlerObj: 'CCC',
  }),
  actions: {
    async getItems() {
      this.itemsDB = await getItems()
    },
    async sortByOrder(input: string) {
      this.itemsDB = await sortByOrder(input)
    },

    async sortByPhrase(input: string) {
      this.itemsDB = await sortByPhrase(input)
    },

    async filterItemsByTag(uuid: string, tagName: string) {
      this.itemsDB = await filterItemsByTag(uuid, tagName)
    },

    async filterItemsByCat(uuid: string, catName: string) {
      this.itemsDB = await filterItemsByCat(uuid, catName)
    },

  },
  getters: {
    getItemsDB(state) {
      return state.itemsDB
    },

    getItemsSortOrder(state) {
      return state.itemsSortOrder
    },
    getItemsSearchPhrase(state) {
      return state.itemsSearchPhrase
    },

    getItmesTagFilterObj(state) {
      return state.itmesTagFilterObj
    },

    getItemsCatFitlerObj(state) {
      return state.itemsCatFitlerObj
    },

  },
})
