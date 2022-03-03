import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import Home from "../pages/Home.vue";
import Messages from "../pages/Messages.vue";
import Generic from "../pages/Generic.vue";

// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes: RouteRecordRaw[] = [
  { path: "/", component: Home },
  { path: "/about", component: Generic, props: { title: "About Page!" } },
  { path: "/contact", component: Generic, props: { title: "Contact Page!" } },
  { path: "/login", component: Generic, props: { title: "Login Page!" } },
  { path: "/signup", component: Generic, props: { title: "SignUp Page!" } },
  { path: "/messages", component: Messages },
];

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
  linkActiveClass: "is-active",
});

export default router;
