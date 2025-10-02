import User from "../models/userSchema.js";
import AppError from "../utils/error.util.js";
import jwt from "jsonwebtoken";
const isLoggedIn = async (req, res, next) => {
  try {
    const token  = req.cookies?.token;
    // console.log(token)
    if (!token) {
      return next(new AppError("UnAuthoriziation Access,Please Login", 400));
    }
    const decode = jwt.verify(token, process.env.JSONTOKEN_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    return next(new AppError("Invalid error", 500));
  }
};
const authorizeRoles =
  (...roles) =>
  async (req, res, next) => {
    const currentRole = req.user.role;
    if (!roles.includes(currentRole)) {
      return next(
        new AppError(
          `${req.user.role} is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };

const authorizeSubscriber = async (req, res, next) => {
  const user = await User.findById(req.user.id)
  const subscription = user.subscription;
  const currentUserRole = user.role;
  if (currentUserRole !== "admin" && subscription.status !== "active") {
    return next(
      new AppError(`You are not allowed to access this resource`, 403)
    );
  }
  next();
};

export { isLoggedIn, authorizeRoles, authorizeSubscriber };
