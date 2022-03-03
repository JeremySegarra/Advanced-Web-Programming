import { createApp } from "vue";
import "bulma";
import "@fortawesome/fontawesome-free/css/all.css";

import App from "./App.vue";
import router from "./router";

createApp(App).use(router).mount("#app");
