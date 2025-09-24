import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoute from "./routes/user.route.js";
import connectDB from "./config/db.js";
import errorMiddleware from "./middleware/error.middleware.js";
import AppError from "./utils/error.util.js";
import cloudinary from "cloudinary";
import courseRoute from "./routes/course.route.js";
import paymentRoute from "./routes/payment.route.js";
import Razorpay from "razorpay";
import stateRoute from "./routes/state.route.js";

const app = express();

const Port = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "https://lmsbyabhi.onrender.com",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(cookieParser());
cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

app.use("/api/v1/users", userRoute);
app.use("/api/v1/courses", courseRoute);
app.use("/api/v1/payments", paymentRoute);
app.use("/api/v1", stateRoute);

app.use((req, res, next) => {
  return next(new AppError("Page not found", 404));
});
app.use(errorMiddleware);

app.listen(Port, () => {
  connectDB();
  console.log("your port is listen", Port);
});
