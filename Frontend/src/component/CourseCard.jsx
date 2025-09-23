import { useNavigate } from "react-router-dom";

function CourseCard({ data }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate("/course/description/", { state: { ...data } })}
      
      className="relative w-[22rem] h-[460px] bg-white dark:bg-zinc-800 rounded-xl shadow-xl cursor-pointer group overflow-hidden 
            transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
    >
      
      {/* Thumbnail */}
      <div className="relative overflow-hidden h-56">
        <img
          className="w-full h-full object-cover rounded-t-xl transition-transform duration-500 group-hover:scale-110"
          src={data?.thumbnail?.secure_url}
          alt="course thumbnail"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3 text-gray-800 dark:text-gray-200">
        <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 line-clamp-2">
          {data?.title}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
          {data?.description}
        </p>
        <div className="space-y-2 text-sm">
          <p className="font-medium">
            <span className="text-indigo-500 dark:text-indigo-300 font-semibold">Category: </span>
            {data?.category}
          </p>
          <p className="font-medium">
            <span className="text-indigo-500 dark:text-indigo-300 font-semibold">Lectures: </span>
            {data?.numberoflecture}
          </p>
          <p className="font-medium">
            <span className="text-indigo-500 dark:text-indigo-300 font-semibold">Instructor: </span>
            {data?.createdBy}
          </p>
        </div>
      </div>

      {/* Hover Effect Button */}
      <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold 
                hover:bg-indigo-700 transition-colors duration-200">
          View Course
        </button>
      </div>

      {/* Category Badge */}
      <div className="absolute top-4 left-4 bg-indigo-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
        {data?.category}
      </div>
    </div>
  );
}

export default CourseCard;