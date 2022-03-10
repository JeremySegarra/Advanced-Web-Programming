import router from "../router";
import { reactive } from "vue";

// import { User, list } from '../models/user'
import * as users from "../models/user";
import { useMessages } from "./messages";

const session = reactive({
  //typescript is a non null language so null as users.User cannot convert
  user: null as users.User | null,
});

export async function Login(handle: String, password: String) {
  const user = users.list.find((u) => u.handle === handle);
  const messages = useMessages();

  try {
    if (!user) {
      //if user is null or undefined we would never reach session.user = user
      throw { message: "User not found" };
    }
    if (user.password !== password) {
      throw { message: "Incorrect password" };
    }
    messages.notifications.push({
      type: "success",
      message: `Welcome Back ${user.firstName}!`,
    });
    session.user = user;
    router.push("/messages");
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
