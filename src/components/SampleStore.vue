<script setup lang="ts">
import { useStore } from '../stores/sample'


const store = useStore()
store.counter = 3
    store.randomizeCounter()

</script>

<template>
  <nav class="footer text-xl mt-6">
    <h1>STORE</h1>
    <pre>{{store.doubleCount}}</pre>


  </nav>
</template>
