import { useState } from 'react';
import toast from 'react-hot-toast';
import { BiArrowBack } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { forgotPassword } from '../../Redux/Slices/authSlice';
import { isEmail } from '../../Regex/validater';

const ForgotPassword = () => {
  const [emailValue, setEmailValue] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {

    e.preventDefault();
    if (!isEmail(emailValue)) {
      toast.error('invalid Email formet')
      return;
    }
   
    const response = await dispatch(forgotPassword({email:emailValue}))
    if (response?.payload?.success) {
      navigate("/");
    }
    setEmailValue('')
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="w-full max-w-md bg-white/60 backdrop-blur-md rounded-2xl shadow-xl p-6 sm:p-8 md:p-10">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-600 hover:text-gray-800 transition-colors duration-200 mb-4"
        >
          <BiArrowBack size={24} />
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
          Forgot Password
        </h1>
        <form noValidate onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-semibold text-gray-700">
              Email
            </label>
            <input
              type="email"
              required
              name="email"
              id="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 text-black bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
              onChange={(e) => setEmailValue(e.target.value)}
              value={emailValue}
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
};

export default ForgotPassword;