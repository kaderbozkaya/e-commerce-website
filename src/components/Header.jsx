import React from "react";
import logo from "../assets/pngwing.com.png";
import { IoIosSearch } from "react-icons/io";
import { IoPersonOutline } from "react-icons/io5";

import { SlBasket } from "react-icons/sl";

export default function Header() {
  return (
    <div>
      <nav className="flex justify-between bg-[#ffc530]  h-20 items- text-gray-600">
        <div>
          <img src={logo} alt="logo" className="w-14 m-3 flex" />
        </div>

        <div className="flex items-center justify-between p-2 m-2">
          <input
            type="text"
            placeholder="Search..."
            className="relative m-2 p-2 rounded-2xl outline-none w-80 text-xl"
          />
          <IoIosSearch className="absolute m-72 text-2xl text-red-600 cursor-pointer" />
          <a
            href=""
            className="flex text-xl p-2 items-center group hover:text-red-600"
          >
            Giriş Yap
            <IoPersonOutline className="text-2xl" />
          </a>
          <a
            href=""
            className=" flex text-xl p-2 items-center group hover:text-red-600"
          >
            Sepetim
            <SlBasket className="text-2xl" />
          </a>
        </div>
      </nav>
    </div>
  );
}
