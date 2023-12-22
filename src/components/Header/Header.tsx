import { Link, Outlet } from "react-router-dom";
const Header = () => {
  return (
    <div>
      <header className="shadow-lg py-4 px-4 sm:px-10 bg-white my-5 font-[sans-serif] min-h-[70px] relative">
        <div className="flex flex-wrap items-center justify-between gap-5">
          <a
            href="javascript:void(0)"
            className="lg:absolute max-lg:top-4 max-lg:left-10 max-sm:left-4 lg:top-2/4 lg:left-2/4 lg:-translate-x-1/2 lg:-translate-y-1/2"
          >
            <img
              src="https://readymadeui.com/readymadeui.svg"
              alt="logo"
              className="w-36"
            />
          </a>
        
          <ul
            id="collapseMenu"
            className="lg:!flex lg:space-x-5 max-lg:space-y-2 max-lg:hidden max-lg:py-4 max-lg:w-full"
          >
            <li className="max-lg:border-b max-lg:bg-[#007bff] max-lg:py-2 px-3 max-lg:rounded">
              <Link
                to="/"
                className="lg:hover:text-[#007bff] text-[#007bff] max-lg:text-white block font-semibold text-[15px]"
              >
                Home
              </Link>
            </li>
            <li className="max-lg:border-b max-lg:py-2 px-3 max-lg:rounded">
              <Link
                to="https://banlikeviet.net/"
                className="lg:hover:text-[#007bff] text-[#333] block font-semibold text-[15px]"
              >
                Service FB
              </Link>
            </li>
            <li className="max-lg:border-b max-lg:py-2 px-3 max-lg:rounded">
              <Link
                to="chuyenxu"
                className="lg:hover:text-[#007bff] text-[#333] block font-semibold text-[15px]"
              >
               Tools chuyển xu tds
              </Link>
            </li>
          </ul>
        </div>
      </header>
      <Outlet />
    </div>
  );
};

export default Header;
