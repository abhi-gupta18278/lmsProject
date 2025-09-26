import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { BsPersonCircle } from 'react-icons/bs';
import { FaEye } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import HomeLayout from '../Layouts/HomeLayout';
import { createAccount } from '../Redux/Slices/authSlice.js';
import { isEmail, isValidPassword } from '../Regex/validater.js';


function Signup() {

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [previewImage, setPreviewImage] = useState("");
  const [showPassword, setShowPassword] = useState(false)

  function handleShowPassword() {
    setShowPassword(!showPassword)
  }


  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
    avatar: ""
  });

  function handleUserInput(e) {
    const { name, value } = e.target;

    setSignupData({
      ...signupData,
      [name]: value

    })
    // console.log(signupData)
  }
  // console.log(signupData)
  function getImage(event) {
    event.preventDefault();
    // getting the image
    const uploadedImage = event.target.files[0];

    if (uploadedImage) {
      setSignupData({
        ...signupData,
        avatar: uploadedImage
      });
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setPreviewImage(this.result);
      })
    }
  }
  // console.log(signupData.avatar)

  async function createNewAccount(event) {
    event.preventDefault();
    // console.log(signupData)
    if (!signupData.email || !signupData.password || !signupData.fullName || !signupData.avatar) {
      toast.error("Please fill all the details");
      return;
    }

    // checking name field length
    if (signupData.fullName.length < 3) {
      toast.error("Name should be atleast of 3 characters")
      return;
    }
    // checking valid email
    if (!isEmail(signupData.email)) {
      toast.error("Invalid email id");
      return;
    }
    // checking password validation
    if (!isValidPassword(signupData.password)) {
      toast.error("Password should be 6 - 16 character long with atleast a number and special character");
      return;
    }

    const formData = new FormData();
    formData.append("username", signupData.fullName);
    formData.append("email", signupData.email);
    formData.append("password", signupData.password);
    formData.append("avatar", signupData.avatar);
    // console.log(formData)
    // // dispatch create account action
    const response = await dispatch(createAccount(formData));
    // console.log(response)
    if (response?.payload?.success) {
      navigate("/login");

    }

    setSignupData({
      fullName: "",
      email: "",
      password: "",
      avatar: ""
    });
    setPreviewImage("");


  }

  return (
    <HomeLayout>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-bl from-gray-900 to-gray-600">
        <form
          noValidate
          onSubmit={createNewAccount}
          className="flex flex-col justify-center gap-4 rounded-xl p-6 w-80 sm:w-96 md:w-96 bg-gradient-to-bl from-gray-900 via-purple-900 to-violet-600 backdrop-blur-md text-white shadow-2xl animate-fade-in"
        >
          <h1 className="text-center text-3xl font-bold tracking-tight">Registration Page</h1>

          {/* Profile Image */}
          <label htmlFor="image_uploads" className="cursor-pointer m-auto">
            {previewImage ? (
              <img className="w-24 h-24 rounded-full mx-auto mb-2 border-2 border-indigo-400 shadow-md" src={previewImage} />
            ) : (
              <BsPersonCircle className="w-24 h-24 rounded-full mx-auto mb-2 border-2 border-indigo-400 shadow-md" />
            )}
          </label>
          <input
            onChange={getImage}
            className="hidden"
            type="file"
            name="image_uploads"
            id="image_uploads"
            accept=".jpg, .jpeg, .png, .svg"
          />

          {/* Name Input */}
          <div className="flex flex-col gap-1">
            <label htmlFor="fullName" className="font-semibold text-sm">Name</label>
            <input
              type="text"
              required
              name="fullName"
              id="fullName"
              autoComplete='name'
              placeholder="Enter your name"
              className="bg-gray-800/50 text-white px-3 py-2 rounded-md border border-gray-600 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition-all duration-300"
              onChange={handleUserInput}
              value={signupData.fullName}
            />
          </div>

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
              value={signupData.email}
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
                id="password"
                autoComplete='current-password'
                placeholder="Enter your password"
                className="bg-gray-800/50 text-white px-3 py-2 rounded-md border border-gray-600 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition-all duration-300 w-full"
                onChange={handleUserInput}
                value={signupData.password}
              />
              <span
                onClick={handleShowPassword}
                className="absolute right-3 top-2.5 text-xl opacity-75 cursor-pointer hover:opacity-100 transition-opacity duration-300"
              >
                <FaEye />
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-black px-4 py-2 rounded-md font-semibold text-lg hover:from-yellow-500 hover:to-orange-600 transform hover:scale-105 transition-all duration-300 shadow-md"
          >
            Create Account
          </button>

          {/* Login Link */}
          <p className="text-center text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-300 hover:text-indigo-200 font-medium transition-colors duration-300">
              Login
            </Link>
          </p>
        </form>
      </div>

    </HomeLayout>
  );
}

export default Signup;