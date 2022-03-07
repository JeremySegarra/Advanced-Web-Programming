<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";
import LoginBadge from "./LoginBadge.vue";

const isOpen = ref(false);
</script>

<template>
  <nav class="navbar is-info" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <a class="navbar-item" href="https://bulma.io">
          <img
            src="https://bulma.io/images/bulma-logo.png"
            width="112"
            height="28"
          />
        </a>
        <a
          role="button"
          class="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          :class="{ 'is-active': isOpen }"
          @click="isOpen = !isOpen"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div class="navbar-menu" :class="{ 'is-active': isOpen }">
        <div class="navbar-start">
          <router-link class="navbar-item" to="/"> Home </router-link>
          <router-link class="navbar-item" to="/messages">
            Messages
          </router-link>
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link"> More </a>
            <div class="navbar-dropdown">
              <router-link class="navbar-item" to="/about"> About </router-link>
              <a class="navbar-item"> Jobs </a>
              <router-link class="navbar-item" to="/contact">
                Contact
              </router-link>
              <hr class="navbar-divider" />
              <a class="navbar-item"> Report an issue </a>
            </div>
          </div>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="field is-grouped">
              <p class="control"></p>
              <p class="control">
                <a
                  class="button is-primary"
                  href="https://github.com/jgthms/bulma/releases/download/0.9.3/bulma-0.9.3.zip"
                >
                  <span class="icon">
                    <i class="fas fa-download"></i>
                  </span>
                  <span>Download</span>
                </a>
              </p>
            </div>
          </div>

          <div class="navbar-item">
            <login-badge></login-badge>
          </div>
          <div class="navbar-item">
            <a
              class="bd-tw-button button"
              data-social-network="Twitter"
              data-social-action="tweet"
              data-social-target="https://bulma.io"
              target="_blank"
              href="https://twitter.com/intent/tweet?text=Bulma: a modern CSS framework based on Flexbox&amp;hashtags=bulmaio&amp;url=https://bulma.io&amp;via=jgthms"
            >
              <span class="icon">
                <i class="fab fa-twitter"></i>
              </span>
              <span> Tweet </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style></style>
