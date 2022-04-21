import router from "../router";

// import { User, list } from '../models/user'
import * as users from "../models/user";
import { useMessages } from "./messages";
import { api } from "./myFetch";
import { defineStore } from "pinia";

export const useSession = defineStore("session", {
  state: () => ({
    user: null as users.User | null,
    destinationUrl: null as string | null,
  }),
  actions: {
    async Login(email: String, password: String) {
      const messages = useMessages();

      try {
        //We use the local api function not from my fetch
        const user = await this.api("users/login", { email, password });

        if (user) {
          messages.notifications.push({
            type: "success",
            message: `Welcome Back ${user.firstName}!`,
          });
          this.user = user;
          router.push(this.destinationUrl ?? "/wall"); //if destination value is not null then use /wall or vise versa
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
      this.user = null;
      router.push("/login");
    },
    //we give headers a default value by useing = {}
    async api(
      url: string,
      data?: any,
      method?: "GET" | "POST" | "PUT" | "DELETE",
      headers: any = {}
    ) {
      const messages = useMessages();
      //if this user has a token
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
        // console.table(messages.notifications);
      }
    },
  },
});

export interface ApiResult {
  data: any;
  errors?: string[];
  success: boolean;
}
