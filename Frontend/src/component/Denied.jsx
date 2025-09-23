import { useNavigate } from "react-router-dom";

const Denied = () => {
  const navigate = useNavigate()
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-[#1A2238] text-white">


      <div className="text-9xl font-extrabold tracking-widest ">403</div>
      <h1 className="text-2xl">Authorized Access</h1>
      <button onClick={() => navigate(-1)} className="px-5 mt-5 py-3 font-light border-1 bg-transparent border-blue-400 hover:bg-amber-300 text-xl rounded-sm ease-in-out duration-200 cursor-pointer "><span>←</span>&nbsp;Go Back</button>


    </div>

  );
}

export default Denied;
