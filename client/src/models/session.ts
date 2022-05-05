import router from "../router";

import * as users from "../models/user";
import { useMessages } from "./messages";
import { api } from "./myFetch";
import { defineStore } from "pinia";
import { decodeJWT, loadSrcipt } from "./utils";

export const useSession = defineStore("session", {
  state: () => ({
    user: undefined as users.User | undefined,
    destinationUrl: null as string | null,
  }),
  actions: {
    async GoogleLogin() {
      await loadSrcipt(
        "https://accounts.google.com/gsi/client",
        "google-signin"
      );
      console.log(import.meta.env.VITE_GOOGLE_CLIENT_ID);

      const auth_Client = google.accounts.oauth2.initTokenClient({
        client_id: <string>import.meta.env.VITE_GOOGLE_CLIENT_ID,
        scope: "email profile",
        callback: async (x) => {
          const user = await fetch(
            "http://www.googleapis.com/oauth2/v3/userinfo?alt=json",
            {
              headers: {
                Authorization: `Bearer ${x.access_token}`,
              },
            }
          ).then((x) => x.json());
          console.log(user);

          this.user = {
            id: user.sub,
            email: user.email,
            firstName: user.given_name,
            lastName: user.family_name,
            pic: user.picture,
            handle: user.email,
            password: "",
          };
        },
      });
      auth_Client.requestAccessToken();
      //any code that happens after this will automatically wait and execute everything after this is loaded
    },
    async Login(email: string, password: string) {
      const messages = useMessages();

      try {
        const user = await this.api("users/login", { email, password });

        if (user) {
          messages.notifications.push({
            type: "success",
            message: `Welcome back ${user.firstName}!`,
          });

          this.user = user;
          router.push(this.destinationUrl ?? "/wall");
        }
      } catch (error: any) {
        messages.notifications.push({
          type: "danger",
          message: error.message,
        });
        console.table(messages.notifications);
      }
    },

    Logout() {
      this.user = undefined;
      router.push("/login");
    },

    async api(
      url: string,
      data?: any,
      method?: "GET" | "POST" | "PUT" | "DELETE",
      headers: any = {}
    ) {
      const messages = useMessages();

      if (this.user?.token) {
        headers.Authorization = `Bearer ${this.user.token}`;
      }

      try {
        const response = await api(url, data, method, headers);
        if (response.errors?.length) {
          throw { message: response.errors.join(", ") };
        }
        return await response.data;
      } catch (error: any) {
        messages.notifications.push({
          type: "danger",
          message: error.message,
        });
        //console.table(messages.notifications)
      }
    },
  },
});

export interface ApiResult {
  data: any;
  errors?: string[];
  success: boolean;
}
