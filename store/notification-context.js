import { createContext, useState } from "react";

const NotificationContext = createContext({
  notification: null, //{title, message, status}
  showNotification: function () {}, //show notification
  hideNotification: function () {}, //hide notification
});

export function NotificationContextProvider(props) {
  return (
    <NotificationContext.Provider>
      {props.children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;
