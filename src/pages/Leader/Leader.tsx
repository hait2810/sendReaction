import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return "🥇";
    case 2:
      return "🥈";
    case 3:
      return "🥉";
    default:
      return `#${rank}`;
  }
};
const REFRESH_INTERVAL = 30 * 1000;

const Leader = () => {
  const { data, isFetching } = useQuery({
    queryKey: ["data_set"],
    queryFn: async () =>
      await axios.get("https://data_set.phatnguoigiaothong.net/api/get_leader"),
    refetchInterval: REFRESH_INTERVAL,
  });

  const [countdown, setCountdown] = useState(REFRESH_INTERVAL / 1000);

  // Countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => (prev === 1 ? REFRESH_INTERVAL / 1000 : prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const leader =
    data?.data?.leaderboard.sort(
      (a: any, b: any) => b.submissions - a.submissions
    ) || [];
  const total = leader?.reduce(
    (acc: any, cu: any) => (acc += cu.submissions || 0),
    0
  );
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2 mx-auto">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                🏆 Bảng xếp hạng (cập nhật sau {countdown}s)
              </h2>
              <div className="text-sm text-gray-500">
                Cập nhật: {new Date().toLocaleTimeString("vi-VN")}
              </div>
            </div>

            <p>{isFetching && "Đang tải dữ liệu..."}</p>

            <div className="space-y-3">
              {leader?.map((entry: any, index: number) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                    index < 3
                      ? "bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200"
                      : "bg-gray-50 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-lg font-bold min-w-[40px]">
                      {getRankIcon(index + 1)}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {entry.name}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-blue-600">
                      {entry.submissions}
                    </div>
                    <div className="text-xs text-gray-500">điểm</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <p className="text-red-600 mt-4">Tổng {total}</p>
    </div>
  );
};
export default Leader;
