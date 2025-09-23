import { useEffect } from "react";
import toast from "react-hot-toast";
import { BiRupee } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import HomeLayout from '../../Layouts/HomeLayout';
import { getRazorPayId, purchaseCourseBundle, verifyUserPayment } from "../../Redux/Slices/razorPaySlice.js";

function Checkout() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const razorpayKey = useSelector((state) => state?.razorpay?.key);
  const subscription_id = useSelector((state) => state?.razorpay?.subscription_id);
  const paymentDetails = {
    razorpay_payment_id: "",
    razorpay_subscription_id: "",
    razorpay_signature: ""
  }
  async function handleSubscription(e) {
    e.preventDefault();
    if (!razorpayKey || !subscription_id) {
      toast.error("Something went wrong");
      return;
    }
    const options = {
      key: razorpayKey,
      subscription_id: subscription_id,
      name: "Coursify Pvt. Ltd.",
      description: "Subscription",
      theme: {
        color: '#F37254'
      },
      prefill: {
        name: "Test User",
        email: "test@example.com",
        contact: "9999999999",
      },
      handler: async function (response) {
        paymentDetails.razorpay_payment_id = response.razorpay_payment_id;
        paymentDetails.razorpay_signature = response.razorpay_signature;
        paymentDetails.razorpay_subscription_id = response.razorpay_subscription_id;

        toast.success("Payment successfull");

        const res = await dispatch(verifyUserPayment(paymentDetails));
        res?.payload?.success ? navigate("/checkout/success") : navigate("/checkout/fail");
      }
    }
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  async function load() {
    await dispatch(getRazorPayId());
    await dispatch(purchaseCourseBundle());
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <HomeLayout>
      <form
        onSubmit={handleSubscription}
        className="min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-4"
      >
        <div className="w-full max-w-md sm:max-w-lg md:max-w-xl bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
          <div className="relative bg-gradient-to-r from-yellow-400 to-orange-500 p-6 text-center">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Subscription Bundle
            </h1>
          </div>
          <div className="p-6 sm:p-8 space-y-6 text-center text-white">
            <p className="text-base sm:text-lg leading-relaxed">
              Unlock access to <span className="font-semibold text-yellow-300">all courses</span> on our platform for a full{" "}
              <span className="font-bold text-yellow-300">1-year duration</span>. Enjoy both existing and newly launched courses with no limits!
            </p>
            <p className="flex items-center justify-center gap-2 text-3xl sm:text-4xl font-bold text-yellow-300">
              <BiRupee className="text-yellow-300" />
              <span>499</span> <span className="text-lg sm:text-xl font-medium">only</span>
            </p>
            <div className="text-gray-300 text-sm sm:text-base">
              <p>100% refund on cancellation</p>
              <p className="text-xs sm:text-sm italic">* Terms and conditions apply *</p>
            </div>
            <button
              type="submit"
              className="w-full py-3 px-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-lg sm:text-xl font-semibold rounded-lg hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Buy Now
            </button>
          </div>
        </div>
      </form>
    </HomeLayout>
  );

}

export default Checkout;