import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../utils/axiosInstance";

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") || false,
  role: localStorage.getItem("role") || "",
  data: JSON.parse(localStorage.getItem("data")) || {},
};

export const createAccount = createAsyncThunk("auth/signup", async (data) => {
  try {
    const res = axiosInstance.post("/users/register", data);
    toast.promise(res, {
      loading: "Wait! Create Your Account",
      success: (data) => {
        return data?.data?.message;
      },
    });
    return (await res).data;
  } catch (err) {
    toast.error(err?.response?.data?.message);
  }
});

export const login = createAsyncThunk("auth/login", async (data) => {
  try {
    const res = axiosInstance.post("/users/login", data);
    // console.log(res);
    toast.promise(res, {
      loading: "Wait! Authentication",
      success: (data) => {
        return data?.data?.message;
      },
    });
    return (await res).data;
  } catch (err) {
    toast.error(err?.response?.data?.message);
  }
});
export const adminLogin = createAsyncThunk(
  "auth/adminLogin",
  async (data, { rejectWithValue }) => {
    try {
      const res = axiosInstance.post("/users/adminlogin", data);
      // console.log(res);
      toast.promise(res, {
        loading: "Wait! Authentication",
        success: (data) => {
          return data?.data?.message;
        },
        error: "fail to login",
      });
      return (await res).data;
    } catch (err) {
      toast.error(err?.response?.data?.message);
      return rejectWithValue(
        err?.response?.data?.message || "Something went wrong"
      );
    }
  }
);
export const updateProfile = createAsyncThunk(
  "/user/update/profile",
  async (data) => {
    try {
      const res = axiosInstance.put(`users/update/${data[0]}`, data[1]);
      toast.promise(res, {
        loading: "Wait! profile update in progress...",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to update profile",
      });
      return (await res).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

export const getUserData = createAsyncThunk("/user/details", async () => {
  try {
    const res = axiosInstance.get("users/me");
    return (await res).data;
  } catch (error) {
    toast.error(error.message);
  }
});

export const logout = createAsyncThunk("/auth/logout", async () => {
  try {
    const res = axiosInstance.get("/users/logout");
    toast.promise(res, {
      loading: "Wait! Authentication",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Fail to Login account",
    });
    return (await res).data;
  } catch (err) {
    toast.error(err?.response?.data?.message);
  }
});
export const changePassword = createAsyncThunk(
  "/user/changePassword",
  async (data) => {
    try {
      const res = axiosInstance.post("/users/change-password", data);
      toast.promise(res, {
        loading: "Wait.. Password Changing",
        success: "Password Successfully Changed",
        error: "Fail to Change Password",
      });
      return (await res).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);
export const forgotPassword = createAsyncThunk(
  "/forgotPassword/reset",
  async (data) => {
    try {
      const res = axiosInstance.post("/users/reset", data);
      // console.log(res)
      toast.promise(res, {
        loading: "Wait....",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Fail to password reset",
      });
      return await res;
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "/user/resetPassword",
  async (data) => {
    try {
      const res = axiosInstance.post(`/users/reset/${data[0]}`, data[1]);
      toast.promise(res, {
        loading: "Wait....",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Fail to password reset",
      });
      return await res;
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createAccount.fulfilled, (state, action) => {
      // console.log(action)
      localStorage.setItem("data", JSON.stringify(action?.payload?.newUser));
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("role", action?.payload?.newUser?.role);
      (state.isLoggedIn = true), (state.role = action?.payload?.newUser?.role);
      state.data = action?.payload?.newUser;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      // console.log(action)
      localStorage.setItem("data", JSON.stringify(action?.payload?.user));
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("role", action?.payload?.user?.role);
      (state.isLoggedIn = true), (state.role = action?.payload?.user?.role);
      state.data = action?.payload?.user;
    });
    builder.addCase(adminLogin.rejected, (state) => {
      (state.isLoggedIn = false), (state.role = "");
      state.data = {};
    });
    builder.addCase(adminLogin.fulfilled, (state, action) => {
      localStorage.setItem("data", JSON.stringify(action?.payload?.admin));
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("role", action?.payload?.admin?.role);
      (state.isLoggedIn = true), (state.role = action?.payload?.admin?.role);
      state.data = action?.payload?.admin;
    });
    builder.addCase(logout.fulfilled, (state) => {
      localStorage.clear();
      state.isLoggedIn = false;
      state.data = {};
      state.role = "";
    });
    builder.addCase(getUserData.fulfilled, (state, action) => {
      if (!action?.payload?.user) return;
      localStorage.setItem("data", JSON.stringify(action?.payload?.user));
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("role", action?.payload?.user?.role);
      state.isLoggedIn = true;
      state.data = action?.payload?.user;
      state.role = action?.payload?.user?.role;
    });
  },
});

// export const {  } = authSlice.actions;
export default authSlice.reducer;
