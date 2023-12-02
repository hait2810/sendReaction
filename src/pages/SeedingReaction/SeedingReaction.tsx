import axios from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Loader from "../../components/Loader";

const reactionType = {
  LOVE: "LOVE",
  LIKE: "LIKE",
  WOW: "WOW",
  HAHA: "HAHA",
  SAD: "SAD",
  RANDOM: "RANDOM",
};
interface Inputs {
  link: string;
  reaction: string;
  listToken: string;
}
function getRandomReaction() {
  const reactionValues = Object.values(reactionType);
  const randomIndex = Math.floor(Math.random() * reactionValues.length);
  return reactionValues[randomIndex];
}

function isNumeric(str: string | number): boolean {
  if (typeof str === "number") {
    return !isNaN(str);
  } else if (typeof str === "string") {
    return !isNaN(parseFloat(str));
  } else {
    return false; // Return false for other types
  }
}
const SeedingReaction = () => {
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<number>(0);
  const [error, setError] = useState<number>(0);
  const { register, handleSubmit } = useForm<Inputs>();
  const onGetID = async (link: string) => {
    const check = isNumeric(link);
    setLoading(true);
    if (!check) {
      try {
        const { data } = await axios.get(
          "http://page.vidieu.net/api/getid?link=" + link
        );
        setId(data.data);
      } catch (error) {
        setId("");
      }
    } else {
      setId(link);
    }
    setLoading(false);
  };

  async function sendReactionsWithDelay(
    token: string[],
    id: string,
    data: Inputs
  ) {
    for (const element of token) {
      const r = data.reaction == "RANDOM" ? getRandomReaction() : data.reaction;
      try {
        const { data: resp } = await axios.get(
          `https://page.vidieu.net/api/sendReaction?id=${id}&token=${element}&reaction=${r}`,
          {}
        );
        if (resp.code === 200) {
          setSuccess((old) => old + 1);
        } else {
          setError((old) => old + 1);
        }
      } catch (error) {
        setError((old) => old + 1);
      }

      // Introduce a 2-second delay before the next iteration
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }

  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    setError(0);
    setSuccess(0);
    setLoading(true);
    const token = data.listToken.split("\n");
    await sendReactionsWithDelay(token, id, data);
    setLoading(false);
  };
  return (
    <div>
      {loading && <Loader />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
          <div className=" bg-white rounded-t-lg dark:bg-gray-800">
            <label htmlFor="comment" className="sr-only">
              Your comment
            </label>
            <textarea
              {...register("listToken")}
              rows={4}
              className="rounded-lg  bg-gray-50 border border-gray-300 w-full p-2.5 text-sm text-gray-900  dark:bg-gray-800  dark:text-white dark:placeholder-gray-400"
              placeholder="Nhập list token"
              required
            ></textarea>
            <label
              htmlFor="countries"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Chọn cảm xúc
            </label>
            <select
              {...register("reaction")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="RANDOM">RANDOM</option>
              <option value="LIKE">LIKE</option>
              <option value="LOVE">LOVE</option>
              <option value="WOW">WOW</option>
              <option value="HAHA">HAHA</option>
              <option value="SAD">SAD</option>
            </select>
            <div>
              <label
                htmlFor="last_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Link bài viết
              </label>
              <input
                type="text"
                {...register("link")}
                onBlur={(e) => onGetID(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Nhập link or id"
              />
              {id && <div className="py-2">Id bài viết: {id}</div>}
            </div>
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
      <div className="flex">
        {success > 0 || error > 0 ? (
          <>
            <div className="flex flex-col gap-y-2">
              <p>Success</p>
              <p className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-10 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">
                {success}
              </p>
            </div>
            <div className="flex flex-col gap-y-2">
              <p>Error</p>
              <p className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-10 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                {error}
              </p>
            </div>
          </>
        ) : (
          ""
        )}
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

export default SeedingReaction;
