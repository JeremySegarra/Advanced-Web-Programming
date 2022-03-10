<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
const message = ref("Hello Vue!");
const currentTab = ref("All");
const prompt = ref("Waiting for input...");
const notifications = reactive([
  { type: "primary", message: "This is a primary notification" },
  { type: "link", message: "This is a link notification" },
  { type: "success", message: "Yay you did it!" },
  { type: "warning", message: "Uh Oh! Watch out!" },
  { type: "danger", message: "I cant believe you just did that!" },
]);
function cardClick() {
  message.value = "You clicked the card!";
}
function close(index: number) {
  notifications.splice(index, 1);
}

onMounted(() => {
  setInterval(() => {
    prompt.value += ".";
  }, 500);
});
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
        <h1 class="title">Bulma Examples</h1>
        <h2 class="subtitle">Some examples of using Bulma</h2>

        <div class="card" @click="cardClick">
          <div class="card-image">
            <figure class="image is-4by3">
              <img
                src="https://bulma.io/images/placeholders/1280x960.png"
                alt="Placeholder image"
              />
            </figure>
          </div>
          <button class="delete"></button>
          <div class="card-content">
            <div class="media">
              <div class="media-left">
                <figure class="image is-48x48">
                  <img
                    src="https://bulma.io/images/placeholders/96x96.png"
                    alt="Placeholder image"
                  />
                </figure>
              </div>
              <div class="media-content">
                <p class="title is-4">John Smith</p>
                <p class="subtitle is-6">@johnsmith</p>
              </div>
            </div>

            <div class="content">
              {{ message }}
              <br />
              <a>@bulmaio</a>. <a href="#">#css</a> <a href="#">#responsive</a>
              <br />
              <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
            </div>
          </div>
        </div>
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
