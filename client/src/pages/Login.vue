<script setup lang="ts">
import { useSession } from "../models/session";
import { ref } from "vue";
const session = useSession();
const email = ref("");
const password = ref("");

function login() {
  session.Login(email.value, password.value);
}
</script>

<template>
  <div class="section">
    <div class="columns">
      <div class="column is-half is-offset-one-quarter">
        <div class="card">
          <form class="card-content" @submit.prevent="login">
            <h1 class="title">Login Page</h1>

            <div class="field">
              <p class="control has-icons-left has-icons-right">
                <input
                  class="input"
                  type="email"
                  placeholder="Email"
                  v-model="email"
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-envelope"></i>
                </span>
                <span class="icon is-small is-right">
                  <i class="fas fa-check"></i>
                </span>
              </p>
            </div>
            <div class="field">
              <p class="control has-icons-left">
                <input
                  class="input"
                  type="password"
                  placeholder="Password"
                  v-model="password"
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-lock"></i>
                </span>
              </p>
            </div>
            <div class="field">
              <p class="control">
                <button class="button is-success">Login</button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
