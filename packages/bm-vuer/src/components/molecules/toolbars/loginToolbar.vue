<template>
  <div class="prt-login-toolbar sm:flex flex justify-between">
    <PrtButton @click="openModal('login')">
      {{ buttonText }}
    </PrtButton>
    <PrtButton @click="openModal('register')">
      Register
    </PrtButton>

    <PrtButton @click="logout">
      Logout
    </PrtButton>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useUserStore } from '@/stores/user'

import { useStoreForms } from '@/stores/forms'
const userStore = useUserStore()

const storeForms = useStoreForms()
const isLoggedIn = computed(() => {
  return userStore.getUser
})
const buttonText = computed(() => {
  return isLoggedIn.value ? 'Logout' : 'Login'
})

const openModal = (targetAction) => {
  storeForms.openModalAccount(targetAction)
}
const logout = () => {
  // TODO
  alert('TODO')
}

</script>
<style lang="postcss">

.prt-login-toolbar {
  min-width: 181px;
}
.prt-login-toolbar {
  .prt-btn {
    --protium-button-margin:0 0.2rem;
    --protium-button-color:black;
    --protium-button-border: 1px solid transparent;

  }
}
</style>
