
import { defineStore } from 'pinia'

export const useStoreForms = defineStore({
  id: 'forms',
  state: () => ({
    currentUserId: null,
    formMode: 'login', // login/regiser
    formType: '',

    modalConfirmData: {
      targetType: null,
      targetId: null,
      name: null,
    },

    modalFormData: {
      name: '',
      slug: '',
      url: '',
      desc: '',
      tags: [],
    },

    modalFormDataTx: {
      name: '',
    },

    modalFormMeta: {
      target: null, // item
      id: null, // itemid
      cat_id: null,
      isEditing: null,

    },

    modalFormMetaTx: {
      targetTax: null, // cat/tag
      taxId: null,
      isEditing: null,

    },

  }),
  actions: {

  },

  getters: {

  },
})
