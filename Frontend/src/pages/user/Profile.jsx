import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from '../../Layouts/HomeLayout.jsx'
import { getUserData } from "../../Redux/Slices/authSlice.js";
import { cancelCourseBundle } from '../../Redux/Slices/razorPaySlice.js'

const Profile = () => {
  const dispatch = useDispatch()
  const { data } = useSelector((state) => state?.auth)
  const navigate = useNavigate()
  async function handleCancellation() {
    const userConfirmed = window.confirm('Are you sure you want to cancel the subscription?');

    if (!userConfirmed) return;
    await dispatch(cancelCourseBundle())
    await dispatch(getUserData())
    navigate('/')


  }
  return (
    <HomeLayout>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-indigo-950 to-blue-950 p-6">
        <div className="my-10 flex flex-col gap-8 rounded-3xl p-8 text-white w-full max-w-md bg-gray-800/60 backdrop-blur-lg shadow-2xl ring-1 ring-gray-700/50 transition-all duration-300 hover:shadow-3xl sm:p-10">
          {/* Avatar & Name Group */}
          <div className="flex flex-col items-center gap-4">
            {/* Avatar */}
            <div className="relative w-36 h-36">
              <img
                src={data?.avatar?.secure_url}
                alt="Profile avatar"
                className="w-full h-full rounded-full border-4 border-indigo-500 object-cover shadow-lg"
              />
            </div>
            {/* Name */}
            <h3 className="text-3xl font-extrabold text-center tracking-tight text-gray-100">
              {data?.fullName}
            </h3>
          </div>

          {/* User Info Section */}
          <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2 sm:gap-6 ">
            <div className="flex flex-col">
              <p className="font-semibold text-gray-300">Email</p>
              <p className="text-gray-100 mt-1 truncate" >{data?.email}</p>
            </div>
            <div className="flex flex-col">
              <p className="font-semibold text-gray-300">Role</p>
              <p className="text-gray-100 mt-1">{data?.role}</p>
            </div>
            <div className="flex flex-col">
              <p className="font-semibold text-gray-300">Subscription</p>
              <p className={`mt-1 font-semibold ${data?.subscription?.status === "active" ? "text-emerald-400" : "text-red-400"}`}>
                {data?.subscription?.status === "active" ? "Active" : "Inactive"}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="font-semibold text-gray-300">Full Name</p>
              <p className="text-gray-100 mt-1">{data?.username}</p>
            </div>
          </div>
          {/* Buttons Section */}
          <div className="mt-4 flex flex-col gap-4">
            <Link
              to="/changepassword"
              className="flex-1 bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white font-semibold py-3 rounded-lg text-center transition-all duration-300 hover:shadow-lg text-sm sm:text-xl"
            >
              Change Password
            </Link>
            <Link
              to="/user/editprofile"

              className="flex-1 bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white font-semibold py-3 rounded-lg text-center transition-all duration-300 hover:shadow-lg text-sm sm:text-xl"
            >
              Edit Profile
            </Link>

            {data?.subscription?.status === "active" && <button
              onClick={handleCancellation}


              className="flex-1 bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white font-semibold py-3 rounded-lg text-center transition-all duration-300 hover:shadow-lg text-sm sm:text-xl"
            >
              Cancel Subscription
            </button>
            }


          </div>
        </div>
      </div>



    </HomeLayout>
  );
}

export default Profile;
