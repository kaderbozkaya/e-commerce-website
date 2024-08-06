import React from "react";
import logo from "../assets/logo.png";
import { IoIosSearch } from "react-icons/io";
import { IoPersonOutline } from "react-icons/io5";

import { SlBasket } from "react-icons/sl";

export default function Header() {
  return (
    <header className="text-gray-600 shadow-lg">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a href="">
          <img src={logo} alt="logo" className="w-28 p-1" />
        </a>
        <nav className="md:ml-auto md:mr-auto flex  flex-wrap items-center text-base justify-between ">
          <input
            type="text"
            placeholder="Search..."
            className="relative m-2 p-2 rounded-2xl outline-none w-[800px] text-xl border"
          />
          <IoIosSearch className="absolute m-[760px] text-2xl text-[#fba702] cursor-pointer " />
          <a
            href=""
            className="flex text-xl p-2 items-center group hover:text-[#fba702] ml-28"
          >
            Giriş Yap
            <IoPersonOutline className="text-2xl" />
          </a>
          <a
            href=""
            className=" flex text-xl p-2 items-center group hover:text-[#fba702] ml-28"
          >
            Sepetim
            <SlBasket className="text-2xl" />
          </a>
        </nav>
      </div>
    </header>
    // <div className="w-full h-24">
    //   <nav className="flex justify-between bg-[#a09f9d]  items- text-gray-600 ">
    //     <div>
    //       <img src={logo} alt="logo" className="w-28 p-1" />
    //     </div>

    //     <div className="flex items-center justify-between p-2 m-2">
    //       <input
    //         type="text"
    //         placeholder="Search..."
    //         className="relative m-2 p-2 rounded-2xl outline-none w-80 text-xl"
    //       />
    //       <IoIosSearch className="absolute m-72 text-2xl text-red-600 cursor-pointer" />
    //       <a
    //         href=""
    //         className="flex text-xl p-2 items-center group hover:text-red-600"
    //       >
    //         Giriş Yap
    //         <IoPersonOutline className="text-2xl" />
    //       </a>
    //       <a
    //         href=""
    //         className=" flex text-xl p-2 items-center group hover:text-red-600"
    //       >
    //         Sepetim
    //         <SlBasket className="text-2xl" />
    //       </a>
    //     </div>
    //   </nav>
    // </div>
  );
}
