<script setup lang="ts">
import { ref } from "vue";
import { useMessages } from "../models/messages";
const messages = useMessages();
const isOpen = ref(false);
</script>

<template>
  <div class="navbar-item has-dropdown" :class="{ 'is-active': isOpen }">
    <a class="navbar-link" @click="isOpen = !isOpen">
      <span class="icon">
        <i class="fas fa-bell"></i>
      </span>
      <span class="tag is-danger" v-if="messages.notifications.length">
        {{ messages.notifications.length }}
      </span>
    </a>
    <div class="navbar-dropdown">
      <div
        v-for="(x, i) in messages.notifications"
        :class="`notification is-light is-${x.type}`"
      >
        <button class="delete" @click="messages.close(i)"></button>
        {{ x.message }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.icon {
  font-size: 1.5em;
}
.navbar-dropdown {
  width: max-content;
  max-width: 300px;
}
.notification {
  margin: 0.5rem;
  width: 100%;
}
.tag {
  position: absolute;
  font-size: 0.8em;
  top: 0.5em;
  right: 2.5em;
  height: 1.5em;
  padding: 0.5em;
  border-radius: 50%;
}
</style>
