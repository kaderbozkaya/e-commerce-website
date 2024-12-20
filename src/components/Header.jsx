import React, { useContext, useState } from "react";
import logo from "../assets/logo.png";
import { IoIosSearch } from "react-icons/io";
import { IoPersonOutline } from "react-icons/io5";
import { SlBasket } from "react-icons/sl";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

export default function Header({ setSearchTerm }) {
  const { cartCount } = useContext(CartContext);
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [localSearchTerm, setLocalSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    setLocalSearchTerm(searchValue);
    setSearchTerm(searchValue); // Arama terimini ana bileşene ilet
  };

  return (
    <header className="text-gray-600 shadow-lg w-full flex max-sm:text-lg max-sm:w-[430px]">
      <div className="container mx-auto flex flex-wrap p-5 flex-col  items-center w-full max-sm:w-[500px] md:flex-row">
        <Link to={"/"}>
          <img src={logo} alt="logo" className="w-28 max-sm:w-16 p-1" />
        </Link>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-between ">
          <input
            type="text"
            value={localSearchTerm}
            placeholder="Search..."
            onChange={handleSearchChange}
            className="relative w-[600px] mb-1  p-2 rounded-3xl outline-none border border-orange-500 max-sm:w-[300px] m-auto md:w-[300px] lg:w-[600px] "
          />
          <IoIosSearch className="absolute text-2xl text-[#fba702] cursor-pointer ml-[570px] max-sm:ml-[310px] max-sm:mb-10 md:ml-[270px] lg:ml-[570px]" />
          <div className="flex max-md:flex-col max-md:mx-auto max-sm:flex-row ml-5">
            {isAuthenticated ? (
              <button
                onClick={logout}
                className="flex text-xl p-2 items-center group hover:text-[#fba702]"
              >
                <IoPersonOutline className="text-2xl" />
                Logout
              </button>
            ) : (
              <Link
                to={"/signin"}
                href=""
                className="flex text-xl p-2 items-center group hover:text-[#fba702] "
              >
                <IoPersonOutline className="text-2xl " />
                Signin
              </Link>
            )}
            <Link
              to={"/cart"}
              className="flex text-xl p-2 items-center group hover:text-[#fba702] "
            >
              <SlBasket className="text-2xl" />
              Cart ({cartCount}) {/* sepetteki ürün sayısını gösteriyor */}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
