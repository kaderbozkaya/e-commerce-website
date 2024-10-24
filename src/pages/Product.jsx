import axios from "axios"; // HTTP isteklerini yapmak için axios kütüphanesi eklendi
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // URL'deki parametreleri almak için
import { SlBasket } from "react-icons/sl";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Product() {
  const { id } = useParams(); // URL'deki id parametresini alıyoruz bu idyi kullanarak ürünü çekiyoruz
  const [product, setProduct] = useState({}); // Ürünü saklamak için state oluşturuyoruz başlangıçta boş bir obje

  // axios ile fakestore apisine get isteği atıyoruz. urldeki idyi kullanarak seçilen ürünü çekiyoruz
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/${id}`
        );
        setProduct(response.data); // Gelen veriyi state'e kaydediyoruz
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData(); // apiden veriyi çekiyoruz
  }, [id]); // id değişince tekrar çalışacak

  // Sepete ürün eklemek için fonksiyon:
  const handleCart = (product) => {
    console.log(product); // Ürünü console'a yazdırıyoruz debug için

    const cart = JSON.parse(localStorage.getItem("cart")) || []; // Sepeti localStorage'dan alıyoruz, eğer boşsa boş bir dizi başlatıyoruz
    const isProductExist = cart.find((item) => item.id === product.id); // Sepette bu ürün var mı diye kontrol ediyoruz

    if (isProductExist) {
      const updatedCart = cart.map((item) => {
        if (item.id === product.id) {
          // Aynı ürünse miktarını arttırıyoruz
          return {
            ...item, // Diğer özelliklerini koruyoruz
            quantity: item.quantity + 1,
          };
        }
        return item; // Diğer ürünler değişmeden kalıyor
      });
      localStorage.setItem("cart", JSON.stringify(updatedCart)); // Güncellenmiş sepeti localStorage'a kaydediyoruz
    } else {
      // Ürün sepette yoksa
      localStorage.setItem(
        "cart",
        JSON.stringify([...cart, { ...product, quantity: 1 }]) // Ürünü sepete ekle miktarı bir yap
      );
    }

    // Başarılı ekleme sonrası bildirim gösterimi
    toast.success("Product added to cart!");
  };

  if (!Object.keys(product).length > 0) return <div>Loading...</div>;

  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden">
        {/* Bildirim Container */}
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
