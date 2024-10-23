// import React, { useEffect, useState } from "react";

// const Filter = () => {
//   const [products, setProducts] = useState([]); // Tüm ürünler
//   const [filteredProducts, setFilteredProducts] = useState([]); // Filtrelenmiş ürünler
//   const [category, setCategory] = useState(""); // Seçilen kategori (kadın/erkek)
//   const [color, setColor] = useState(""); // Seçilen renk

//   // API'den ürünleri çekme
//   useEffect(() => {
//     fetch("https://fakestoreapi.com/products")
//       .then((response) => response.json())
//       .then((data) => {
//         setProducts(data); // Tüm ürünleri state'e kaydet
//       })
//       .catch((error) => console.error("Error fetching data:", error));
//   }, []);

//   // Kategori ve renk filtrelerini uygulama
//   useEffect(() => {
//     let filtered = products;

//     // Kategoriye göre filtreleme (kadın/erkek)
//     if (category === "women") {
//       filtered = products.filter((product) =>
//         product.title.toLowerCase().includes("women")
//       );
//     } else if (category === "men") {
//       filtered = products.filter((product) =>
//         product.title.toLowerCase().includes("men")
//       );
//     }

//     // Renk filtresi
//     if (color) {
//       filtered = filtered.filter(
//         (product) =>
//           product.color && product.color.toLowerCase() === color.toLowerCase()
//       );
//     }

//     setFilteredProducts(filtered); // Filtrelenmiş ürünleri state'e kaydet
//   }, [category, color, products]);

//   return (
//     <div>
//       <h1>Ürün Filtresi</h1>

//       {/* Kategori seçimi */}
//       <div>
//         <label>Kategori: </label>
//         <select value={category} onChange={(e) => setCategory(e.target.value)}>
//           <option value="">Tümü</option>
//           <option value="women">Kadın</option>
//           <option value="men">Erkek</option>
//         </select>
//       </div>

//       {/* Renk seçimi */}
//       <div>
//         <label>Renk: </label>
//         <input
//           type="text"
//           value={color}
//           onChange={(e) => setColor(e.target.value)}
//           placeholder="Renk girin (örneğin: red)"
//         />
//       </div>

//       {/* Filtrelenmiş ürünlerin listesi */}
//       <div>
//         {filteredProducts.length > 0 ? (
//           filteredProducts.map((product) => (
//             <div key={product.id}>
//               <h3>{product.title}</h3>
//               <p>Fiyat: ${product.price}</p>
//             </div>
//           ))
//         ) : (
//           <p>Filtreye uyan ürün bulunamadı.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Filter;
