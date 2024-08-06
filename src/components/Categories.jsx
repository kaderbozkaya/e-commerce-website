import React, { useState } from "react";

const options = [
  "electronics",
  "jewelery",
  "men's clothing",
  "women's clothing",
];

export default function Categories({ handleCategory }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (index, item) => {
    setActiveIndex(index);
    handleCategory(item);
  };

  return (
    <>
      <div className="flex w-full text-gray-600 mt-14">
        <div className="flex pb-3 text-sm m-1 md:text-lg w-full items-center md:justify-around">
          <button
            className={`md:w-24 ${
              activeIndex === null ? "bg-[#8d39c1] text-white" : ""
            } flex items-center justify-center rounded p-2 mr-1`}
            onClick={() => handleClick(null, "All")}
          >
            All
          </button>
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
