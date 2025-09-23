import { Link } from "react-router-dom";

import HomePageImage from '../assets/HomeImage.png'
import HomeLayout from "../Layouts/HomeLayout.jsx";

const Home = () => {
  return (
    <HomeLayout>

      <div className="min-h-[90vh] flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12 px-4 sm:px-8 py-12 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 transition-colors duration-300">
        {/* Left Section */}
        <div className="w-full sm:w-1/2 flex flex-col items-center sm:items-start text-center sm:text-left space-y-6 px-4 sm:px-0 max-w-xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-poppins text-gray-800 dark:text-white">
            Find the Best
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              &nbsp;Online Courses
            </span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl font-poppins text-gray-600 dark:text-gray-300 max-w-md">
            Discover a vast library of courses taught by highly skilled and qualified instructors at an affordable price.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
            <Link to="/courses">
              <button
                className="px-6 py-3 rounded-lg font-poppins font-semibold text-base sm:text-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-300 shadow-md"
                aria-label="Explore courses"
              >
                Explore Courses
              </button>
            </Link>

            <Link to="/contact">
              <button
                className="px-6 py-3 rounded-lg font-poppins font-semibold text-base sm:text-lg border border-blue-500 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-500 dark:hover:bg-blue-400 hover:text-white dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-300 shadow-md"
                aria-label="Contact us"
              >
                Contact Us
              </button>
            </Link>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full sm:w-1/2 flex justify-center sm:justify-end px-4 sm:px-0">
          <img
            className="w-full max-w-md sm:max-w-lg lg:max-w-xl h-auto object-contain rounded-lg shadow-lg dark:shadow-gray-700/50"
            alt="Online learning illustration"
            src={HomePageImage}
          />
        </div>
      </div>


    </HomeLayout>


  );
}

export default Home;
