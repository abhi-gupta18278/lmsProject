import { configureStore } from "@reduxjs/toolkit";

import authSliceReducer from "./Slices/authSlice.js";
import courseSliceReducer from "./Slices/courseSlice.js";
import lectureSliceReducer from './Slices/lectureSlice.js'
import razorpaySliceReducer from "./Slices/razorPaySlice.js";
import statSliceReducer from "./Slices/statSlice.js";

export const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    course: courseSliceReducer,
    razorpay: razorpaySliceReducer,
    lecture:lectureSliceReducer,
    stat:statSliceReducer,
  },
  devTools: true,
});
