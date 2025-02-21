import { io, Socket } from "socket.io-client";

interface ServerToClientEvents {
  hit: (bank: string) => void;
}


const socket: Socket<ServerToClientEvents, object> = io(
  "http://103.82.27.19:9986/"
);
const Monitor = () => {
  socket.on("hit", (bank: string) => {
   bank
  });
  return (
    <div>

    </div>
  );
};

export default Monitor;
