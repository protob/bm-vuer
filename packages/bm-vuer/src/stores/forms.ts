
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

    openModalTx(targetTax, taxId, name, isEditing) {
      this.formType = 'taxForm'
      this.isModalOpen = true
      this.modalFormMetaTx.isEditing = isEditing
      this.modalFormMetaTx.targetTax = targetTax
      this.modalFormMetaTx.taxId = taxId
      this.modalFormDataTx.name = name
    },

    openModal(target, item_id, item, cat_id, isEditing) {
      this.formType = 'itemForm'
      this.isModalOpen = true
      this.modalFormMeta.isEditing = isEditing
      this.modalFormMeta.target = target
      this.modalFormMeta.id = item_id
      this.modalFormMeta.cat_id = cat_id

      if (item) { // skip for adding new item
        this.modalFormData.name = item.name
        this.modalFormData.slug = item.slug
        this.modalFormData.url = item.url
        this.modalFormData.desc = item.desc
        this.modalFormData.tags = item.items_tags
      }
    },
    openModalConfirm(targetType, targetId, name) {
      this.isModalConfirmOpen = true
      this.modalConfirmData.targetType = targetType
      this.modalConfirmData.targetId = targetId
      this.modalConfirmData.name = name
    },

    openModalAccount(targetAction) {
      this.formType = (targetAction === 'login')
        ? 'loginForm'
        : 'registerForm'

      this.isModalAccountOpen = true
    },

    closeModalAccount() {
      this.isModalAccountOpen = false
    },

    closeModalConfirm() {
      this.isModalConfirmOpen = false
    },

    closeModal() {
      this.isModalOpen = !this.isModalOpen
    }
  },

  getters: {
    getFormType: (state) => {
      return state.formType
    },
    getFormMode: (state) => {
      return state.formMode
    },
    getModalConfirmData: (state) => {
      return state.modalConfirmData
    },
    getModalFormData: (state) => {
      return state.modalFormData
    },

    getModalFormMeta: (state) => {
      return state.modalFormMeta
    },

    getModalFormDataTx: (state) => {
      return state.modalFormDataTx
    },

    getModalFormMetaTx: (state) => {
      return state.modalFormMetaTx
    },

  },
})
