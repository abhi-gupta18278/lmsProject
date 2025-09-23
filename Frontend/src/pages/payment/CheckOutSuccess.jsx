import { useEffect } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { getUserData } from "../../Redux/Slices/authSlice.js";


const CheckOutSuccess = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserData());
  }, [])

  return (
    <HomeLayout>
      <div className="min-h-[90vh] flex items-center justify-center bg-gray-900 p-4">
        <div className="w-full max-w-sm bg-white/5 backdrop-blur-md rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.3)] relative overflow-hidden">
          <h1 className="bg-green-600 text-white text-center w-full py-4 text-2xl font-bold rounded-t-xl">
            Payment Successful
          </h1>

          <div className="px-6 py-8 flex flex-col items-center justify-center space-y-4">
            <div className="text-center space-y-3">
              <h2 className="text-xl font-semibold text-white">
                Welcome to the Pro Bundle
              </h2>
              <p className="text-gray-300 text-sm">
                Now you can enjoy all the courses.
              </p>
            </div>
            <AiFillCheckCircle className="text-green-500 text-5xl" />
          </div>

          <Link
            to="/"
            className="block bg-green-600 hover:bg-green-700 text-white w-full py-3 text-lg font-semibold text-center rounded-b-xl transition-all duration-300 ease-in-out"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </HomeLayout>
  )
}

export default CheckOutSuccess;
