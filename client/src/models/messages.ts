import { defineStore } from "pinia";

export const useMessages = defineStore("messages", {
  state: () => ({
    notifications: [] as Notification[],
  }),
  actions: {
    close(index: number) {
      this.notifications.splice(index, 1);
    },
  },
});

export interface Notification {
  type: "success" | "danger" | "info" | "warning";
  message: string;
}
