import { useEffect, useState, createContext, useContext } from "react";
import { MessageContext } from "./MessageContext";
// import useMessages from "../models/messages.ts";

export default function Messages() {
  const messages = useContext(MessageContext);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    messages.add({ type: "info", message: "Hello, world!" });
  }, []);

  return (
    <div
      class={`navbar-item has-dropdown notification-component ${
        isOpen && "is-active"
      }`}
    >
      <a class="navbar-link" onClick={() => setIsOpen(!isOpen)}>
        {" "}
        {/*this can be a named function to call */}
        <span class="icon">
          <i class="fas fa-bell"></i>
        </span>
        {messages.notifications.length && (
          <span class="tag is-danger">{messages.notifications.length}</span>
        )}
      </a>
      <div class="navbar-dropdown">
        {messages.notifications.map((x, i) => (
          <div class={`notification is-light is-${x.type}`} key={i}>
            <button class="delete" onClick={() => messages.close(i)}></button>
            {x.message}
          </div>
        ))}
      </div>
    </div>
  );
}

export const MessagesContext = createContext({});
