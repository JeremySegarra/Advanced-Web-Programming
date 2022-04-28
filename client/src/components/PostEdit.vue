<script setup lang="ts">
import { Post } from "../models/posts";

const { post } = defineProps<{
  post: Post;
}>();
</script>

<template>
  <div>
    <div class="card">
      <form class="card-content">
        <div class="field">
          <div class="control">
            <input
              class="input"
              type="text"
              v-model="post.src"
              placeholder="Image"
            />
          </div>
        </div>
        <div class="field">
          <div class="control">
            <textarea
              class="textarea"
              v-model="post.caption"
              placeholder="Caption"
            ></textarea>
          </div>
        </div>
        <div class="field">
          <div class="control">
            <button class="button is-primary" @click.prevent="$emit('save')">
              Update Post
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
