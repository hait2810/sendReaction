import { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";

interface ServerToClientEvents {
  hit: (bank: string) => void;
  b52: (bank: string) => void;
  sun: (bank: string) => void;
  rik: (bank: string) => void;
  five88: (bank: string) => void;
}

interface MonitorData {
  data: string[];
  color: string;
  title: string;
}

const socket: Socket<ServerToClientEvents, object> = io(
  "https://linhtinh.vidieu.net/"
);

const Monitor = () => {
  const [hit, setHit] = useState<string[]>([]);
  const [b52, setB52] = useState<string[]>([]);
  const [sun, setSun] = useState<string[]>([]);
  const [rik, setRik] = useState<string[]>([]);
  const [five, setFive] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<string>("all");

  useEffect(() => {
    const handleHit = (bank: string) => {
      setHit(prev => {
        if (prev.length > 1000) return [bank];
        return [bank, ...prev];
      });
    };

    const handleRik = (bank: string) => {
      setRik(prev => {
        if (prev.length > 1000) return [bank];
        return [bank, ...prev];
      });
    };

    const handleSun = (bank: string) => {
      setSun(prev => {
        if (prev.length > 1000) return [bank];
        return [bank, ...prev];
      });
    };

    const handleB52 = (bank: string) => {
      setB52(prev => {
        if (prev.length > 1000) return [bank];
        return [bank, ...prev];
      });
    };
    const handleFive = (bank: string) => {
      setFive(prev => {
        if (prev.length > 1000) return [bank];
        return [bank, ...prev];
      });
    };

    socket.on("hit", handleHit);
    socket.on("rik", handleRik);
    socket.on("sun", handleSun);
    socket.on("b52", handleB52);
    socket.on("five88", handleFive);

    return () => {
      socket.off("hit", handleHit);
      socket.off("rik", handleRik);
      socket.off("sun", handleSun);
      socket.off("b52", handleB52);
      socket.off("five88", handleFive);
    };
  }, []);

  const getTotalCount = () => hit.length + b52.length + sun.length + rik.length + five.length;

  const getFilteredData = (): MonitorData[] => {
    const allData: MonitorData[] = [
      { data: hit, color: "red", title: "HIT" },
      { data: rik, color: "orange", title: "RIK" },
      { data: b52, color: "amber", title: "B52" },
      { data: sun, color: "yellow", title: "SUN" },
      { data: five, color: "blue", title: "FIVE" }
    ];

    if (activeTab === "all") {
      return allData;
    }

    return allData.filter(item => item.title.toLowerCase() === activeTab);
  };

  const renderMonitorCard = ({ data, color, title }: MonitorData) => {
    return (
      <div className="backdrop-blur-lg bg-white/10 rounded-xl shadow-2xl p-4 transform hover:scale-105 transition-all duration-300 border border-white/20">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white flex items-center">
            <span className={`w-3 h-3 bg-${color}-500 rounded-full mr-2 animate-pulse`}></span>
            Monitor {title}
          </h2>
          <span className="text-sm text-gray-400">{data.length}</span>
        </div>
        <div className="space-y-2 max-h-[500px] overflow-y-auto custom-scrollbar">
          {data?.map((item, index) => (
            <div
              key={index}
              className={`group bg-gradient-to-r from-${color}-900/50 to-${color}-800/50 p-3 rounded-lg border border-${color}-500/20 hover:border-${color}-500/50 transition-all duration-300`}
            >
              <p className="text-gray-200 group-hover:text-white transition-colors duration-300">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-2">
            Monitor Dashboard
          </h1>
          <p className="text-gray-400">Total Transactions: {getTotalCount()}</p>
        </div>

        <div className="flex justify-center space-x-4 mb-8">
          {["all", "hit", "rik", "b52", "sun",'five'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                activeTab === tab
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {getFilteredData().map((item) => renderMonitorCard(item))}
        </div>
      </div>
    </div>
  );
};

export default Monitor;
