import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import HomeLayout from '../../Layouts/HomeLayout.jsx'
import { deleteCourseLecture, getCourseLectures } from '../../Redux/Slices/lectureSlice.js';
const Lecture = () => {
  const { state } = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { lectures } = useSelector((state) => state.lecture)
  const { role } = useSelector(state => state?.auth)

  const [currentVideo, setCurrentVideo] = useState(0);

  async function onLectureDelete(courseId, lectId) {
    // console.log(courseId,lectId)
    const confirmation = window.confirm('Are you sure to delete their lecture?')
    if (!confirmation) return;
    await dispatch(deleteCourseLecture({ courseId, lectId }))
    await dispatch(getCourseLectures(courseId))


  }

  useEffect(() => {
    if (!state) navigate('/courses');
    dispatch(getCourseLectures(state._id))
  }, [])
  return (
    <HomeLayout>
      <div className="min-h-[90vh] bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-center py-10 px-4 sm:px-6 md:px-8 text-white">
        <div className="text-center text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 mb-8">
          Course: {state?.title}
        </div>

        {lectures && lectures.length > 0 ? (
          <div className="flex flex-col lg:flex-row justify-center gap-6 w-full max-w-6xl">
            {/* Left section for video and details */}
            <div className="w-full lg:w-[28rem] bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-4 sm:p-6 border border-white/20">
              <video
                src={lectures[currentVideo]?.lecture?.secure_url}
                className="w-full rounded-lg shadow-md"
                controls
                disablePictureInPicture
                muted
                controlsList="nodownload"
              />
              <div className="mt-4 space-y-2">
                <h1 className="text-lg font-semibold">
                  <span className="text-teal-400">Title: </span>
                  {lectures[currentVideo]?.title}
                </h1>
                <p className="text-gray-300 line-clamp-4">
                  <span className="text-teal-400">Description: </span>
                  {lectures[currentVideo]?.description}
                </p>
              </div>
            </div>

            {/* Right section for lecture list */}
            <div className="w-full lg:w-[28rem] bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-4 sm:p-6 border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl sm:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
                  Lectures List
                </h2>
                {role === "admin" && (
                  <button
                    onClick={() => navigate("/course/addlecture", { state: { ...state } })}
                    className="py-2 px-4 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 transition-all duration-200"
                  >
                    Add New Lecture
                  </button>
                )}
              </div>
              <ul className="space-y-3">
                {lectures.map((lecture, idx) => (
                  <li key={lecture._id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors duration-200">
                    <p
                      className="cursor-pointer text-gray-300 hover:text-teal-400 transition-colors duration-200"
                      onClick={() => setCurrentVideo(idx)}
                    >
                      <span className="font-medium">Lecture {idx + 1}: </span>
                      {lecture?.title}
                    </p>
                    {role === "admin" && (
                      <button
                        onClick={() => onLectureDelete(state?._id, lecture?._id)}
                        className="mt-2 sm:mt-0 py-1 px-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all duration-200"
                      >
                        Delete
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          role === "admin" && (
            <button
              onClick={() => navigate("/course/addlecture", { state: { ...state } })}
              className="py-3 px-6 bg-gradient-to-r from-teal-500 to-blue-600 text-white font-semibold rounded-lg hover:from-teal-600 hover:to-blue-700 transition-all duration-200 shadow-md"
            >
              Add New Lecture
            </button>
          )
        )}
      </div>
    </HomeLayout>
  );
}

export default Lecture;
