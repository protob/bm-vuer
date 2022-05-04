<script setup lang="ts">
import { computed, reactive, ref, toRaw, toRefs } from 'vue'
import { useStoreForms } from '@/stores/forms'

const storeForms = useStoreForms()
const { isModalAccountOpen, modalFormMeta } = toRefs(storeForms)

const target = ref(null)
const form = reactive({})
const title = computed(() => { return storeForms.getFormType === 'loginForm' ? 'login' : 'register' })

// Misc

</script>
<template>
  <div class="prt-modal-form">
    <prt-modal
      :active="isModalAccountOpen"

      @update:active="isModalAccountOpen = !isModalAccountOpen"
    >
      <div class="prt-heading-bar">
        <span class="prt-heading-bar__text">
          {{ title }}
        </span>
      </div>

      <login-form
        v-if="storeForms.getFormType == 'loginForm'"
      />
      <register-form v-else />
    </prt-modal>
  </div>
</template>
<style lang="postcss">
.prt-heading-bar {
  @apply bg-black flex text-center justify-between px-4 pt-5 pb-4 mb-4;

  &__text {
    @apply  py-2 font-bold uppercase w-full;
    color:#00ad93;

  }
}
</style>
