import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import Home from "../pages/Home.vue";
// import Messages from "../pages/Messages.vue";
import Generic from "../pages/Generic.vue";
import Login from "../pages/Login.vue";
import { useSession } from "../models/session";
//we can only initialize a pina object in Vue file

// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes: RouteRecordRaw[] = [
  { path: "/", component: Home },
  { path: "/about", component: Generic, props: { title: "About Page!" } },
  { path: "/contact", component: Generic, props: { title: "Contact Page!" } },
  { path: "/login", component: Login },
  { path: "/signup", component: Generic, props: { title: "SignUp Page!" } },
  { path: "/wall/:handle?", component: () => import("../pages/Wall.vue") }, //makes optional handle ?
  {
    path: "/hidden",
    component: Generic,
    props: { title: "You reached the hidden page" },
  },
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

router.beforeEach((to, from) => {
  const session = useSession(); //We can initialize it in Vue function here not above This is a gottcha moment!!!!!!!!!!!!!!!

  //list of paths that require login!
  if (session.destinationUrl == null && to.path != "/login") {
    session.destinationUrl = to.path;
  }

  console.log({ to });
  const protectedUrls = ["/messages", "/wall", "/feed", "/hidden"];
  console.table({ protectedUrls });

  if (protectedUrls.includes(to.path.toLowerCase())) {
    if (!session.user) {
      console.log("requires login");

      return "/login";
    }
  }
});

export default router;
