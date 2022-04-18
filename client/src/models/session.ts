import router from "../router";
import { reactive } from "vue";

// import { User, list } from '../models/user'
import * as users from "../models/user";
import { useMessages } from "./messages";
import { api } from "./myFetch";

const session = reactive({
  //typescript is a non null language so null as users.User cannot convert
  user: null as users.User | null,
  destinationUrl: null as string | null,
});

export async function Login(email: String, password: String) {
  const messages = useMessages();

  try {
    const user = await api("users/login", { email, password });

    if (user) {
      messages.notifications.push({
        type: "success",
        message: `Welcome Back ${user.firstName}!`,
      });
      session.user = user;
      router.push(session.destinationUrl ?? "/wall"); //if destination value is not null then use /wall or vise versa
    }
  } catch (error: any) {
    messages.notifications.push({
      type: "danger",
      message: error.message,
    });
    console.table(messages.notifications);
  }
}

export function Logout() {
  session.user = null;
  router.push("/login");
}

export default session;
