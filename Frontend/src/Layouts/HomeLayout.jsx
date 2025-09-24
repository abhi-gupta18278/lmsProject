import { AiFillCloseCircle } from 'react-icons/ai';
import { FiMenu } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import Footer from '../component/Footer';
import { logout } from '../Redux/Slices/authSlice';

const HomeLayout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
  const role = useSelector((state) => state?.auth?.role);

  // Toggle drawer width for opening
  const changeWidth = () => {
    const drawerSide = document.getElementsByClassName('drawer-side');
    drawerSide[0].style.width = 'auto';
  };

  // Hide drawer by resetting width and unchecking toggle
  const hideDrawer = () => {
    const element = document.getElementsByClassName('drawer-toggle');
    element[0].checked = false;
    const drawerSide = document.getElementsByClassName('drawer-side');
    drawerSide[0].style.width = '0';
  };

  // Handle logout action
  const handleLogout = async (e) => {
    e.preventDefault();
    const response = await dispatch(logout());
    if (response?.payload?.success) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-gray-100 dark:bg-gray-900">
      {/* Drawer Navigation */}
      <div className="drawer absolute left-0 z-50 w-fit">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label htmlFor="my-drawer" className="cursor-pointer relative">
            <FiMenu
              onClick={changeWidth}
              size="32px"
              className="font-bold text-white m-4 hover:text-indigo-400 transition-colors duration-300"
            />
          </label>
        </div>
        <div className="drawer-side w-0">
          <label htmlFor="my-drawer" className="drawer-overlay bg-black/50"></label>
          <ul className="menu p-4 w-64 sm:w-80 h-full bg-gradient-to-b from-indigo-600 to-purple-700 text-white relative shadow-lg">
            {/* Close Button */}
            <li className="absolute right-2 top-4">
              <button onClick={hideDrawer}>
                <AiFillCloseCircle size={24} className="text-white hover:text-yellow-300 transition-colors duration-300" />
              </button>
            </li>
            {/* Navigation Links */}
            <li className="mt-16 sm:mt-12">
              <Link to="/" className="text-lg font-medium hover:bg-indigo-800 rounded-md transition-all duration-300">
                Home
              </Link>
            </li>
            {isLoggedIn && role === 'admin' && (
              <>
                <li>
                  <Link
                    to="/admin/deshboard"
                    className="text-lg font-medium hover:bg-indigo-800 rounded-md transition-all duration-300"
                  >
                    Admin Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/course/create"
                    className="text-lg font-medium hover:bg-indigo-800 rounded-md transition-all duration-300"
                  >
                    Create New Course
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link to="/courses" className="text-lg font-medium hover:bg-indigo-800 rounded-md transition-all duration-300">
                All Courses
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-lg font-medium hover:bg-indigo-800 rounded-md transition-all duration-300">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-lg font-medium hover:bg-indigo-800 rounded-md transition-all duration-300">
                About Us
              </Link>
            </li>
            {!isLoggedIn && (
              <li>
                <Link
                  to="/adminlogin"
                  className="text-lg font-medium hover:bg-indigo-800 rounded-md transition-all duration-300"
                >
                  Admin Login
                </Link>
              </li>
            )}
            {/* Auth Buttons */}
            {!isLoggedIn && (
              <li className="absolute bottom-4 w-[90%]">
                <div className="flex items-center justify-center gap-4">
                  <Link to="/login" className="w-1/2">
                    <button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-4 py-2 font-semibold rounded-md hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 shadow-md">
                      Login
                    </button>
                  </Link>
                  <Link to="/signup" className="w-1/2">
                    <button className="w-full border border-yellow-400 text-yellow-400 px-4 py-2 font-semibold rounded-md hover:bg-yellow-400 hover:text-black transition-all duration-300 shadow-md">
                      Signup
                    </button>
                  </Link>
                </div>
              </li>
            )}
            {isLoggedIn && (
              <li className="absolute bottom-4 w-[90%]">
                <div className="flex items-center justify-center gap-4">
                  <Link to="/user/profile" className="w-1/2">
                    <button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-4 py-2 font-semibold rounded-md hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 shadow-md">
                      Profile
                    </button>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-1/2 border border-yellow-400 text-yellow-400 px-4 py-2 font-semibold rounded-md hover:bg-yellow-400 hover:text-black transition-all duration-300 shadow-md"
                  >
                    Logout
                  </button>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <main className="relative z-10">{children}</main>
      <Footer />
    </div>
  );
};

export default HomeLayout;