import { Router } from "express";
import {
  allPayments,
  buySubscription,
  cancelSubscription,
  getRazorpayApiKey,
  verifySubscription,
} from "../controllers/payment.controller.js";
import { authorizeRoles, isLoggedIn } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/razorpay-key").get(isLoggedIn, getRazorpayApiKey);

// 🔹 Subscription APIs
router.route("/subscribe").post(isLoggedIn,buySubscription);

router.route("/verify").post(isLoggedIn,verifySubscription);
router.route("/unsubscribe").post(isLoggedIn,cancelSubscription);

// 🔹 Admin - Get all payments
router.route("/").get(isLoggedIn,authorizeRoles('admin') , allPayments);

export default router;
