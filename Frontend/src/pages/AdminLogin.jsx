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
      <div className='flex overflow-x-auto items-center justify-center h-[100vh]'>
        <form noValidate onSubmit={loginAccount} className='flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]'>
          <h1 className="text-center text-2xl font-bold">Login Page</h1>
          <div className='flex flex-col gap-1'>
            <label htmlFor="loginId" className='font-semibold'> Login Id </label>
            <input
              type="loginId"
              required
              name="loginId"
              id="loginId"
              placeholder="Enter your loginId.."
              className="bg-transparent px-2 py-1 border"
              onChange={handleUserInput}
              value={adminData.loginId}
            />
          </div>
          <label htmlFor="email" className='font-semibold'> Email </label>
          <input
            type="email"
            required
            name="email"
            id="email"
            placeholder="Enter your email.."
            className="bg-transparent px-2 py-1 border"
            onChange={handleUserInput}
            value={adminData.email}
          />
          <div className='flex flex-col gap-1'>
            <label htmlFor="password" className='font-semibold'> Password </label>
            <div className='flex relative'>

              <input
                type={showPassword ? 'text' : 'password'}
                required
                name="password"
                id="password"
                placeholder="Enter your password.."
                className="bg-transparent px-2 py-1 border w-full"
                onChange={handleUserInput}
                value={adminData.password}
              />
              <span onClick={() => setShowPassword(!showPassword)} className='absolute opacity-75 right-2 top-1 text-2xl cursor-pointer hover:opacity-100' ><FaEye /></span>
            </div>
          </div>
          <button type="submit" className='mt-2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer'>
            Login
          </button>

        </form>
      </div >
    </HomeLayout >
  );
}

export default AdminLogin;
