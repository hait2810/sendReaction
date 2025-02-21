import { io, Socket } from "socket.io-client";

interface ServerToClientEvents {
  hit: (bank: string) => void;
  b52: (bank: string) => void;
  sun: (bank: string) => void;
  rik: (bank: string) => void;
}

const socket: Socket<ServerToClientEvents, object> = io(
  "https://linhtinh.vidieu.net/"
);
const Monitor = () => {
  socket.on("hit", (bank: string) => {
    console.log(bank, "hit");
  });
  socket.on("rik", (bank: string) => {
    console.log(bank, "rik");
  });
  socket.on("sun", (bank: string) => {
    console.log(bank, "sun");
  });
  socket.on("b52", (bank: string) => {
    console.log(bank, "b52");
  });
  return <div></div>;
};

export default Monitor;
