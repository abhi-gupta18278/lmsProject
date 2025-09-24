import { useState } from "react";
import toast from "react-hot-toast";
import { BiArrowBack } from "react-icons/bi";
import { FaEye } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { changePassword } from "../../Redux/Slices/authSlice";
import { isValidPassword } from "../../Regex/validater";

const ChangePassword = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState({
    oldPassword: '',
    newPassword: ''
  })
  function handleInput(e) {
    const { name, value } = e.target
    setPassword({
      ...password,
      [name]: value
    })
  }
  async function handleSubmit(e) {
    e.preventDefault()
    if (!isValidPassword(password.oldPassword)) {
      toast.error('Enter Valid Password')
      return;
    }
    if (!isValidPassword(password.newPassword)) {
      toast.error('Enter Valid Password')
      return;
    }
    const res = await dispatch(changePassword(password))
    if (res?.payload?.success) {
      navigate('/user/profile')
      setPassword('')
    }

  }
  return (
    <HomeLayout>

      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
        <div className="w-full max-w-md bg-white/60 backdrop-blur-md rounded-2xl shadow-xl p-6 sm:p-8 md:p-10">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-600 hover:text-gray-800 transition-colors duration-200 mb-4"
          >
            <BiArrowBack size={24} />
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
            Reset Password
          </h1>
          <form noValidate onSubmit={handleSubmit} className="space-y-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="oldPassword" className="text-sm font-semibold text-gray-700">
                Old Password
              </label>
              <input
                type="text"
                required
                name="oldPassword"
                id="oldPassword"
                autoComplete="current-password"
                placeholder="Enter your oldPassword"
                className="w-full px-4 py-2 text-black bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
                onChange={handleInput}
                value={password.oldPassword}
              />
              <div className="relative">
                <label htmlFor="newPassword" className="text-sm font-semibold text-gray-700">
                  New Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  name="newPassword"
                  id="newPassword"
                  autoComplete="new-password"
                  placeholder="Enter your newPassword"
                  className="w-full px-4 py-2 text-black bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
                  onChange={handleInput}
                  value={password.newPassword}
                />
                <span onClick={() => setShowPassword(!showPassword)} className='absolute opacity-75 right-2 top-8 text-2xl cursor-pointer hover:opacity-100 text-red-500' ><FaEye /></span>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold py-2.5 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </HomeLayout>
  );
}

export default ChangePassword;
