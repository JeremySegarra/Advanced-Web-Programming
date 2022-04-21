import { defineStore } from "pinia";
import { useSession } from "./session";
import { User } from "./user";

export const usePosts = defineStore("posts", {
  state: () => ({
    list: [] as Post[],
    session: useSession(),
  }),
  actions: {
    async fetchPosts(handle: string = "") {
      //we use the session api
      const posts = await this.session.api("posts/wall/" + handle);
      this.list = posts;
      console.log("posts", this.list);
    },

    async fetchAllPosts() {
      const posts = await this.session.api("posts");
      this.list = posts;
      console.log("posts", this.list);
    },

    async createPost(post: Post) {
      const newPost = await this.session.api("posts", post);
      this.list.push(newPost);
      console.log("posts", this.list);
    },
  },
});

export interface Post {
  _id?: string;
  src: string;
  caption: string;
  owner: string;
  user?: User;
  likes: string[];
  comments: any[];
  isPublic: boolean;
}
