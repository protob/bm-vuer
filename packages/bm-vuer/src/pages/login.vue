<template>
  <div class="flex justify-center content-center flex-wrap h-full  ">
    <div
      class="max-w-96 px-6 py-6  "
    >
      <h1 class="text-white bold text-2xl pb-8">
        Login
      </h1>
      <div
        class="max-w-96 px-6 py-6 bg-gray-500 "
      >
        <login-form />
      </div>
    </div>
  </div>
</template>

<script lang="ts">

export default {
  name: 'Login',

}
</script>
<route lang="yaml">
meta:
  layout: login
</route>
