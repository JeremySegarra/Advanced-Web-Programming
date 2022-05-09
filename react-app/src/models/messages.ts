import { useState } from "react";

export default function useMessages() {

  const [notifications, setNotifications] = useState<Notification[]>([
    {type: "success", message: "Success!"},
  ]);

  return{
    notifications,
    add(notification: Notification) {
      setNotifications([...notifications, notification]);
    },
    close(index: number) {
      setNotifications(notifications.filter((_, i) => i !== index));
    
  } 
  

}



export interface Notification {
  type: "success" | "danger" | "info" | "warning";
  message: string;
}

