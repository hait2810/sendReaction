import { io, Socket } from "socket.io-client";

interface ServerToClientEvents {
  hit: (bank: string) => void;
}


const socket: Socket<ServerToClientEvents, object> = io(
  "https://linhtinh.vidieu.net/"
);
const Monitor = () => {
  socket.on("hit", (bank: string) => {
   console.log(bank, "hihi");
  });
  return (
    <div>

    </div>
  );
};

export default Monitor;
