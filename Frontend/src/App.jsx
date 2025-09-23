import { Route, Routes } from "react-router-dom"

import RequireAuth from "./component/Auth/RequireAuth.jsx"
import Denied from "./component/Denied.jsx"
import PageNot from "./component/PageNot"
import ChangePassword from "./component/Passoword/ChangePassword.jsx"
import ForgotPassword from "./component/Passoword/ForgotPassword.jsx"
import ResetForm from "./component/Passoword/ResetForm.jsx"
import AboutUs from "./pages/AboutUs"
import AdminLogin from "./pages/AdminLogin.jsx"
import Contactus from "./pages/Contactus.jsx"
import CourseDescription from "./pages/course/CourseDescription.jsx"
import CourseList from "./pages/course/CourseList.jsx"
import CreateCourse from "./pages/course/CreateCourse.jsx"
import Home from "./pages/Home"
import AddLecture from "./pages/lecture/AddLecture.jsx"
import AdminDeshboard from "./pages/lecture/AdminDeshboard.jsx"
import Lecture from "./pages/lecture/Lecture.jsx"
import Login from "./pages/Login.jsx"
import CheckOut from "./pages/payment/CheckOut.jsx"
import CheckOutFail from './pages/payment/CheckOutFail.jsx'
import CheckOutSuccess from './pages/payment/CheckOutSuccess.jsx'
import Signup from "./pages/Signup.jsx"
import EditProfile from "./pages/user/EditProfile.jsx"
import Profile from "./pages/user/Profile.jsx"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/adminlogin" element={<AdminLogin />} />

        <Route path="/courses" element={<CourseList />} />
        <Route path="/contact" element={<Contactus />} />
        <Route path="/denied" element={<Denied />} />
        <Route path="/course/description" element={<CourseDescription />} />
        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/reset/:id" element={<ResetForm />} />

        <Route element={<RequireAuth myRole={['admin']} />}>
          <Route path="/course/create" element={<CreateCourse />} />
          <Route path="/course/addlecture" element={<AddLecture />} />
          <Route path="/admin/deshboard" element={<AdminDeshboard />} />
        </Route>
        <Route element={<RequireAuth myRole={['admin', 'user']} />}>
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/editProfile" element={<EditProfile />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/checkout/success" element={<CheckOutSuccess />} />
          <Route path="/checkout/fail" element={<CheckOutFail />} />
          <Route path="/course/displaylectures" element={<Lecture />} />
        </Route>




        <Route path="*" element={<PageNot />} ></Route>
      </Routes>

    </>
  )
}


export default App
