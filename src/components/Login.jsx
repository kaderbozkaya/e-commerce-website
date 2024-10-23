import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); //giriş başarılı olunca anasayfaya yönlendirmesi için

  const handleSubmit = async (e) => {
    e.preventDefault(); //form gönderilince tarayıcının sayfayı yenilemesini engellemek için
    const response = await fetch("https://fakestoreapi.com/auth/login", {
      method: "POST", //sunucuya veri göndermek için
      headers: { "Content-Type": "application/json" }, //içerik türü application/json olarak belirtildi gönderilen verinin JSON formatında olduğunu gösterir
      body: JSON.stringify({ username, password }), //kullanıcı adı ve şifre json formatında isteğin body'sine ekleniyor.stringify ile js objesini JSON formatına dönüştürür
    });

    const data = await response.json(); //apiden gelen yanısı json formatına çeviriyor
    if (data.token) {
      navigate("/");
    } else {
      console.log("Login failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full md:mt-0 m-auto"
    >
      <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
        Login
      </h2>
      <div className="relative mb-4">
        <label className="leading-7 text-sm text-gray-600">Username</label>
        <input
          className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="relative mb-4">
        <label className="leading-7 text-sm text-gray-600">Password</label>
        <input
          className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="border-0 py-2 px-8 focus:outline-none bg-[#9114df] hover:bg-[#8d39c1]  text-white rounded text-lg">
        Login
      </button>
    </form>
  );
}
