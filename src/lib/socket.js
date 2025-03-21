import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const WS_HOST = process.env.NEXT_PUBLIC_WEBSOCKET_HOST;
let socketInstance = null;

const useSocket = (eventName) => {
  const [socket, setSocket] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!WS_HOST) {
      console.error("❌ WebSocket Host is not defined.");
      return;
    }

    // Singleton pattern for socket instance
    if (!socketInstance) {
      socketInstance = io(WS_HOST, {
        transports: ["websocket"],
        withCredentials: true,
        autoConnect: true,
      });
    }

    setSocket(socketInstance);

    const handleEvent = (newData) => {
      console.log("📬 Received WS data:", newData);
      setData(newData);
    };

    if (eventName) {
      socketInstance.on(eventName, handleEvent);
    }

    return () => {
      if (eventName) {
        socketInstance.off(eventName, handleEvent);
      }
    };
  }, [eventName]);

  return { socket, data };
};

export default useSocket;