import User from "../models/userSchema.js";
import AppError from "../utils/error.util.js";
import cloudinary from "cloudinary";
import fs from "fs/promises";
import crypto from "crypto";
import sendMail from "../utils/sendEmail.js";

const cookieOptions = {
  maxAge: 7 * 24 * 60 * 60 * 1000,
  httpOnly: true,
  secure: true,
  sameSite: "None",
};

const register = async (req, res, next) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const { username, email, password } = req.body;
  if (!username || !password || !email) {
    return next(new AppError("All field required", 400));
  }
  if (!emailRegex.test(email)) {
    return next(new AppError("Invalid Email Formet", 400));
  }
  if (password.length < 6) {
    return next(new AppError("Password must be greater then 6 charecter", 400));
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new AppError("Email Already exist", 400));
    }
    const newUser = await User.create({
      username,
      password,
      email,
      avatar: {
        public_id: email,
        secure_url:
          "https://images.unsplash.com/photo-1755217908514-785dbc5ad381?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    });

    if (!newUser) {
      return next(new AppError("User not created", 400));
    }

    // profile image upload here

    if (!req.file) {
      return next(new AppError("file upload fail", 400));
    }
    if (req.file) {
      try {
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: "lms",
          height: 250,
          width: 250,
          gravity: "faces",
          crop: "fill",
        });
        if (result) {
          newUser.avatar.public_id = result.public_id;
          newUser.avatar.secure_url = result.secure_url;
          // delete in my local machine
          await fs.rm(`uploads/${req.file.filename}`);
        }
      } catch (err) {
        return next(new AppError("fail to upload file ", 400));
      }
    }

    await newUser.save();
    newUser.password = undefined;

    const token = await newUser.generatejwtToken();
    res.cookie("token", token, cookieOptions);
    return res.status(201).json({
      success: true,
      message: "Register success",
      newUser,
    });
  } catch (error) {
    return next(new AppError(`${error.message}`, 500));
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("All field required", 400));
  }
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new AppError("email not register", 400));
    }

    const isMatch = await user.comparePassword(password);
    if (!user || !isMatch) {
      return next(new AppError("Invalid email or password"), 400);
    }

    user.password = undefined;
    const token = await user.generatejwtToken();
    if (!token) {
      return next(new AppError("Token not created", 400));
    }
    res.cookie("token", token, cookieOptions);
    res.status(201).json({
      success: true,
      message: "Login successfully",
      user,
    });
  } catch (error) {
    return next(new AppError(`${error.message}`, 500));
  }
};
const adminLogin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("All field Required", 400));
  }
  try {
    const admin = await User.findOne({ email }).select("+password");
    if (!admin) {
      return next(new AppError("email not register", 400));
    }
    if (admin?.role !== "admin") {
      return next(new AppError("Your Role is not admin", 400));
    }
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return next(new AppError("Enter correct Password", 400));
    }
    admin.password = undefined;
    const token = await admin.generatejwtToken();
    if (!token) {
      return next(new AppError("Token not created", 400));
    }
    res.cookie("token", token, cookieOptions);
    res.status(201).json({
      success: true,
      message: "Login successfully",
      admin,
    });
  } catch (error) {
    return next(new AppError(`${error.message}`, 500));
  }
};

const logout = async (req, res, next) => {
  try {
    res.cookie("token", null, {
      httpOnly: true,
      expires: new Date(0),
      secure: true,
    });
    res.status(200).json({
      success: true,
      message: "Logout successfully",
    });
  } catch (error) {
    return next(new AppError(`${error.message}`, 500));
  }
};

const profile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    // console.log(userId)
    const user = await User.findById(userId);
    if (!user) {
      return next(new AppError("User not found", 400));
    }

    res.status(200).json({
      success: true,
      message: "welcome to profile",
      user,
    });
  } catch (error) {
    return next(new AppError("Internal Server Error", 500));
  }
};
const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  // console.log(email)
  if (!email) {
    return next(new AppError("email is required", 400));
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(new AppError("Email not register", 400));
    }
    const resetToken = crypto.randomBytes(32).toString("hex");

    user.forgotPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    user.forgotPasswordExpiry = Date.now() + 10 * 60 * 1000;
    // console.log(user)
    await user.save();

    const message = `click the link fo reset password :
  ${process.env.FRONTEND_URL}/reset/${resetToken}`;
    // console.log(message);

    // Email
    try {
      await sendMail({
        email: user.email, // user email
        subject: "Reset password",
        message: message,
      });
    } catch (error) {
      user.forgotPasswordToken = undefined;
      user.forgotPasswordExpiry = undefined;
      await user.save();
      return next(new AppError("Fail to send Email", 400));
    }
    res.status(201).json({
      success: true,
      message: "Password reset will be send in your register email",
    });
  } catch (err) {
    return next(new AppError("Fail to reset Password ", 400));
  }
};

const resetPassword = async (req, res, next) => {
  const { resetToken } = req.params;
  const { password } = req.body;
  if (!resetToken) {
    return next(new AppError("invalid request", 400));
  }

  if (!password) {
    return next(new AppError("password is required", 400));
  }
  let forgotPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  try {
    const user = await User.findOne({
      forgotPasswordToken,
      forgotPasswordExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return next(
        new AppError("Token is invalid Please give the valid token", 400)
      );
    }
    user.password = password;
    user.forgotPasswordExpiry = undefined;
    user.forgotPasswordToken = undefined;
    await user.save();
    res.status(200).json({
      success: true,
      message: "Reset password successfull",
    });
  } catch (error) {
    return next(new AppError("reset password fail please try again", 400));
  }
};

const changePassword = async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  const { id } = req.user;

  if (!oldPassword || !newPassword) {
    return next(new AppError("All field required", 400));
  }
  if (newPassword.length < 6) {
    return next(new AppError("password should be greater then 6 letter"));
  }
  try {
    const user = await User.findById(id).select("+password");
    if (!user) {
      return next(new AppError("User not register", 400));
    }

    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) {
      return next(new AppError("Enter the right password", 400));
    }
    user.password = newPassword;
    await user.save();
    user.password = undefined;
    return res.status(200).json({
      success: true,
      message: "Password successfully updated",
    });
  } catch (err) {
    return next(new AppError("Changing password fail try again", 400));
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const { username } = req.body;
    const id = req.user.id;

    const user = await User.findById(id);
    if (!user) {
      return next(new AppError("User does not exist", 400));
    }

    // update username
    if (username) {
      user.username = username;
    }

    // update avatar if file is uploaded
    if (req.file) {
      // delete old avatar
      await cloudinary.v2.uploader.destroy(user.avatar.public_id);

      try {
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: "lms",
          height: 250,
          width: 250,
          gravity: "faces",
          crop: "fill",
        });

        user.avatar.public_id = result.public_id;
        user.avatar.secure_url = result.secure_url;

        // delete from local machine
        await fs.rm(`uploads/${req.file.filename}`);
      } catch (err) {
        return next(new AppError("Fail to upload file", 400));
      }
    }

    // save and respond
    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
    });
  } catch (err) {
    next(err);
  }
};

export {
  register,
  login,
  adminLogin,
  logout,
  profile,
  forgotPassword,
  resetPassword,
  changePassword,
  updateProfile,
};
