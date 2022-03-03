import router from "../router";

const session = {
  user: null as any,
};

export async function Login(username: String, password: String) {
  session.user = { username, password };
  router.push("/messages");
}

export default session;
