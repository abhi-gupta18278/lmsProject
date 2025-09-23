import { AiFillCloseCircle } from 'react-icons/ai';
import { FiMenu } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import Footer from '../component/Footer';
import Home from '../pages/Home';
import { logout } from '../Redux/Slices/authSlice';
const HomeLayout = ({ children }) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn)
  const role = useSelector((state) => state?.auth?.role)

  function changeWidth() {
    const drawerSide = document.getElementsByClassName("drawer-side");
    drawerSide[0].style.width = 'auto';
  }

  function hideDrawer() {
    const element = document.getElementsByClassName("drawer-toggle");
    element[0].checked = false;

    const drawerSide = document.getElementsByClassName("drawer-side");
    drawerSide[0].style.width = '0';
  }
  async function handleLogout(e) {
    e.preventDefault()
    const response = await dispatch(logout())
    // (response)
    if (response?.payload?.success) {

      navigate("/")
    }

  }
  return (
    <div className="min-h-[90vh] overflow-x-hidden">
      <div className="drawer absolute left-0 z-50 w-fit">
        <input className="drawer-toggle" id="my-drawer" type="checkbox" />
        <div className="drawer-content">
          <label htmlFor="my-drawer" className="cursor-pointer relative">
            <FiMenu
              onClick={changeWidth}
              size={"32px"}
              className="font-bold text-white m-4"
            />
          </label>
        </div>
        <div className="drawer-side w-0">
          <label htmlFor="my-drawer" className="drawer-overlay">
          </label>
          <ul className="menu p-4 w-48  h-[100%] sm:w-80 bg-base-200 text-base-content relative">
            <li className="w-fit  absolute right-2 z-50">
              <button onClick={hideDrawer} >
                <AiFillCloseCircle size={24} />
              </button>
            </li>
            <li className='mt-[10%]'>
              <Link to="/">Home</Link>
            </li>
            {isLoggedIn && (role === "admin") &&
              <li>
                <Link to="/admin/deshboard">Admin Deshboard</Link>
              </li>
            }
            {isLoggedIn && (role === "admin") && (
              <li>
                <Link to="/course/create"> Create new course</Link>
              </li>
            )}
            <li>
              <Link to="/courses">All Courses</Link>
            </li>

            <li>
              <Link to="/contact">Contact Us</Link>
            </li>

            <li>
              <Link to="/about">About Us</Link>
            </li>
            {!isLoggedIn && <li>
              <Link to='/adminlogin'>Admin Login</Link>
            </li> }
            
            {!isLoggedIn && (
              <li className="absolute bottom-4 w-[90%]">
                <div className="w-full flex items-center justify-center gap-4">
                  <Link to="/login" className="w-1/2">
                    <button className="w-full bg-yellow-500 text-black px-4 py-2 font-semibold rounded-md hover:bg-yellow-600 transition-all duration-300">
                      Login
                    </button>
                  </Link>

                  <Link to="/signup" className="w-1/2">
                    <button className="w-full border border-yellow-500 text-yellow-500 px-4 py-2 font-semibold rounded-md hover:bg-yellow-600 hover:text-black transition-all duration-300">
                      Signup
                    </button>
                  </Link>
                </div>
              </li>

            )}

            {isLoggedIn && (
              <li className="absolute bottom-4 w-[90%]">
                <div className="w-full flex items-center justify-center gap-4">
                  {/* Profile Button */}
                  <Link to="/user/profile" className="w-1/2">
                    <button className="w-full bg-yellow-500 text-black px-4 py-2 font-semibold rounded-md hover:bg-yellow-600 transition-all duration-300">
                      Profile
                    </button>
                  </Link>

                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="w-1/2 border border-yellow-500 text-yellow-500 px-4 py-2 font-semibold rounded-md hover:bg-yellow-600 hover:text-black transition-all duration-300"
                  >
                    Logout
                  </button>
                </div>
              </li>

            )}




          </ul>
        </div>

      </div>

      {children}
      <Footer />

    </div>
  );
}

export default HomeLayout;
