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
      <div className='flex overflow-x-auto items-center justify-center h-[100vh]'>
        <form noValidate onSubmit={loginAccount} className='flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]'>
          <h1 className="text-center text-2xl font-bold">Login Page</h1>
          <div className='flex flex-col gap-1'>
            <label htmlFor="email" className='font-semibold'> Email </label>
            <input
              type="email"
              required
              name="email"
              id="email"
              placeholder="Enter your email.."
              className="bg-transparent px-2 py-1 border"
              onChange={handleUserInput}
              value={loginData.email}
            />
          </div>
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
                value={loginData.password}
              />
              <span onClick={handleShowPassword} className='absolute opacity-75 right-2 top-1 text-2xl cursor-pointer hover:opacity-100' ><FaEye /></span>
            </div>
            <Link className='link text-blue-600 text-right' to="/forgotPassword">Forgot password ?</Link>
          </div>
          <button type="submit" className='mt-2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer'>
            Login
          </button>
          <p className="text-center">
            Create New Account ? <Link to="/signup" className='link text-accent cursor-pointer'> signup</Link>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
}
export default Login;