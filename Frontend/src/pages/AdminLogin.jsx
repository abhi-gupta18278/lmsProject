import { useState } from "react";
import toast from "react-hot-toast";
import { FaEye } from 'react-icons/fa';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import HomeLayout from "../Layouts/HomeLayout"
import { adminLogin } from "../Redux/Slices/authSlice.js";
import { isEmail, isValidPassword } from '../Regex/validater.js'

const AdminLogin = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false)
  const [adminData, setAdminData] = useState({
    loginId: '',
    email: '',
    password: ''
  })

  function handleUserInput(e) {
    const { name, value } = e.target
    setAdminData({
      ...adminData,
      [name]: value
    })
  }
  async function loginAccount(e) {
    e.preventDefault()
    if (!adminData.loginId || !adminData.email || !adminData.password) {
      toast.error('All field required')
      return;
    }
    if (!isEmail(adminData.email)) {
      toast.error("Enter Valid Email")
      return;
    }
    if (!isValidPassword(adminData.password)) {
      toast.error("Enter valid password")
      return;
    }
    if (import.meta.env.VITE_ADMIN_LOGIN_ID !== adminData.loginId) {
      toast.error('enter Valid Login id ')
      return
    }
    // console.log('form successfully Submit')
    const response = await dispatch(adminLogin(adminData))
    if (response?.payload?.success) {
      navigate('/')

    }

  }
  return (
    <HomeLayout>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-pink-700 to-orange-500">
        <form
          noValidate
          onSubmit={loginAccount}
          className="flex flex-col justify-center gap-4 rounded-xl p-6 w-80 sm:w-96 md:w-96 bg-gradient-to-tr from-gray-900 via-purple-900 to-indigo-800 text-white shadow-2xl backdrop-blur-md animate-fade-in"
        >
          <h1 className="text-center text-3xl font-bold tracking-tight">Admin Login</h1>

          {/* Login Id */}
          <div className="flex flex-col gap-1">
            <label htmlFor="loginId" className="font-semibold text-sm">Login Id</label>
            <input
              type="text"
              required
              name="loginId"
              id="loginId"
              placeholder="Enter your loginId..."
              className="bg-gray-800/50 text-white px-3 py-2 rounded-md border border-gray-600 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:outline-none transition-all duration-300"
              onChange={handleUserInput}
              value={adminData.loginId}
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-semibold text-sm">Email</label>
            <input
              type="email"
              required
              name="email"
              id="email"
              placeholder="Enter your email..."
              className="bg-gray-800/50 text-white px-3 py-2 rounded-md border border-gray-600 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:outline-none transition-all duration-300"
              onChange={handleUserInput}
              value={adminData.email}
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="font-semibold text-sm">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                name="password"
                id="password"
                placeholder="Enter your password..."
                className="bg-gray-800/50 text-white px-3 py-2 rounded-md border border-gray-600 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:outline-none transition-all duration-300 w-full"
                onChange={handleUserInput}
                value={adminData.password}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-xl opacity-75 cursor-pointer hover:opacity-100 transition-opacity duration-300"
              >
                <FaEye />
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-4 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-black px-4 py-2 rounded-md font-semibold text-lg hover:scale-105 transform transition-all duration-300 shadow-lg"
          >
            Login
          </button>
        </form>
      </div>

    </HomeLayout >
  );
}

export default AdminLogin;
