import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      minlength: [3, "name is to short"],
      maxlength: [30, "name is too long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Invalid email format"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false, // by default don't send password in queries
    },
    avatar: {
      public_id: {
        type: String,
      },
      secure_url: {
        type: String,
      },
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
    subscription:{
      id:String,
      status:String,
    }
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods = {
  generatejwtToken: async function () {
    return jwt.sign(
      {
        id: this._id,
        email: this.email,
        subscription: this.subscription,
        role: this.role,
      },
      process.env.JSONTOKEN_SECRET,
      {
        expiresIn:"24h", //for 7 days
      }
    );
  },
  comparePassword: async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
}

};

const User = mongoose.model("User", userSchema);

export default User;
