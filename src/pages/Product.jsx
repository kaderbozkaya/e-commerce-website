import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SlBasket } from "react-icons/sl";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartContext } from "../context/CartContext";
import { ProductContext } from "../context/Productscont";

export default function Product() {
  const { id } = useParams(); //urlden gelen ürünün idsini alır
  const { products } = useContext(ProductContext);
  const [product, setProduct] = useState({}); //ürünleri saklamak için state
  const [isAdded, setIsAdded] = useState(false);
  const [backG, setBackG] = useState("#8d39c1");

  const { handleCart } = useContext(CartContext);
  useEffect(() => {
    if (products.length > 0) {
      const selectedProduct = products.find((item) => item.id === parseInt(id));
      if (selectedProduct) {
        setProduct(selectedProduct);
      } else {
        console.error("Product not found");
      }
    }
  }, [id, products]);

  const handleButtonClick = () => {
    handleCart({ ...product, quantity: product.quantity || 1 });
    setTimeout(() => {
      setIsAdded(false);
      setBackG("#8d39c1");
    }, 4000);
    setIsAdded(true);
    setBackG("#fb923c");
  };

  if (!product.id) return <div>Loading...</div>;
  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden">
        <ToastContainer className="mt-40" autoClose="3000" />
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt={product?.title}
              className="lg:w-1/2 w-full lg:h-auto max-h-[600px] h-64 object-contain object-center rounded"
              src={product?.image}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                {product.category}
              </h2>
              <h1 className="text-gray-700 text-3xl title-font font-medium mb-1">
                {product.title}
              </h1>
              <p className="leading-relaxed">{product.description}</p>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">
                  {product.price} TL
                </span>
                <button
                  className="flex m-auto text-white  border-0 py-2 px-6 focus:outline-none  hover:bg-[#9114df] rounded"
                  onClick={handleButtonClick}
                  style={{ backgroundColor: backG }}
                  // disabled={isAdded}
                >
                  {isAdded ? "Added to Cart" : "Add to Cart"}
                  <SlBasket className="text-2xl ml-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
