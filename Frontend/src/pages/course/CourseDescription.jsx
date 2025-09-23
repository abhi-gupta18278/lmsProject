import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";

const CourseDescription = () => {
  const { state } = useLocation()
  const navigate = useNavigate()
  const { data, role } = useSelector(state => state.auth)

  return (
    <HomeLayout>
      <div className="min-h-[90vh] flex flex-col items-center justify-center bg-gray-900 text-white px-4 sm:px-8 md:px-20 pt-12 ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 ">
          {/* Left Column: Thumbnail and Course Info */}
          <div className="space-y-6">
            <div className="relative rounded-xl overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-[1.02]">
              <img
                className="w-full sm:w-4/5 h-70 object-cover rounded-lg shadow-md"
                alt={`${state?.title || 'Course'} thumbnail`}
                src={state?.thumbnail?.secure_url || '/default-thumbnail.jpg'}
                loading="lazy"
              />
            </div>

            <div className="space-y-4">
              <div className="flex flex-col items-center md:items-start text-lg md:text-xl">
                <p className="font-semibold text-center md:text-left">
                  <span className="text-yellow-400 font-bold">Total Lectures: </span>
                  {state?.numberofLecture}
                </p>
                <p className="font-semibold text-center md:text-left">
                  <span className="text-yellow-400 font-bold">Instructor: </span>
                  {state?.createdBy || 'Unknown'}
                </p>
              </div>

              <button
                onClick={() =>
                  role === 'admin' || data?.subscription?.status === "active"
                    ? navigate("/course/displaylectures", { state: { ...state } })
                    : navigate("/checkout")
                }
                className="w-full sm:w-4/5 bg-yellow-500 text-lg md:text-xl rounded-lg font-semibold px-6 py-3 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50 transition-all ease-in-out duration-300"
                aria-label={role === "admin" || data?.subscription?.status === "active" ? "Watch Lectures" : "Subscribe"}
              >
                {role === "admin" || data?.subscription?.status === "active" ? "Watch Lectures" : "Subscribe"}
              </button>
            </div>
          </div>

          {/* Right Column: Course Title and Description */}
          <div className="space-y-6 text-lg md:text-xl w-full sm:w-4/5 h-3/6 mb-10 md:mb-0">
            <h1 className="text-3xl pb-3 md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500 h-auto text-center md:text-left drop-shadow-lg">
              {state?.title || 'Untitled Course'}
            </h1>
            <div className="bg-gray-800 mt-10  p-6 rounded-2xl border border-gray-700">
              <p className="text-yellow-400 font-semibold mb-2">Course Description:</p>
              <p className="text-gray-300 leading-relaxed text-base md:text-lg">
                {state?.description || 'No description available.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};


export default CourseDescription;
