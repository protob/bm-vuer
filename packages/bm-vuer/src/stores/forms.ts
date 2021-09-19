
import { defineStore } from 'pinia'
import { toRaw, ref } from 'vue'
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
    isModalOpen: false,
    isModalConfirmOpen: false,
    isModalAccountOpen: false,
  }),
  actions: {
    openModalAccount(targetAction) {
      this.formType = (targetAction === 'login')
        ? 'loginForm'
        : 'registerForm'

      this.isModalAccountOpen = true
    },

    closeModalAccount() {
      this.isModalAccountOpen = false
    },

  },

  getters: {
    getFormType: (state) => {
      return state.formType
    },
    getFormMode: (state) => {
      return state.formMode
    },

  },
})
