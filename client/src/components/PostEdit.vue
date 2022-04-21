<script setup lang="ts">
import { Post } from "../models/posts";

const { post } = defineProps<{
  post: Post;
}>();
</script>

<template>
  <div>
    <div class="card">
      <form class="card-contents">
        <label class="label">Image</label>
        <div class="control">
          <input
            class="input"
            type="text"
            v-model="post.src"
            placeholder="Image"
          />
        </div>
        <div class="field">
          <label class="label">Content</label>
          <div class="control">
            <textarea
              class="textarea"
              v-model="post.caption"
              placeholder=""
            ></textarea>
          </div>
        </div>
        <div class="field">
          <button class="button is-primary" @click.prevent="$emit('save')">
            Update Posts
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
