<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
  title: {
    type: String,
    default: "Hello World",
  },
});
</script>

<template>
  <div>
    <div class="section">
      <h1 class="title">{{ props.title }}</h1>
    </div>
  </div>
</template>

<style scoped></style>
