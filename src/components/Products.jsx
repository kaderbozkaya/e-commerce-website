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
      <div className="container px-5 py-24 mx-auto">
        <div className=" flex flex-wrap ">
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
              <h2 className="text-gray-900 title-font text-lg font-medium text-center">
                {excerpt(title)}
              </h2>
              <p className="mt-3 text-center font-bold text-[#8d39c1]">
                {price} TL
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
