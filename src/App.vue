<template>
  <router-view></router-view>
  <button @click="counter.increment()">+1</button>  {{ counter.count }}
</template>
<script setup>
import { useUserStore } from './store/modules/user';
const counter = useUserStore()

</script>
<style scoped></style>
