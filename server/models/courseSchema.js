import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: [6, "Title should be at least 8 characters long"],
      maxlength: [60, "Title should be less than 60 characters"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: [20, "Description should be at least 20 characters long"],
      maxlength: [200, "Description should be less than 200 characters"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    thumbnail: {
      public_id: {
        type: String,
        required: true,
      },
      secure_url: {
        type: String,
        required: true,
      },
    },
    lectures: [
      {
        title: {
          type: String,
          required: true,
          minlength: [6, "Lecture title should be at least 6 characters long"],
          maxlength: [40, "Lecture title should be less than 40 characters"],
          trim: true,
        },
        description: {
          type: String,
          required: [true, "Lecture description is required"],
          minlength: [10, "Lecture description should be at least 20 characters long"],
          maxlength: [200, "Lecture description should be less than 200 characters"],
        },
        lecture: {
          public_id: {
            type: String,
            required: true,
          },
          secure_url: {
            type: String,
            required: true,
          },
        },
      },
    ],
    numberofLecture:{
      type:Number,
      default:0
    },
    createdBy: {
      type: String, 
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model("Course", courseSchema);
export default Course;
