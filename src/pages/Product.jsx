import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SlBasket } from "react-icons/sl";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartContext } from "../context/CartContext";

export default function Product() {
  const { id } = useParams(); //urlden gelen ürünün idsini alır
  const [product, setProduct] = useState({}); //ürünleri saklamak için state
  const { cartCount, updateCartCount } = useContext(CartContext); //CartContext'ten sepet sayısına ve updateCartCount işlevine erişim

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/${id}`
        );
        setProduct(response.data); //alınan veriler state eklenir
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]); //id değişince useEffect yeniden çalışır

  //ürünü sepete eklemek için kodlar

  const handleCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || []; //localstorageden cart verilerini al veya boş dizi oluştur
    const isProductExist = cart.find((item) => item.id === product.id); //ürün sepette mi bilgisini al

    let updatedCart;
    if (isProductExist) {
      updatedCart = cart.map((item) => {
        if (item.id === product.id) {
          //eğer ürün sepette varsa quantity arttır
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });
    } else {
      //ürün sepette yoksa yeni olarak ekle
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart)); //localstoragede sepeti güncelle
    updateCartCount(updatedCart); //sepet sayısı güncelle
    toast.success("Product added to cart!");
  };

  if (!Object.keys(product).length > 0) return <div>Loading...</div>;

  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden">
        <ToastContainer className="mt-40" />
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
                  className="flex ml-auto text-white bg-[#8d39c1] border-0 py-2 px-6 focus:outline-none hover:bg-[#9114df] rounded"
                  onClick={() => handleCart(product)}
                >
                  Add to Cart
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
