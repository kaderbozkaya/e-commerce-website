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

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<Product />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
