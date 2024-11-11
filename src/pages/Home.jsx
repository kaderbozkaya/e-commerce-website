import axios from "axios";
import React, { useEffect, useState } from "react";
import Categories from "../components/Categories";
import Products from "../components/Products";
import Header from "../components/Header";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentCategory, setCurrentCategory] = useState("All");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const filteredProducts = filteredData.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCategory = async (category) => {
    setCurrentCategory(category);
    try {
      const url =
        category === "All"
          ? "https://fakestoreapi.com/products"
          : `https://fakestoreapi.com/products/category/${category}`;
      const response = await axios.get(url);
      if (response.status === 200) {
        setFilteredData(response.data);
        const newPath = category === "All" ? "/" : `/${category}`;
        window.history.pushState({}, "", newPath);
      } else {
        console.error("Failed to load category");
      }
    } catch (error) {
      console.error("Error handling category:", error);
    }
  };

  const excerpt = (str) => {
    return str.length > 30 ? str.substring(0, 30) + "..." : str;
  };

  return (
    <>
      <Header setSearchTerm={setSearchTerm} />
      <Categories handleCategory={handleCategory} />
      <div>
        {filteredProducts.length === 0 ? (
          <div className="text-center text-red-800 text-5xl">
            No products found
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
            {filteredProducts.map((item, i) => (
              <Products key={i} {...item} excerpt={excerpt} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
