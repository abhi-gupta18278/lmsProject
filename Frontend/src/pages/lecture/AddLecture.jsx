import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { addCourseLecture } from "../../Redux/Slices/lectureSlice.js";

function AddLecture() {

    const courseDetails = useLocation().state;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [userInput, setUserInput] = useState({
        id: courseDetails?._id,
        lecture: undefined,
        title: "",
        description: "",
        videoSrc: ""
    });

    function handleInputChange(e) {
        const { name, value } = e.target;
        setUserInput({
            ...userInput,
            [name]: value
        })
    }

    function handleVideo(e) {
        const video = e.target.files[0];
        const source = window.URL.createObjectURL(video);
        setUserInput({
            ...userInput,
            lecture: video,
            videoSrc: source
        })
    }

    async function onFormSubmit(e) {
        e.preventDefault();
        if (!userInput.lecture || !userInput.title || !userInput.description) {
            toast.error("All fields are mandatory")
            return;
        }
        const response = await dispatch(addCourseLecture(userInput));
        if (response?.payload?.success) {
            navigate(-1);
            setUserInput({
                id: courseDetails?._id,
                lecture: undefined,
                title: "",
                description: "",
                videoSrc: ""
            })
        }
    }

    useEffect(() => {
        if (!courseDetails) navigate("/courses");
    }, [])

    return (
        <HomeLayout>
            <div className="min-h-[90vh] bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4 sm:p-6 md:p-8">
                <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-6 sm:p-8 border border-white/20">
                    <header className="relative flex items-center justify-center mb-6">
                        <button
                            className="absolute left-0 p-2 text-2xl text-teal-400 hover:text-teal-300 transition-colors duration-200"
                            onClick={() => navigate(-1)}
                            aria-label="Go back"
                        >
                            <AiOutlineArrowLeft />
                        </button>
                        <h1 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
                            Add New Lecture
                        </h1>
                    </header>
                    <form onSubmit={onFormSubmit} className="flex flex-col gap-5">
                        <input
                            type="text"
                            name="title"
                            autoComplete="username"
                            placeholder="Lecture Title"
                            onChange={handleInputChange}
                            value={userInput.title}
                            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200"
                        />
                        <textarea
                            name="description"
                            placeholder="Lecture Description"
                            onChange={handleInputChange}
                            value={userInput.description}
                            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 h-40 resize-none focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200"
                        />
                        {userInput.videoSrc ? (
                            <video
                                muted
                                src={userInput.videoSrc}
                                controls
                                controlsList="nodownload nofullscreen"
                                disablePictureInPicture
                                className="w-full rounded-lg shadow-md"
                            />
                        ) : (
                            <div className="h-48 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center bg-gray-800/30 hover:bg-gray-800/50 transition-colors duration-200">
                                <label
                                    htmlFor="lecture"
                                    className="text-gray-300 font-medium cursor-pointer hover:text-teal-400 transition-colors duration-200"
                                >
                                    Choose Your Video
                                </label>
                                <input
                                    type="file"
                                    id="lecture"
                                    name="lecture"
                                    onChange={handleVideo}
                                    accept="video/mp4,video/x-mp4,video/*"
                                    className="hidden"
                                />
                            </div>
                        )}
                        <button
                            type="submit"
                            className="w-full cursor-pointer py-3 bg-gradient-to-r from-teal-500 to-blue-600 text-white font-semibold rounded-lg hover:from-teal-600 hover:to-blue-700 transition-all duration-200 shadow-md"
                        >
                            Add Lecture
                        </button>
                    </form>
                </div>
            </div>
        </HomeLayout>
    )
}

export default AddLecture;