import React, { useCallback, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; // Ensure auth is correctly set up
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!email || !password) {
        toast.error("Email and password are required.");
        return;
      }
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigate("/"); // Redirect to the homepage upon success
        })
        .catch((error) => {
          if (error.code === "auth/user-not-found") {
            toast.error("User not found. Please sign up first.");
          } else if (error.code === "auth/wrong-password") {
            toast.error("Incorrect password.");
          } else {
            toast.error("Failed to sign in. " + error.message);
          }
        });
    },
    [email, password, navigate]
  );

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-md m-auto py-12">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full md:mt-0 m-auto"
        >
          <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
            Sign In
          </h2>
          <div className="relative mb-4">
            <label className="leading-7 text-sm text-gray-600">Username</label>
            <input
              className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              type="text"
              placeholder="E-Mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <Link to={"/forgotpassword"} className="ml-auto">
            <span className="text-orange-400">Forgot Password</span>
          </Link>
          <button className="border-0 py-2 px-8 focus:outline-none bg-[#9114df] hover:bg-[#8d39c1] text-white rounded text-lg my-5">
            Sign In
          </button>
          <p>
            Do not have an account?
            <Link to={"/signup"}>
              <span className="text-purple-700 ml-2">Sign Up</span>
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}
