
import { defineStore } from 'pinia'

const defaultUserData = {
  name: '',
  email: '',
  password: '',

}

export const useStoreUser = defineStore({
  id: 'user',
  state: () => ({
    authToken: null,
    userData: { ...defaultUserData },

  }),
  actions: {

    setAuthToken(token) {
      this.authToken = token
    },
    clearAuthToken() {
      this.authToken = null
    },

    setUserData(userData) {
      this.userData = userData
    },
    clearUserData() {
      this.UserData = { ...defaultUserData }
    },

  },

  getters: {

    getAuthToken() {
      return this.authToken
    },

    getUserData() { return this.userData },
  },
})
