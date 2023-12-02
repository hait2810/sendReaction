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
    console.log(check);
    
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
  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    const token = data.listToken.split("\n");
    token.forEach(async (element) => {
      const r = data.reaction == "RANDOM" ? getRandomReaction() : data.reaction;
      const { data: resp } = await axios.get(
        `http://page.vidieu.net/api/sendReaction?id=${id}&token=${element}&reaction=${r}`,
        {}
      );
      resp.code == 200
        ? setSuccess((old) => (old = old + 1))
        : setError((old) => (old = old + 1));
    });
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
              <option selected>Chọn trong danh sách</option>
              <option value="LIKE">LIKE</option>
              <option value="LOVE">LOVE</option>
              <option value="WOW">WOW</option>
              <option value="HAHA">HAHA</option>
              <option value="SAD">SAD</option>
              <option value="RANDOM">RANDOM</option>
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
              type="submit"
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
            >
              Gửi đi
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
