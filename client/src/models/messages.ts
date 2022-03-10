import { defineStore } from "pinia";

export const useMessages = defineStore("messages", {
  state: () => ({
    notifications: [
      {
        type: "primary",
        message: "This is a primary notification",
      },
      {
        type: "link",
        message: "This is a primary notification",
      },
      {
        type: "success",
        message: "This is a primary notification",
      },
      {
        type: "warning",
        message: "This is a primary notification",
      },
      {
        type: "danger",
        message: "I cant believe you jsut did that!",
      },
    ],
  }),
  actions: {
    close(index: number) {
      this.notifications.splice(index, 1);
    },
  },
});
