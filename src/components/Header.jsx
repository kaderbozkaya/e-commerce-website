import React from "react";
import logo from "../assets/logo.png";
import { IoIosSearch } from "react-icons/io";
import { IoPersonOutline } from "react-icons/io5";

import { SlBasket } from "react-icons/sl";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="text-gray-600 shadow-lg w-full">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link to={"/"}>
          <img src={logo} alt="logo" className="w-28 p-1" />
        </Link>
        <nav className="md:ml-auto md:mr-auto flex  flex-wrap items-center text-base justify-between">
          <input
            type="text"
            placeholder="Search..."
            className="relative m-2 p-2 rounded-2xl outline-none xl:w-[800px] text-xl border mx-auto lg:w-[600px]"
          />
          <IoIosSearch className="absolute xl:m-[760px] text-2xl text-[#fba702] cursor-pointer max-md:mb-[80px] max-md:ml-[290px] md:ml-[230px] lg:ml-[560px]" />
          <div className="flex max-md:flex-col max-md:mx-auto ">
            <a
              href=""
              className="flex text-xl p-2 items-center group hover:text-[#fba702] "
            >
              Giriş Yap
              <IoPersonOutline className="text-2xl" />
            </a>
            <a
              href=""
              className=" flex text-xl p-2 items-center group hover:text-[#fba702] "
            >
              Sepetim
              <SlBasket className="text-2xl" />
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
