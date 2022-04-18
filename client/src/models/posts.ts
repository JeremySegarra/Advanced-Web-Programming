import { defineStore } from "pinia";
import { api } from "../models/myFetch";
import { User } from "./user";

export const usePosts = defineStore("posts", {
  state: () => ({
    list: [] as Post[],
  }),
  actions: {
    async fetchPosts() {
      this.list = (await api("posts")).data;
      console.log("posts", this.list);
    },
  },
});

export interface Post {
  _id: string;
  src: string;
  caption: string;
  owner: string;
  user: User;
  likes: string[];
  comments: any[];
  isPublic: boolean;
}
