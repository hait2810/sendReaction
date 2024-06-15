import { Button } from "antd";
import axios from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
interface Inputs {
  app: number;
  cookie: string;
}
const GetToken = () => {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    setLoading(true);
    const cookie = data.cookie.replace(/ /g, "").split("\n");
    cookie.map(async (element) => {
      try {
        const { data: response } = await axios.get(
          `http://api.vidieu.net/api/gettoken.php`,  {
            params: {app: data.app, cookie: element},
            headers: {
              'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7', 
              'Content-Type': 'application/json',
              'Origin': 'http://api.vidieu.net/',
              'mode': 'cors',
              'Access-Control-Allow-Origin': '*',
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36'
            }
          }
        );
        console.log(response);

        if (response.status === "success") {
          const oldToken = token;
          oldToken.push(response.msg);
          setToken(oldToken);
        }
      } catch (error) {
        return `Get token thất bại`;
      }
    });
    setLoading(false);
  };

  return (
    <div className="px-2">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full mb-4">
          <div>
            <label
              htmlFor="last_name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Danh sách cookie, mỗi cookie 1 dòng
            </label>
            <textarea
              {...register("cookie", {
                required: "Trường này không được để trống",
              })}
              rows={8}
              placeholder="Nhập list acc"
              className="border rounded-lg border-gray-300 w-full px-2 text-sm outline-none text-gray-900 bg-white dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
            ></textarea>
            {errors.cookie && (
              <span className="text-sm text-red-500">
                Trường này không được để trống !!!
              </span>
            )}
          </div>
          <div>
            <label
              htmlFor="large"
              className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Chọn loại token
            </label>
            <select
              {...register("app", {
                required: "Trường này không được để trống",
              })}
              id="large"
              className="block w-full px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected>Chọn loại token</option>
              <option value="05">EAADV6</option>
              <option value="09">IPHONE</option>
              <option value="01">ANDROID</option>
            </select>
          </div>

          <div className="flex items-center gap-4 py-2 border-t dark:border-gray-600">
            <Button disabled={loading} type="primary" htmlType="submit">
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
            </Button>
          </div>
        </div>
      </form>
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
export default GetToken;
