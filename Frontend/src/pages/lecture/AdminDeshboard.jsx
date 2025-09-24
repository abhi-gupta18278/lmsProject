import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from "chart.js";
import { useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { BsCollectionPlayFill, BsTrash } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { FcSalesPerformance } from "react-icons/fc";
import { GiMoneyStack } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout.jsx";
import { deleteCourse, getAllCourses } from "../../Redux/Slices/courseSlice.js";
import { getPaymentRecord } from "../../Redux/Slices/razorPaySlice.js";
import { getStatsData } from "../../Redux/Slices/statSlice.js";
ChartJS.register(ArcElement, BarElement, CategoryScale, Legend, LinearScale, Title, Tooltip);

function AdminDashboard() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { allUsersCount, subscribedCount } = useSelector((state) => state.stat);

  const { allPayments, monthlySalesRecord } = useSelector((state) => state.razorpay);



  const userData = {
    labels: ["Registered User", "Enrolled User"],
    fontColor: "white",
    datasets: [
      {
        label: "User Details",
        data: [allUsersCount, subscribedCount],
        backgroundColor: ["yellow", "green"],
        borderWidth: 1,
        borderColor: ["yellow", "green"]
      },
    ]
  };

  const salesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    fontColor: "white",
    datasets: [
      {
        label: "Sales / Month",
        data: monthlySalesRecord,
        backgroundColor: ["red"],
        borderColor: ["white"],
        borderWidth: 2
      }

    ]
  }

  const myCourses = useSelector((state) => state?.course?.courseData);

  async function onCourseDelete(id) {
    if (window.confirm("Are you sure you want to delete the course ? ")) {
      const res = await dispatch(deleteCourse(id));
      if (res?.payload?.success) {
        await dispatch(getAllCourses());
      }
    }
  }


  useEffect(() => {
    (
      async () => {
        await dispatch(getAllCourses());
        await dispatch(getStatsData());
        await dispatch(getPaymentRecord())
      }
    )()
  }, [])

  return (
    <HomeLayout>
      <div className="min-h-screen bg-gray-900 text-white font-sans flex flex-col gap-8 p-4 sm:p-6">
        <h1 className="text-center text-4xl sm:text-5xl font-bold text-yellow-400 tracking-tight">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
          <div className="flex flex-col items-center gap-6 p-6 bg-gray-800 rounded-xl shadow-xl transform hover:scale-105 transition-transform duration-300">
            <div className="w-full max-w-xs sm:max-w-sm h-64 sm:h-80">
              <Pie data={userData} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg shadow-md hover:bg-gray-600 transition-colors duration-200">
                <div className="flex flex-col items-center">
                  <p className="font-semibold text-gray-300">Registered Users</p>
                  <h3 className="text-2xl sm:text-3xl font-bold">{allUsersCount}</h3>
                </div>
                <FaUsers className="text-yellow-400 text-3xl sm:text-4xl" />
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg shadow-md hover:bg-gray-600 transition-colors duration-200">
                <div className="flex flex-col items-center">
                  <p className="font-semibold text-gray-300">Subscribed Users</p>
                  <h3 className="text-2xl sm:text-3xl font-bold">{subscribedCount}</h3>
                </div>
                <FaUsers className="text-green-400 text-3xl sm:text-4xl" />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-6 p-6 bg-gray-800 rounded-xl shadow-xl transform hover:scale-105 transition-transform duration-300">
            <div className="w-full h-64 sm:h-80 relative">
              <Bar className="absolute bottom-0 w-full h-full" data={salesData} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg shadow-md hover:bg-gray-600 transition-colors duration-200">
                <div className="flex flex-col items-center">
                  <p className="font-semibold text-gray-300">Subscription Count</p>
                  <h3 className="text-2xl sm:text-3xl font-bold">{allPayments?.count}</h3>
                </div>
                <FcSalesPerformance className="text-yellow-400 text-3xl sm:text-4xl" />
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg shadow-md hover:bg-gray-600 transition-colors duration-200">
                <div className="flex flex-col items-center">
                  <p className="font-semibold text-gray-300">Total Revenue</p>
                  <h3 className="text-2xl sm:text-3xl font-bold">{allPayments?.count * 499}</h3>
                </div>
                <GiMoneyStack className="text-green-400 text-3xl sm:text-4xl" />
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto w-full flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-100">Courses Overview</h1>
            <button
              onClick={() => navigate("/course/create")}
              className="mt-4 sm:mt-0 bg-yellow-400 text-gray-900 px-6 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition-colors duration-300"
            >
              Create New Course
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm bg-gray-800 rounded-xl shadow-xl">
              <thead className="bg-gray-700 text-gray-300">
                <tr>
                  <th className="p-4">S No</th>
                  <th className="p-4">Course Title</th>
                  <th className="p-4">Course Category</th>
                  <th className="p-4">Instructor</th>
                  <th className="p-4">Total Lectures</th>
                  <th className="p-4">Description</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {myCourses?.map((course, idx) => (
                  <tr key={course._id} className="border-b border-gray-700 hover:bg-gray-600 transition-colors duration-200">
                    <td className="p-4">{idx + 1}</td>
                    <td className="p-4">
                      <textarea
                        readOnly
                        value={course?.title}
                        className="w-full bg-transparent text-white resize-none focus:outline-none"
                        rows="2"
                      />
                    </td>
                    <td className="p-4">{course?.category}</td>
                    <td className="p-4">{course?.createdBy}</td>
                    <td className="p-4">{course?.numberOfLectures}</td>
                    <td className="p-4 max-w-xs">
                      <textarea
                        value={course?.description}
                        readOnly
                        className="w-full bg-transparent text-white resize-none focus:outline-none"
                        rows="2"
                      />
                    </td>
                    <td className="p-4 flex items-center gap-2">
                      <button
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg transition-colors duration-200"
                        onClick={() => navigate("/course/displaylectures", { state: { ...course } })}
                      >
                        <BsCollectionPlayFill />
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition-colors duration-200"
                        onClick={() => onCourseDelete(course?._id)}
                      >
                        <BsTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default AdminDashboard;