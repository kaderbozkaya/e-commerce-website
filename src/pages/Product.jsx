import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SlBasket } from "react-icons/sl";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartContext } from "../context/CartContext";
import { ProductContext } from "../context/Productscont";
import { BsCartCheckFill } from "react-icons/bs";

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
    <section className="text-gray-600 max-sm:text-sm flex items-center justify-center ">
      <ToastContainer className="mt-40" autoClose="3000" />
      <div className="container px-5 py-24 flex items-center justify-center ml-16">
        <div className="lg:w-4/5 flex flex-wrap bg-white w-full m-auto">
          <img
            alt={product?.title}
            className="lg:w-1/2 w-full lg:h-auto max-h-[600px] h-64 object-contain object-center rounded"
            src={product?.image}
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0 flex items-center justify-center m-auto flex-col">
            <h2 className="text-sm text-purple-600 tracking-widest">
              {product.category}
            </h2>
            <h1 className="text-orange-600 text-3xl title-font font-medium mb-1 max-sm:text-lg">
              {product.title}
            </h1>
            <p className="leading-relaxed">{product.description}</p>
            <div className="flex flex-col m-auto items-center justify-center">
              <span className="title-font font-medium text-2xl text-gray-900 max-sm:text-lg mb-3">
                {product.price} TL
              </span>
              <button
                className="flex m-auto text-white  border-0 py-2 px-6 focus:outline-none  hover:bg-[#9114df] rounded"
                onClick={handleButtonClick}
                style={{ backgroundColor: backG }}
                // disabled={isAdded}
              >
                {isAdded ? "Added to Cart" : "Add to Cart"}
                {isAdded ? (
                  <BsCartCheckFill className="text-2xl ml-3" />
                ) : (
                  <SlBasket className="text-2xl ml-3" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
