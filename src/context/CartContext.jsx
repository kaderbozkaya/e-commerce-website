import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

// Sepet bilgilerini tüm bileşenlerde kullanabilmek için bir Context oluşturuyoruz.
export const CartContext = createContext();

export function CartProvider({ children }) {
  // Sepetteki toplam ürün sayısını tutacak bir state tanımlıyoruz.
  const [cartCount, setCartCount] = useState(0);

  // Sayfa yüklendiğinde, eğer varsa localStorage'dan kaydedilmiş sepet verisini alıyoruz.
  useEffect(() => {
    // localStorage'dan "cart" adındaki kaydı alıp JSON formatında okuyoruz.
    // Eğer "cart" bulunmazsa boş bir dizi döndürüyoruz.
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

    // Sepetteki toplam ürün sayısını hesaplamak için reduce fonksiyonunu kullanıyoruz.
    // Sepetteki her ürünün miktarını (quantity) topluyoruz.
    const initialCount = storedCart.reduce(
      (acc, item) => acc + item.quantity,
      0
    );

    // Hesapladığımız toplam sayıyı `cartCount` state'ine atıyoruz.
    setCartCount(initialCount);
  }, []); //useEffect yalnızca bileşen yüklendiğinde çalışır.

  // Sepetteki ürün sayısını güncellemek için bir fonksiyon
  const updateCartCount = (newCart) => {
    // Yeni sepet verisindeki toplam ürün sayısını hesaplıyoruz.
    const newCount = newCart.reduce((acc, item) => acc + item.quantity, 0);

    // `cartCount` state'ini güncelleyerek UI'ın güncellenmesini sağlıyoruz.
    setCartCount(newCount);

    // Yeni sepet verisini localStorage'a JSON formatında kaydediyoruz.
    localStorage.setItem("cart", JSON.stringify(newCart));
  };
  const handleCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const isProductExist = cart.find((item) => item.id === product.id);
    let updateCart;
    if (isProductExist) {
      updateCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updateCart = [...cart, { ...product, quantity: product.quantity || 1 }];
    }
    console.log("Updated Cart:", updateCart);
    updateCartCount(updateCart);
    localStorage.setItem("cart", JSON.stringify(updateCart));
    toast.success("Product added to cart.");
  };

  return (
    // Sepet verisini ve güncelleme fonksiyonunu Context Provider ile paylaşarak
    //children bileşenlerin bu verilere ulaşabilmesini sağlıyoruz.
    <CartContext.Provider value={{ cartCount, updateCartCount, handleCart }}>
      {children} {/*children bileşenler buraya yerleşir */}
    </CartContext.Provider>
  );
}
