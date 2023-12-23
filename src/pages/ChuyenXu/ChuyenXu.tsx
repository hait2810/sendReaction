// import axios from "axios";
import { Button, Modal, Tabs, TabsProps } from "antd";
import axios from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
interface Inputs {
  account: string;
  coin: number;
  transferAll: boolean;
  user?: string;
  pass?: string;
  accN: string;
}
const formatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});
const ChuyenXu = () => {
  const [loading, setLoading] = useState(false);
  const [xuSuccess, setXuSeccess] = useState(0);
  const [success, setSuccess] = useState<string[]>([]);
  const [error, setError] = useState<string[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    setLoading(true);
    const tdsacc = data.account.replace(/ /g, "").split("\n");
    const axiosRequests = tdsacc.map(async (element) => {
      const account = element.split("|");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { account: hi, ...rest } = data;
      rest.user = account[0];
      rest.pass = account[1];

      try {
        const { data: response } = await axios.post(
          "https://page.vidieu.net/api/changecoins",
          rest
        );

        if (response.code === 200) {
          setXuSeccess((old) => old + parseInt(response.coin));
          return `Tài khoản ${rest.user} chuyển thành công ${response.coin} xu`;
        } else {
          return `Tài khoản ${rest.user} chuyển thất bại`;
        }
      } catch (error) {
        return `Tài khoản ${rest.user} chuyển thất bại`;
      }
    });

    try {
      const results = await Promise.all(axiosRequests);
      const successResults = results.filter((result) =>
        result.includes("thành công")
      );
      const errorResults = results.filter((result) =>
        result.includes("thất bại")
      );

      setSuccess([...success, ...successResults]);
      setError([...error, ...errorResults]);
    } catch (error) {
      console.error("Lỗi khi thực hiện các lời gọi axios");
    }
    setLoading(false);
  };
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Chuyển thành công",
      children: success.map((item, index) => <p key={index}>{item}</p>),
    },
    {
      key: "2",
      label: "Chuyển không thành công",
      children: error.map((item, index) => <p key={index}>{item}</p>),
    },
  ];
  return (
    <div className="px-2">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full mb-4">
          <div>
            <label
              htmlFor="last_name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Danh sách acc Tds ( định dạng user|pass, mỗi acc 1 dòng )
            </label>
            <textarea
              {...register("account", {
                required: "Trường này không được để trống",
              })}
              rows={8}
              placeholder="Nhập list acc"
              className="border rounded-lg border-gray-300 w-full px-2 text-sm outline-none text-gray-900 bg-white dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
            ></textarea>
            {errors.account && (
              <span className="text-sm text-red-500">
                Trường này không được để trống !!!
              </span>
            )}
          </div>
          <div>
            <label
              htmlFor="last_name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Số xu cần chuyển
            </label>
            <input
              type="number"
              {...register("coin")}
              className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              defaultValue={1000000}
            />
          </div>
          <div className="flex items-center my-4">
            <input
              id="default-checkbox"
              type="checkbox"
              {...register("transferAll")}
              value=""
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="default-checkbox"
              className="ms-2 text-lg font-medium text-orange-800 dark:text-gray-300"
            >
              Tích nếu muốn chuyển hết xu
            </label>
          </div>
          <div>
            <label
              htmlFor="last_name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Tài khoản nhận xu
            </label>
            <input
              type="text"
              {...register("accN")}
              className="bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Tài khoản nhận xu"
            />
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
            <Button
              className="!bg-neutral-500"
              type="primary"
              onClick={showModal}
            >
              Bấm vào đây để xem thông tin!!!
            </Button>
          </div>
        </div>
      </form>
      <div className="modal">
        <Modal
          title="Thông tin"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Tabs defaultActiveKey="1" items={items} />
        </Modal>
      </div>
      <div>Xu chuyển thành công: {formatter.format(xuSuccess)}</div>
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
export default ChuyenXu;
