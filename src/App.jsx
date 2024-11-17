import "./App.css";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Product from "./pages/Product";
import Cart from "./components/Cart";
import { CartProvider } from "./context/CartContext";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProductProvider } from "./context/Productscont";
import Header from "./components/Header";
import { useState } from "react";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <ProductProvider>
      <AuthProvider>
        <CartProvider>
          <ToastContainer position="top-right" autoClose={2000} />
          <Header setSearchTerm={setSearchTerm} />
          <Routes>
            <Route path="/" element={<Home searchTerm={searchTerm} />} />
            <Route path="/products/:id" element={<Product />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </ProductProvider>
  );
}

export default App;
