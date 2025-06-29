import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
interface FormData {
  red_chars?: string;
  black_chars?: string;
  green_chars?: string;
  img_base64?: string;
  name?: string;
}

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
const DataSet = () => {
  const { data, refetch, isFetching } = useQuery({
    queryKey: ["data_set"],
    queryFn: async () =>
      await axios.get("https://data_set.phatnguoigiaothong.net/api/get_img"),
  });
  const { register, handleSubmit, setValue } = useForm<FormData>({
    defaultValues: {
      black_chars: "",
      green_chars: "",
      red_chars: "",
    },
  });

  const onSubmit = async (cac: FormData) => {
    refetch();
    const payload = {
      ...cac,
      img_base64: data?.data?.url,
      name: cac?.name ? cac?.name.replace(/[^a-zA-Z0-9]/g, "") : "noname",
    };
    try {
      await axios.post(
        "https://data_set.phatnguoigiaothong.net/api/create_data_set",
        payload
      );
      toast.success("Thêm thành công", {
        position: "top-center",
      });
      // eslint-disable-next-line no-empty
    } catch (error) {}
    setValue("black_chars", "");
    setValue("green_chars", "");
    setValue("red_chars", "");
  };
  const leader = data?.data?.leaderboard.sort(
    (a: any, b: any) => b.submissions - a.submissions
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
              {/* Image Display Section */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  Hiển thị hình ảnh
                </h2>

                {/* Image Display Area */}
                <div className="w-full h-64 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                  {data?.data?.url && !isFetching ? (
                    <img
                      src={
                        `data:image/png;base64,${data?.data?.url}` ||
                        "/placeholder.svg"
                      }
                      alt="Displayed image"
                      className="max-w-full max-h-full object-contain rounded-lg"
                    />
                  ) : (
                    <div className="text-center text-gray-500">
                      <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
                      <p className="mt-4">Đang tải hình ảnh...</p>
                      <p className="text-sm">Vui lòng chờ trong giây lát</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Form Section */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900">Thông tin</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {/* Field 1 */}
                  <div className="space-y-2">
                    <label
                      htmlFor="field1"
                      className="block text-sm font-medium  text-black"
                    >
                      Tên của mày là gì?
                    </label>
                    <input
                      id="field1"
                      type="text"
                      {...register("name")}
                      placeholder="Nhập tên mày vào đây"
                      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors `}
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="field1"
                      className="block text-sm font-medium  text-black"
                    >
                      Chữ màu đen
                    </label>
                    <input
                      id="field1"
                      type="text"
                      {...register("black_chars")}
                      placeholder="Nhập chữ màu đen"
                      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors `}
                    />
                  </div>

                  {/* Field 2 */}
                  <div className="space-y-2">
                    <label
                      htmlFor="field1"
                      className="block !text-red-500 text-sm font-medium "
                    >
                      Chữ màu đỏ
                    </label>
                    <input
                      id="field1"
                      type="text"
                      {...register("red_chars")}
                      placeholder="Nhập chữ màu đỏ"
                      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors `}
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="field1"
                      className="block text-[#00FF00] text-sm font-medium "
                    >
                      Chữ màu xanh
                    </label>
                    <input
                      id="field1"
                      type="text"
                      {...register("green_chars")}
                      placeholder="Nhập chữ màu xanh"
                      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors `}
                    />
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Gửi thông tin
                    </button>
                  </div>
                </form>
                <p className="text-sm text-red-300">
                  Đang có {data?.data?.total || 0} dữ liệu được thêm
                </p>
                <p className="text-sm text-red-300">
                  Còn lại {data?.data?.con_lai || 0} ảnh (ảnh được thêm tự động
                  sau 2s)
                </p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  🏆 Bảng xếp hạng
                </h2>
                <div className="text-sm text-gray-500">
                  Cập nhật: {new Date().toLocaleTimeString("vi-VN")}
                </div>
              </div>

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
                      <div className="text-xs text-gray-500">lần</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DataSet;
