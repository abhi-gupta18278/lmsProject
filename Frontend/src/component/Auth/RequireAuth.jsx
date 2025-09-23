
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const RequireAuth = ({ myRole }) => {
  const { role, isLoggedIn } = useSelector((state) => state.auth)

  return (isLoggedIn && myRole?.includes(role)) ? <Outlet /> : (isLoggedIn ? (<Navigate to='/denied' />) : ((<Navigate to='/login' />)))
}

export default RequireAuth;
