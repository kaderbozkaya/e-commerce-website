import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { CiTrash } from "react-icons/ci";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartContext } from "../context/CartContext";

export default function Cart() {
  const { updateCartCount } = useContext(CartContext); //cartcontext'ten güncellenmiş sepet sayısına erişim
  const [carts, setCarts] = useState(
    JSON.parse(localStorage.getItem("cart")) || [] //sepetteki ürünleri localden alıp state ekliyoruz
  );

  const [total, setTotal] = useState(0); //toplam ürünü tutması için state
  const shippingCost = 40; //sabit kargo ücreti

  //sepet toplamını ger güncellemede hesaplamak için
  useEffect(() => {
    const total = carts.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);
    setTotal(total);
  }, [carts]);

  //ürün miktarını arttırmak için
  const handleInc = (id) => {
    const updatedCart = carts.map((item) => {
      if (item.id === id) return { ...item, quantity: item.quantity + 1 };
      return item;
    });
    setCarts(updatedCart);
    updateCartCount(updatedCart);
  };
  //ürün miktarını azaltmak için
  const handleDec = (id) => {
    const updatedCart = carts.map((item) => {
      if (item.id === id && item.quantity > 1)
        return { ...item, quantity: item.quantity - 1 };
      return item;
    });
    setCarts(updatedCart);
    updateCartCount(updatedCart);
  };
  //ürünü sepetten kaldırmak için
  const removeProduct = (id) => {
    const updatedCart = carts.filter((item) => item.id !== id);
    setCarts(updatedCart);
    updateCartCount(updatedCart);
    toast.error("Product deleted!");
  };
  //eğer sepet boşsa
  if (!carts.length) {
    return (
      <div className="text-2xl border mt-8 p-10 border-orange- flex justify-between">
        Cart is Empty{" "}
        <Link
          to={"/"}
          className="bg-[#9114df] hover:bg-[#8d39c1]  text-white inline-flex p-2 rounded"
        >
          Start Shopping
        </Link>
      </div>
    );
  }
  return (
    <div className="container mx-auto mt-10">
      <ToastContainer />
      <div className="flex shadow-md my-10">
        <div className="w-3/4 bg-white px-10 py-10">
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-2xl text-orange-400">
              Shopping Cart
            </h1>
            <h2 className="font-semibold text-2xl text-orange-400">
              {carts?.length} Products
            </h2>
          </div>
          <div className="flex mt-10 mb-5">
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
              Details
            </h3>
            <h3 className="font-semibold text-gray-600 text-center text-xs uppercase w-1/5">
              Quantity
            </h3>

            <h3 className="font-semibold text-gray-600 text-center text-xs uppercase w-1/5">
              Total
            </h3>
          </div>
          {carts?.map((cart) => {
            return (
              <>
                <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                  <div className="flex w-2/5">
                    <div className="w-20">
                      <img
                        src={cart?.image}
                        alt={cart?.title}
                        className="h-24"
                      />
                    </div>
                    <div
                      className="flex flex-col justify-between ml-4
              flex-grow"
                    >
                      <span className="font-bold text-sm">{cart?.title}</span>
                      <span className="text-[#8d39c1] text-xs">
                        {cart?.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-center w-1/5">
                    <FaMinus
                      className="cursor-pointer"
                      onClick={() => handleDec(cart?.id)}
                    />
                    <input
                      type="text"
                      className="mx-2 border text-center w-8"
                      value={cart?.quantity}
                    />
                    <FaPlus
                      className="cursor-pointer"
                      onClick={() => handleInc(cart?.id)}
                    />
                  </div>

                  <span className="text-center w-1/5 font-semibold text-sm">
                    {cart?.price * cart?.quantity}
                  </span>
                  <div
                    className="flex font-semibold hover:text-red-500 text-gray-500  cursor-pointer text-lg items-center justify-center"
                    onClick={() => removeProduct(cart?.id)}
                  >
                    <CiTrash className="mr-1 text-red-600 " />
                    Delete
                  </div>
                </div>
              </>
            );
          })}
          <Link
            to={"/"}
            className="flex font-semibold text-[#9114df] text-sm mt-10"
          >
            Continue Shopping
          </Link>
        </div>
        <div id="summary" className="w-1/4 px-8 py-10">
          <h1 className="font-semibold text-2xl border-b pb-8 text-orange-500">
            Order Summary
          </h1>
          <div className="flex justify-between mt-10 mb-5 flex-col">
            <div className="flex font-semibold py-6 text-sm uppercase">
              <span className="mr-3">Product Total</span>
              <span>{total.toFixed(2)} TL</span>
            </div>
            <div className="flex font-semibold py-6 text-sm uppercase">
              <span className="mr-3">Spping Cost</span>
              <span>{shippingCost} TL</span>
            </div>
          </div>
          <div className="border-t mt-8">
            <div className="flex font-semibold justify-between py-6 text-sm uppercase">
              <span>Total cost</span>
              <span>{(total + shippingCost).toFixed(2)} TL</span>
            </div>
            <div>
              <label className="font-semibold inline-block mb-3 uppercase ">
                Enter discount code
              </label>
              <input
                type="text"
                name=""
                id="promo"
                placeholder="Enter your code"
                className="p-2 text-sm w-full border border-orange-300 mb-2 rounded-md"
              />
              <button className="bg-orange-500 hover:bg-orange-600 px-5 py-2 mb-3 text-sm text-white uppercase rounded">
                Apply
              </button>
            </div>
            <button className="bg-[#8d39c1] font-semibold hover:bg-[#9114df]  py-3 text-sm text-white uppercase w-full rounded">
              Confirm Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
