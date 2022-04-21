<script setup lang="ts">
import { useRoute } from "vue-router";
import PostVue from "../components/PostVue.vue";
import { usePosts } from "../models/posts";
const route = useRoute();
const posts = usePosts();
posts.fetchPosts(route.params.handle as string); // when the promise is done it will uopdates the posts automatically
</script>

<template>
  <div class="section">
    <div class="columns">
      <div class="column is-one-quarter">
        <aside class="menu">
          <p class="menu-label">General</p>
          <ul class="menu-list">
            <li><a>Dashboard</a></li>
            <li><a>Customers</a></li>
          </ul>
          <p class="menu-label">Administration</p>
          <ul class="menu-list">
            <li><a>Team Settings</a></li>
            <li>
              <a class="is-active">Manage Your Team</a>
              <ul>
                <li><a>Members</a></li>
                <li><a>Plugins</a></li>
                <li><a>Add a member</a></li>
              </ul>
            </li>
            <li><a>Invitations</a></li>
            <li><a>Cloud Storage Environment Settings</a></li>
            <li><a>Authentication</a></li>
          </ul>
          <p class="menu-label">Transactions</p>
          <ul class="menu-list">
            <li><a>Payments</a></li>
            <li><a>Transfers</a></li>
            <li><a>Balance</a></li>
          </ul>
        </aside>
      </div>

      <div class="column is-half">
        <PostVue
          v-for="post in posts.list"
          :key="post._id"
          :post="post"
        ></PostVue>
      </div>

      <div class="column is-one-quarter">
        <article class="panel is-primary">
          <p class="panel-heading">Primary</p>
          <p class="panel-tabs">
            <a
              :class="{ 'is-active': currentTab == 'All' }"
              @click="currentTab = 'All'"
              >All</a
            >
            <a
              :class="{ 'is-active': currentTab == 'Public' }"
              @click="currentTab = 'Public'"
              >Public</a
            >
            <a
              :class="{ 'is-active': currentTab == 'Private' }"
              @click="currentTab = 'Private'"
              >Private</a
            >
            <a
              :class="{ 'is-active': currentTab == 'Sources' }"
              @click="currentTab = 'Sources'"
              >Sources</a
            >
            <a
              :class="{ 'is-active': currentTab == 'Forks' }"
              @click="currentTab = 'Forks'"
              >Forks</a
            >
          </p>
          <div class="panel-block">
            <p class="control has-icons-left">
              <input
                class="input is-primary"
                type="text"
                :placeholder="prompt"
              />
              <span class="icon is-left">
                <i class="fas fa-search" aria-hidden="true"></i>
              </span>
            </p>
          </div>
          <a class="panel-block is-active">
            <span class="panel-icon">
              <i class="fas fa-book" aria-hidden="true"></i>
            </span>
            bulma
          </a>
          <a class="panel-block">
            <span class="panel-icon">
              <i class="fas fa-book" aria-hidden="true"></i>
            </span>
            marksheet
          </a>
          <a class="panel-block">
            <span class="panel-icon">
              <i class="fas fa-book" aria-hidden="true"></i>
            </span>
            minireset.css
          </a>
          <a class="panel-block">
            <span class="panel-icon">
              <i class="fas fa-book" aria-hidden="true"></i>
            </span>
            jgthms.github.io
          </a>
        </article>
      </div>
    </div>
  </div>
</template>

<style>
.card .delete {
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
}
</style>
