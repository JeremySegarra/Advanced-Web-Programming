import router from "../router";
import { reactive } from "vue";

// import { User, list } from '../models/user'
import * as users from "../models/user";

const session = reactive({
  //typescript is a non null language so null as users.User cannot convert
  user: null as users.User | null,
});

export async function Login(handle: String, password: String) {
  const user = users.list.find((u) => u.handle === handle);

  if (!user) {
    //if user is null or undefined we would never reach session.user = user
    throw { message: "User not found" };
  }
  if (user.password !== password) {
    throw { message: "Incorrect password" };
  }

  session.user = user;
  router.push("/messages");
}

export function Logout() {
  session.user = null;
}

export default session;
