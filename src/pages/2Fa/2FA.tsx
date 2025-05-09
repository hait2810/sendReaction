import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
interface Inputs {
  list2fa: string;
}

const ClickCopy = ({ ma }: { ma: string }) => {
  const token = ma.split("|")[1];
  const { data } = useQuery({
    queryKey: ["get-2fa", token],
    queryFn: () =>
      axios.get(
        `https://phat-nguoi.vidieu.net/api/2fa/get-token?secret=${token}`
      ),
    refetchInterval: 3000,
  });

  const handleCopyClick = async () => {
    try {
      // Sử dụng API clipboard để sao chép văn bản
      await navigator.clipboard.writeText(data?.data?.token);
      toast.success(`Copy thành công mã: ${data?.data?.token}`);
    } catch (err) {
      toast.error("Lỗi");
    }
  };

  return (
    <button
      className="bg-blue-500 rounded-md p-1 text-white flex gap-1 "
      onClick={handleCopyClick}
    >
      {data?.data?.token}
    </button>
  );
};

const TwoFa = () => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm<Inputs>();
  const list2fa = localStorage.getItem("list2fa");
  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    setLoading(true);
    const tokens = data.list2fa.split("\n");
    let sai = false;
    tokens.forEach((item) => {
      if (!item.includes("|")) {
        sai = true;
      }
    });
    if (sai) {
      setLoading(false);
      return toast.error("Mã 2fa sai định dạng");
    }
    const tokensNotExist = tokens.filter(
      (item) => !list2fa?.includes(item.split("|")[1])
    );
    const list2fa2 = list2fa
      ? [...JSON.parse(list2fa), ...(tokensNotExist || [])]
      : tokensNotExist;
    await localStorage.setItem(
      "list2fa",
      JSON.stringify(
        list2fa2.map((item) => item?.replace(/[^0-9a-zA-Z|]/g, ""))
      )
    );
    setLoading(false);
  };

  const onDelete = async (ma: string) => {
    setLoading(true);
    const confirm = window.confirm("Bạn có chắc chắn muốn xoá không?");
    if (confirm) {
      const lists = JSON.parse(list2fa || "").filter(
        (item: string) => item !== ma
      );
      await localStorage.setItem("list2fa", JSON.stringify(lists));
    }
    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
          <div className=" bg-white rounded-t-lg dark:bg-gray-800">
            <label htmlFor="comment" className="sr-only">
              Your comment
            </label>
            <textarea
              {...register("list2fa")}
              rows={4}
              className="rounded-lg  bg-gray-50 border border-gray-300 w-full p-2.5 text-sm text-gray-900  dark:bg-gray-800  dark:text-white dark:placeholder-gray-400"
              placeholder="Nhập list 2fa, mỗi 2fa 1 dòng: định dạng name|2fa"
              required
            ></textarea>
          </div>

          <div className="flex items-center justify-between  py-2 border-t dark:border-gray-600">
            <button
              disabled={loading}
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
            >
              {loading && (
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline mr-3 w-4 h-4 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  ></path>
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  ></path>
                </svg>
              )}
              Xác nhận
            </button>
          </div>
        </div>
      </form>
      <div className="my-4">
        <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
          Danh sách 2fa đã thêm:
        </h2>
        <ul className=" space-y-1 text-gray-500 list-inside dark:text-gray-400">
          {list2fa &&
            JSON.parse(list2fa)?.map((item: string, index: number) => {
              return (
                <li key={index} className="flex items-center gap-1">
                  <p className="p-1 bg-slate-500 rounded-md text-white">
                    {item}
                  </p>
                  <p>==&gt; </p>
                  <p>
                    <ClickCopy ma={item} />
                  </p>
                  <p>==&gt; </p>
                  <button
                    className="bg-red-500 rounded-md p-1 text-white "
                    onClick={() => {
                      onDelete(item);
                    }}
                  >
                    Xoá
                  </button>
                </li>
              );
            })}
        </ul>
      </div>
      <p className="ms-auto text-xs text-gray-500 dark:text-gray-400">
        <a
          href="https://web.facebook.com/abcdefu.abc"
          target="_blank"
          className="text-blue-600 dark:text-blue-500 hover:underline"
        >
          Nguyen Van Hai
        </a>
      </p>
    </div>
  );
};

export default TwoFa;
