import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { SlBasket } from "react-icons/sl";
import { ProductContext } from "../context/Productscont";

export default function Products({
  id,
  title,
  price,
  category,
  image,
  excerpt,
}) {
  const { handleCart } = useContext(CartContext);
  const { products } = useContext(ProductContext);
  const [product, setProduct] = useState({});
  const [isAdded, setIsAdded] = useState(false);
  const [backG, setBackG] = useState("#8d39c1");

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
  return (
    <section className="text-gray-600">
      <div className=" flex flex-wrap">
        <div className="shadow-2xl w-[400px] h-[400px] p-2 m-2 ">
          <Link
            to={`/products/${id}`}
            className="container px-5 py-24 mx-auto max-md:ml-12"
          >
            <a className="block relative h-48 rounded overflow-hidden cursor-pointer">
              <img
                alt={title}
                className="object-contain object-center w-[200px] h-[200px] block p-3 mx-auto"
                src={image}
              />
            </a>
            <div className="mt-4">
              <h2 className="text-orange-400 title-font text-lg font-medium text-center">
                {excerpt(title)}
              </h2>
              <p className="mt-3 text-center font-bold text-[#8d39c1]">
                {price} TL
              </p>
            </div>
          </Link>
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
    </section>
  );
}
