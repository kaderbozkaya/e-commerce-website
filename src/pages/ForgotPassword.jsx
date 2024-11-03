import React, { useCallback, useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!email) {
        toast.error("Please enter an email address.");
        return;
      }
      sendPasswordResetEmail(auth, email)
        .then(() => {
          toast.success(
            "We have sent you a reset password email. Check your inbox"
          );
        })
        .catch((error) => {
          toast.error("Failed to send email. Please try again.");
        });
    },
    [email]
  );

  return (
    <div className="max-w-md mx-auto py-12">
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full md:mt-0 m-auto"
      >
        <div className="relative mb-4">
          <label className="leading-7 text-sm text-gray-600">E mail</label>
          <input
            className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button className="border-0 py-2 px-8 focus:outline-none bg-[#9114df] hover:bg-[#8d39c1]  text-white rounded text-lg">
          Send reset password email
        </button>
        <Link to={"/signin"} className="ml-auto mt-3">
          <span className="text-purple-500"> Back to Sign In</span>
        </Link>
      </form>
    </div>
  );
}
