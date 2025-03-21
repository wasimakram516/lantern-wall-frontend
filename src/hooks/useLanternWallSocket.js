import useSocket from "@/lib/socket";

const LANTERN_EVENT = "lanternEvent";
const TRIGGER_EVENT = "triggerLantern";

const useLanternWallSocket = () => {
  const { socket, data } = useSocket(LANTERN_EVENT);

  const triggerLantern = (payload) => {
    if (socket) {
      socket.emit(TRIGGER_EVENT, payload);
    } else {
      console.warn("🚨 Socket not connected yet.");
    }
  };

  return {
    triggerLantern,
    lanternData: data,
  };
};

export default useLanternWallSocket;
