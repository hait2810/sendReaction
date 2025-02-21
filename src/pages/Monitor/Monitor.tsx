import { useState } from "react";
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
  const [hit, setHit] = useState<string[]>([]);
  const [b52, setB52] = useState<string[]>([]);
  const [sun, setSun] = useState<string[]>([]);
  const [rik, setRik] = useState<string[]>([]);
  socket.on("hit", (bank: string) => {
    if (hit.length > 1000) {
      setHit([bank]);
    } else {
      setHit([bank, ...hit]);
    }
  });
  socket.on("rik", (bank: string) => {
    if (rik.length > 1000) {
      setRik([bank]);
    } else {
      setRik([bank, ...rik]);
    }
  });
  socket.on("sun", (bank: string) => {
    if (sun.length > 1000) {
      setSun([bank]);
    } else {
      setSun([bank, ...sun]);
    }
  });
  socket.on("b52", (bank: string) => {
    if (b52.length > 1000) {
      setB52([bank]);
    } else {
      setB52([bank, ...b52]);
    }
  });
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="bg-gray-200 shadow-md p-2 rounded-md">
        <h2 className="text-red-500 font-bold">Monitor HIT</h2>
        {hit?.map((item, index) => {
          return (
            <p key={index} className="text-blue-300">
              {item}
            </p>
          );
        })}
      </div>
      <div className="bg-gray-200 shadow-md p-2 rounded-md">
        <h2 className="text-red-500 font-bold">Monitor RIK</h2>
        {rik?.map((item, index) => {
          return (
            <p key={index} className="text-blue-300">
              {item}
            </p>
          );
        })}
      </div>
      <div className="bg-gray-200 shadow-md p-2 rounded-md">
        <h2 className="text-red-500 font-bold">Monitor B52</h2>
        {b52?.map((item, index) => {
          return (
            <p key={index} className="text-blue-300">
              {item}
            </p>
          );
        })}
      </div>
      <div className="bg-gray-200 shadow-md p-2 rounded-md">
        <h2 className="text-red-500 font-bold">Monitor SUN</h2>
        {sun?.map((item, index) => {
          return (
            <p key={index} className="text-blue-300">
              {item}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default Monitor;
