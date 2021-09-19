
import { defineStore } from 'pinia'

export const useStoreForms = defineStore({
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
