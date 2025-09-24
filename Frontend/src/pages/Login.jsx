import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { FaEye } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import HomeLayout from '../Layouts/HomeLayout.jsx';
import { login } from '../Redux/Slices/authSlice.js';




function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false)
  function handleShowPassword() {
    setShowPassword(!showPassword)
  }
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  function handleUserInput(e) {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    })
  }
  async function loginAccount(event) {
    event.preventDefault();

    // // dispatch Login account action

    const response = await dispatch(login(loginData));

    if (response?.payload?.success) {
      navigate("/");
    }
    setLoginData({
      email: "",
      password: "",
    });
  }
  return (
    <HomeLayout>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-bl from-gray-900 to-gray-600 ">
        <form
          onSubmit={loginAccount}
          className="flex flex-col justify-center gap-4 rounded-xl p-6 w-80 sm:w-96 md:w-96 bg-gradient-to-bl from-gray-900 via-purple-900 to-violet-600 backdrop-blur-md text-white shadow-2xl animate-fade-in"
        >
          <h1 className="text-center text-3xl font-bold tracking-tight">Login Page</h1>

          {/* Email Input */}
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-semibold text-sm">Email</label>
            <input
              type="email"
              required
              name="email"
              id="email"
              autoComplete='username'
              placeholder="Enter your email"
              className="bg-gray-800/50 text-white px-3 py-2 rounded-md border border-gray-600 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition-all duration-300"
              onChange={handleUserInput}
              value={loginData.email}
            />
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="font-semibold text-sm">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                name="password"
                autoComplete='current-password'
                id="password"
                placeholder="Enter your password"
                className="bg-gray-800/50 text-white px-3 py-2 rounded-md border border-gray-600 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition-all duration-300 w-full"
                onChange={handleUserInput}
                value={loginData.password}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-xl opacity-75 cursor-pointer hover:opacity-100 transition-opacity duration-300"
              >
                <FaEye />
              </span>
            </div>
            <Link
              to="/forgotPassword"
              className="text-right text-sm text-indigo-300 hover:text-indigo-200 transition-colors duration-300"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-black px-4 py-2 rounded-md font-semibold text-lg hover:from-yellow-500 hover:to-orange-600 transform hover:scale-105 transition-all duration-300 shadow-md"
          >
            Login
          </button>

          {/* Signup Link */}
          <p className="text-center text-sm">
            Create New Account?{' '}
            <Link to="/signup" className="text-indigo-300 hover:text-indigo-200 font-medium transition-colors duration-300">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
}
export default Login;