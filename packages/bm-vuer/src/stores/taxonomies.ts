
import { defineStore } from 'pinia'

import useTaxonomies from '@/composables/useTaxonomies'
const {
  getAllTags,
  getAllCats,

} = useTaxonomies()

export const useStoreTx = defineStore({
  id: 'taxonomies',
  state: () => ({
    catsDB: [],
    tagsDB: [],

  }),
  actions: {
    async getCats() {
      const cats = await getAllCats()
      this.catsDB = cats.map((el) => { return { ...el, __typename: 'cats' } })
    },
    async getTags() {
      const tags = await getAllTags()
      this.tagsDB = tags.map((el) => { return { ...el, __typename: 'tags' } })
    },
  },

  getters: {
    getTagsDB(state) {
      return state.tagsDB
    },
    getCatsDB(state) {
      return state.catsDB
    },
  },
})
