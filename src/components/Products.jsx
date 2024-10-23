import { Link } from "react-router-dom";
export default function Products({
  id,
  title,
  price,
  category,
  image,
  excerpt,
}) {
  return (
    <section className="text-gray-600 ">
      <Link
        to={`/products/${id}`}
        className="container px-5 py-24 mx-auto max-md:ml-12 "
      >
        <div className=" flex flex-wrap">
          <div className="shadow-2xl w-[400px] h-[400px] p-2 m-2">
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
          </div>
        </div>
      </Link>
    </section>
  );
}
