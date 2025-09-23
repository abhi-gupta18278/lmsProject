import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../utils/axiosInstance";

const initialState = {
  courseData: [],
};
export const getAllCourses = createAsyncThunk("/course/get", async () => {
  try {
    const response = axiosInstance.get("/courses");
    toast.promise(response, {
      loading: "loading course data...",
      success: "Courses loaded successfully",
      error: "Failed to get the courses",
    });

    return (await response).data.courses;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});
export const deleteCourse = createAsyncThunk("/course/delete", async (id) => {
  try {
    const response = axiosInstance.delete(`courses/${id}`);
    toast.promise(response, {
      loading: "loading course data...",
      success: "Courses loaded successfully",
      error: "Failed to get the courses",
    });

    return (await response).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});


export const createNewCourse = createAsyncThunk(
  "/course/create",
  async (data) => {

    try {
      const response = axiosInstance.post("/courses", data);

      toast.promise(response, {
        loading: "Creating Course ...",
        success: (data) => {
          return data?.data?.message;
        },
      });

      return (await response).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCourses.fulfilled, (state, action) => {
      if (action.payload) {
        state.courseData = [...action.payload];
      }
    });
  },
});
export default courseSlice.reducer;
