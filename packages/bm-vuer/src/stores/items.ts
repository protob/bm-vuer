
import { defineStore } from 'pinia'

export const useStoreItems = defineStore({
  id: 'items',
  state: () => ({
    itemsDB: [],
    isLoading: false,
    itemsSortOrder: 'DESC',
    itemsSearchPhrase: '',
    itmesTagFilterObj: '',
    itemsCatFitlerObj: '',
  }),
  actions: {

  },

  getters: {

  },
})
