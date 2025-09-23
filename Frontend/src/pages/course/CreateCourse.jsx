import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { createNewCourse } from "../../Redux/Slices/courseSlice";

function CreateCourse() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState({
    title: "",
    category: "",
    createdBy: "",
    description: "",
    thumbnail: null,
    previewImage: ""
  });

  function handleImageUpload(e) {
    const uploadedImage = e.target.files[0];
    if (!uploadedImage) return;

    if (!uploadedImage.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setUserInput({
        ...userInput,
        thumbnail: uploadedImage,    // raw file for backend
        previewImage: fileReader.result, // base64 for preview
      });
    };
    fileReader.readAsDataURL(uploadedImage);
  }





  function handleUserInput(e) {
    e.preventDefault()
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value
    })
  }

  async function onFormSubmit(e) {
    e.preventDefault();

    if (!userInput.title || !userInput.description || !userInput.category || !userInput.thumbnail || !userInput.createdBy) {
      toast.error("All fields are mandatory");
      return;
    }
    const formData = new FormData();
    formData.append("title", userInput.title);
    formData.append("category", userInput.category);
    formData.append("createdBy", userInput.createdBy);
    formData.append("description", userInput.description);
    formData.append("previewImage", userInput.previewImage)
    formData.append("thumbnail", userInput.thumbnail);

    const response = await dispatch(createNewCourse(formData));
    if (response?.payload?.success) {
      setUserInput({
        title: "",
        category: "",
        createdBy: "",
        description: "",
        thumbnail: null,
        previewImage: ""
      });
      navigate("/courses");
    }
  }

  return (
    <HomeLayout>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 p-4 transition-colors duration-300">
        <form
          noValidate
          onSubmit={onFormSubmit}
          className="relative flex flex-col gap-6 w-full max-w-2xl p-6 sm:p-8 rounded-2xl bg-white dark:bg-gray-900 shadow-lg dark:shadow-gray-700/50 backdrop-blur-sm transition-all duration-300"
        >
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 text-2xl text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200"
            aria-label="Go back"
          >
            <AiOutlineArrowLeft />
          </button>

          {/* Form Title */}
          <h1 className="text-center text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white font-poppins">
            Create New Course
          </h1>

          {/* Form Grid */}
          <main className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {/* Left Column: Image Upload & Title */}
            <div className="flex flex-col gap-6">
              {/* Image Upload */}
              <div>
                <label
                  htmlFor="image_uploads"
                  className="block cursor-pointer group"
                  aria-label="Upload course thumbnail"
                >
                  {userInput.previewImage ? (
                    <img
                      className="w-full h-48 object-cover rounded-lg border border-gray-300 dark:border-gray-600 group-hover:border-blue-500 dark:group-hover:border-blue-400 transition-colors duration-200"
                      src={userInput.previewImage}
                      alt="Course thumbnail preview"
                    />
                  ) : (
                    <div className="w-full h-48 flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 group-hover:border-blue-500 dark:group-hover:border-blue-400 bg-gray-50 dark:bg-gray-800 transition-colors duration-200">
                      <span className="font-poppins font-medium text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        Upload your course thumbnail
                      </span>
                    </div>
                  )}
                </label>
                <input
                  className="hidden"
                  type="file"
                  id="image_uploads"
                  accept=".jpg, .jpeg, .png"
                  name="image_uploads"
                  onChange={handleImageUpload}
                  aria-describedby="image_uploads"
                />
              </div>

              {/* Course Title */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="title"
                  className="font-poppins text-lg font-semibold text-gray-800 dark:text-gray-200"
                >
                  Course Title
                </label>
                <input
                  required
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Enter course title"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-200 font-poppins"
                  value={userInput.title}
                  onChange={handleUserInput}
                  aria-required="true"
                />
              </div>
            </div>

            {/* Right Column: Instructor, Category, Description */}
            <div className="flex flex-col gap-6">
              {/* Course Instructor */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="createdBy"
                  className="font-poppins text-lg font-semibold text-gray-800 dark:text-gray-200"
                >
                  Course Instructor
                </label>
                <input
                  required
                  type="text"
                  name="createdBy"
                  id="createdBy"
                  placeholder="Enter course instructor"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-200 font-poppins"
                  value={userInput.createdBy}
                  onChange={handleUserInput}
                  aria-required="true"
                />
              </div>

              {/* Course Category */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="category"
                  className="font-poppins text-lg font-semibold text-gray-800 dark:text-gray-200"
                >
                  Course Category
                </label>
                <input
                  required
                  type="text"
                  name="category"
                  id="category"
                  placeholder="Enter course category"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-200 font-poppins"
                  value={userInput.category}
                  onChange={handleUserInput}
                  aria-required="true"
                />
              </div>

              {/* Course Description */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="description"
                  className="font-poppins text-lg font-semibold text-gray-800 dark:text-gray-200"
                >
                  Course Description
                </label>
                <textarea
                  required
                  name="description"
                  id="description"
                  placeholder="Enter course description"
                  className="w-full px-4 py-2 h-28 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-200 resize-none font-poppins"
                  value={userInput.description}
                  onChange={handleUserInput}
                  aria-required="true"
                />
              </div>
            </div>
          </main>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg font-poppins font-semibold text-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-300"
            aria-label="Create course"
          >
            Create Course
          </button>
        </form>
      </div>
    </HomeLayout>
  )
}

export default CreateCourse;