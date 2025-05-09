import axios from "axios";
import React, { useState } from "react";
import { setUserData } from "../Redux/slices/user-slice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    userEmail: "",
    userPassword: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const loginUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data } = await axios.post("http://localhost:6969/auth/login", formData);
      
      if (data.status === "Error") {
        toast.error("Invalid email or password");
        return;
      }

      toast.success("Login successful!");
      dispatch(setUserData(data));
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50 p-4">
      <ToastContainer position="top-center" autoClose={3000} />
      <form 
        className="w-full max-w-md rounded-lg bg-white p-6 shadow-md sm:p-8"
        onSubmit={loginUser}
      >
        <h1 className="mb-6 text-2xl font-bold text-gray-800">Login to Help Notes</h1>
        
        <div className="mb-4">
          <label 
            className="mb-2 block text-sm font-medium text-gray-700" 
            htmlFor="userEmail"
          >
            Email
          </label>
          <input
            type="email"
            id="userEmail"
            name="userEmail"
            className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter Email"
            value={formData.userEmail}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-6">
          <label 
            className="mb-2 block text-sm font-medium text-gray-700" 
            htmlFor="userPassword"
          >
            Password
          </label>
          <input
            type="password"
            id="userPassword"
            name="userPassword"
            className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter Password"
            value={formData.userPassword}
            onChange={handleChange}
            required
            minLength={6}
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-70"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Log In"}
        </button>

        <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
          <p>New to Help Notes?</p>
          <Link 
            to="/signup" 
            className="font-medium text-blue-600 hover:text-blue-500 hover:underline"
          >
            Create an account
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;