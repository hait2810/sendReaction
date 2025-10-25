import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
interface FormData {
  full_text?: string;
  img_base64?: string;
  key?: string;
}

const DataSetHit = () => {
  const { data, refetch, isFetching } = useQuery({
    queryKey: ["data_set_sun"],
    queryFn: async () =>
      await axios.get(
        "https://data_set.phatnguoigiaothong.net/api/get_img_hit"
      ),
    retry: 3, // thử lại tối đa 3 lần
    retryDelay: 1500, // mỗi lần lỗi, chờ 1.5s rồi retry
  });
  const { register, handleSubmit, setValue } = useForm<FormData>({
    defaultValues: {
      full_text: "",
    },
  });
  useEffect(() => {
    setValue("full_text", data?.data?.full_text);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.data?.full_text, data?.data?.colors]);

  const onSubmit = async (cac: FormData) => {
    const payload = {
      ...cac,
      img_base64: data?.data?.url,
    };
    setValue("full_text", "");
    try {
      await axios.post(
        "https://data_set.phatnguoigiaothong.net/api/create_data_hit",
        payload
      );
      toast.success("Thêm thành công", {
        position: "top-center",
      });
      // eslint-disable-next-line no-empty
    } catch (error: any) {
      toast.error(error?.response?.data?.error || error?.response?.data, {
        position: "top-center",
      });
    }
    refetch();
  };

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
                      Key
                    </label>
                    <input
                      id="field1"
                      type="text"
                      {...register("key")}
                      placeholder="Key"
                      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors `}
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="field1"
                      className="block text-sm font-medium  text-black"
                    >
                      Nhập text
                    </label>
                    <input
                      id="field1"
                      type="text"
                      {...register("full_text")}
                      placeholder="Nhập text"
                      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors `}
                    />
                  </div>
                  {/* Submit Buttons */}
                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Xác nhận
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DataSetHit;
