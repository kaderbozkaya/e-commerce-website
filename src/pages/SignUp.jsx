import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useCallback, useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // import toastify styles

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!email || !password) {
        toast.error("Email and password are required");
        return;
      }
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          toast.success("You have registered successfully");
          navigate("/");
        })
        .catch((e) => {
          console.log(e);
          toast.error("Failed to register");
        });
    },
    [email, password, navigate]
  );

  return (
    <>
      <ToastContainer />
      <div className="max-w-md mx-auto py-12">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full md:mt-0 m-auto"
        >
          <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
            Create new account
          </h2>
          <div className="relative mb-4">
            <label className="leading-7 text-sm text-gray-600">Email</label>
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
          <button className="border-0 py-2 px-8 focus:outline-none bg-orange-500 hover:bg-orange-600 text-white rounded text-lg my-5">
            Sign Up
          </button>
          <p>
            Already have an account?
            <Link to={"/signin"}>
              <span className="text-purple-700 ml-2">Sign In</span>
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}
