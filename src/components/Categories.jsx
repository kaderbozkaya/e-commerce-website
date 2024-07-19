import React from "react";

const options = [
  "electronics",
  "jewelery",
  "men's clothing",
  "women's clothing",
];

export default function Categories({ handleCategory }) {
  return (
    <>
      <div className="flex w-full text-gray-600">
        <div className="flex pb-3 text-sm m-1 md:text-lg w-full items-center md:justify-around">
          <button
            className="md:w-24 hover:bg-[#ffc530] flex items-center justify-center rounded p-2 mr-1"
            onClick={() => handleCategory("All")}
          >
            All
          </button>
          {options.map((item, i) => (
            <div
              key={i}
              className="cursor-pointer hover:bg-[#ffc530] hover:text-white hover:rounded p-2"
              onClick={() => handleCategory(item)}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
