// import r from 'razorpay'
import { razorpay } from "../index.js";
import User from "../models/userSchema.js";
import dayjs from "dayjs";
import AppError from "../utils/error.util.js";
import { config } from "dotenv";
import crypto from "crypto";
import Payment from "../models/paymentSchema.js";
config();

const getRazorpayApiKey = async (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "Razorpay API KEY",
    key: process.env.RAZORPAY_KEY_ID,
  });
};
const buySubscription = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id);

    if (!user) {
      return next(new AppError("UnAuthorized User Please Login ", 400));
    }
    if (req.user.role === "admin") {
      return next(new AppError("Admin can not purchase subscription ", 400));
    }

    const subscription = await razorpay.subscriptions.create({
      plan_id: process.env.RAZORPAY_PLAN_ID,
      customer_notify: 1,
      total_count: 12,
    });

    user.subscription.id = subscription.id;
    user.subscription.status = subscription.status;

    await user.save();
    res.status(200).json({
      success: true,
      message: "Subscribe",
      subscription_id: subscription.id,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
const verifySubscription = async (req, res, next) => {
  try {
    const { id } = req.user;
    const {
      razorpay_payment_id,
      razorpay_subscription_id,
      razorpay_signature,
    } = req.body;
    const user = await User.findById(id);
    if (!user) {
      return next(new AppError("UnAuthorized User Please Login ", 400));
    }

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_payment_id}|${razorpay_subscription_id}`)
      .digest("hex");
    if (generatedSignature !== razorpay_signature) {
      return next(new AppError("payment not verified,Please try again", 400));
    }
    await Payment.create({
      razorpay_payment_id,
      razorpay_subscription_id,
      razorpay_signature,
    });

    user.subscription.status = "active";

    await user.save();
    res.status(200).json({
      success: true,
      message: "Payment verified Successfully",
      subscriptionId: user.subscription.id,
    });
  } catch (error) {
    return next(new AppError(`${error.message}`, 500));
  }
};
const cancelSubscription = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id);

    if (!user) {
      return next(new AppError("UnAuthorized User Please Login ", 400));
    }
    if (req.user.role === "admin") {
      return next(new AppError("Admin can not purchase subscription ", 400));
    }

    const subscriptionId = user.subscription.id;
    const subscription = await razorpay.subscriptions.cancel(subscriptionId);
    user.subscription.status = subscription.status;
    await user.save();
    res.status(200).json({
      success: true,
      message: "Subscribe Canceled ",
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
const allPayments = async (req, res, next) => {
  try {
    const { count } = req.params;
    const startOfMonth = dayjs().startOf("month").unix();
    const endOfMonth = dayjs().endOf("month").unix();
    const subscription = await razorpay.subscriptions.all({
      count: count || 10,
    });
    const monthlySalesRecord = await razorpay.subscriptions.all({
      count: count || 10,
      from: startOfMonth,
      to: endOfMonth,
    });
    res.status(200).json({
      success: true,
      message: "All Records",
      subscription,
      monthlySalesRecord,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

export {
  getRazorpayApiKey,
  buySubscription,
  verifySubscription,
  cancelSubscription,
  allPayments,
};
