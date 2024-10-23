import React, { useState } from "react";

const options = [
  "electronics",
  "jewelery",
  "men's clothing",
  "women's clothing",
];

export default function Categories({ handleCategory }) {
  const [activeIndex, setActiveIndex] = useState(null); //hangi kategorinin seçili olduğunu göstermek için. başlangıçta null yani hiç bir kategori seçili değil

  const handleClick = (index, item) => {
    setActiveIndex(index); //hangi kategorinin aktif olduğunu belirlemek için
    handleCategory(item); //üst bileşene seçilen kategoriyi gönderiyoruz üst bileşen seçilen kategoriye göre ürünleri filtreliyor.
  };

  return (
    <>
      <div className="flex max-md:w-[410px] h-20 justify-center items-center text-white mt-14 bg-orange-400 rounded mx-2">
        <div className="flex pb-3 text-sm m-1 md:text-lg w-full items-center md:justify-around">
          <button
            className={`md:w-24 ${
              activeIndex === null ? "bg-[#8d39c1] text-white" : ""
            } flex items-center justify-center rounded p-2 mr-1`}
            onClick={() => handleClick(null, "All")}
          >
            All
          </button>
          {/* options.map ile döngü oluşturuyoruz. key={i} ile her kategori için benzersiz bir anahtar ekliyoruz. eğer kategori aktifse stili değiştiriyoruz onClick ile kategoriyi aktif hale getiriyoruz */}
          {options.map((item, i) => (
            <div
              key={i}
              className={`cursor-pointer ${
                activeIndex === i ? "bg-[#8d39c1] text-white rounded" : ""
              } p-2`}
              onClick={() => handleClick(i, item)}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
