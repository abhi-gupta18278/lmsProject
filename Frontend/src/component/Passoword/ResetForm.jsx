import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { resetPassword } from "../../Redux/Slices/authSlice.js";
import { isValidPassword } from "../../Regex/validater";

const ResetForm = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  async function handleSubmit(e) {
    e.preventDefault()
    // console.log(password)
    if (!isValidPassword(password)) {
      toast.error('Please enter the valid password')
      return
    }
    const response = await dispatch(resetPassword([id, { password: password }]))
    if (response?.payload?.success) {
      navigate("/login");
    }
    setPassword('')
  }
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="w-full max-w-md bg-white/60 backdrop-blur-md rounded-2xl shadow-xl p-6 sm:p-8 md:p-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
          New Password
        </h1>
        <form noValidate onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm font-semibold text-gray-700">
              Email
            </label>
            <input
              type="text"
              required
              name="password"
              id="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 text-black bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold py-2.5 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetForm;




