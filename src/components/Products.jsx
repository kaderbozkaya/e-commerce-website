import { SlBasket } from "react-icons/sl";
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
      <div className="container px-5 py-24 mx-auto max-md:ml-12 ">
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
              {/* <h3 className="text-gray-600 text-xs tracking-widest title-font mb-1">
                {category}
              </h3> */}
              <h2 className="text-orange-400 title-font text-lg font-medium text-center">
                {excerpt(title)}
              </h2>
              <p className="mt-3 text-center font-bold text-[#8d39c1]">
                {price} TL
              </p>
            </div>
            <div className="flex items-center justify-center flex-col">
              <button className="w-40 h-12 rounded-md bg-purple-600 flex mx-auto m-3 p-3 text-white hover:bg-orange-500">
                Sepete Ekle
                <SlBasket className="text-2xl ml-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
