import Course from "../models/courseSchema.js";
import AppError from "../utils/error.util.js";
import mongoose from "mongoose";
import cloudinary from "cloudinary";
import fs from "fs/promises";

const getAllCourses = async (req, res, next) => {
  try {
    const courses = await Course.find({}).select("-lectures");

    if (courses.length === 0) {
      return next(new AppError("No course available", 404));
    }
    // console.log(courses)

    res.status(200).json({
      success: true,
      message: "All Courses",
      courses,
    });
  } catch (err) {
    return next(new AppError(err.message, 500));
  }
};

const getLectureByCourseId = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new AppError("Invalid Course Id", 400));
    }

    const course = await Course.findById(id);

    if (!course) {
      return next(new AppError("Invalid Course Id", 400));
    }

    res.status(200).json({
      success: true,
      message: "All Lectures",
      lectures: course.lectures,
    });
  } catch (err) {
    return next(new AppError("invalid request", 500));
  }
};

const createCourse = async (req, res, next) => {
  const { title, description, category, createdBy } = req.body;
  if (!title || !description || !category || !createdBy) {
    return next(new AppError("All fields are required", 400));
  }

  let course = {};
  try {
    let thumbnail = {
      public_id: "dummy",
      secure_url: "http://dummy.com",
    };

    if (req?.file) {

      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "lms",
      });
      thumbnail = {
        public_id: result.public_id,
        secure_url: result.secure_url,
      };
      await fs.rm(`uploads/${req.file.filename}`);
    }

    // Create course
    course = await Course.create({
      title,
      description,
      category,
      createdBy,
      thumbnail,
    });
  } catch (error) {
    if (course?._id) {
      await Course.findByIdAndDelete(course._id); // rollback if something went wrong
    }
    return next(new AppError("Course creation failed. Try again.", 500));
  }

  res.status(201).json({
    success: true,
    message: "Course created successfully",
    course,
  });
};

const editCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await Course.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      {
        new: true, //return updated documents
        runValidators: true,
      }
    );
    if (!course) {
      return next(new AppError("Course of the given id does not exist", 404));
    }

    res.status(200).json({
      success: true,
      message: "Course updated success",
      course,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
const deleteCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await Course.findByIdAndDelete(id);
    if (!course) {
      return next(new AppError("Course with the given ID does not exist", 404));
    }
    res.status(201).json({
      success: true,
      message: "Course deleted successfully",
      course,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

const addLectureInCourse = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    // console.log(title,description)
    const { id } = req.params;
    if (!title || !description) {
      return next(new AppError("All field are required", 400));
    }
    const course = await Course.findById(id).select("+lectures");
    if (!course) {
      return next(new AppError("Course not found", 404));
    }
    const lectureData = {
      title,
      description,
      lecture: {
        public_id: "dummy",
        secure_url: "http://dummy.com",
      },
    };
    // console.log(lectureData)
    try {
      if (req.file) {
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: 'lms', // Save files in a folder named lms
        chunk_size: 50000000, // 50 mb size
        resource_type: 'video',
      });
        if (!result) {
          return next(new AppError("Video Upload failed", 400));
        }

        lectureData.lecture.public_id = result.public_id;
        lectureData.lecture.secure_url = result.secure_url;
      }
      // console.log(lectureData)
      await fs.rm(`uploads/${req.file.filename}`);
    } catch (error) {
      return next(new AppError(err.message, 500));
    }
    course.lectures.push(lectureData);
    course.numberofLecture = course?.lectures?.length;
    // console.log(course.numberofLecture )
    await course.save();
    res.status(201).json({
      success: true,
      message: "Lecture added Successfully",
      course,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

const editLecture = async (req, res, next) => {
  try {
    const { courseId, lectureId } = req.params;

    // Find course
    const course = await Course.findById(courseId).select("+lectures");
    if (!course) {
      return next(new AppError("Course not found", 404));
    }

    // Find lecture inside course
    const lecture = course.lectures.id(lectureId);
    if (!lecture) {
      return next(new AppError("Lecture not found", 404));
    }

    // Update lecture details
    if (req.body.title) lecture.title = req.body.title;
    if (req.body.description) lecture.description = req.body.description;

    // If new file uploaded → replace video in cloudinary
    if (req.file) {
      // delete old video from cloudinary
      if (lecture.lecture.public_id) {
        await cloudinary.v2.uploader.destroy(lecture.lecture.public_id);
      }

      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "lms",
      });

      lecture.lecture.public_id = result.public_id;
      lecture.lecture.secure_url = result.secure_url;

      // delete local file
      await fs.rm(`uploads/${req.file.filename}`);
    }

    await course.save();

    res.status(200).json({
      success: true,
      message: "Lecture updated successfully",
      lecture,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

const deleteLecture = async (req, res, next) => {
  try {
    const { courseId, lectureId } = req.params;


    // Find course
    const course = await Course.findById(courseId).select("+lectures");
    if (!course) {
      return next(new AppError("Course not found", 404));
    }
    // console.log(course)

    // Find lecture inside course
    const lecture = course.lectures.id(lectureId);
    if (!lecture) {
      return next(new AppError("Lecture not found", 404));
    }

    // If video exists → delete from Cloudinary
    if (lecture.lecture?.public_id) {
      await cloudinary.v2.uploader.destroy(lecture.lecture.public_id);
    }

    // Remove lecture
    course.lectures.remove(lecture);

    // Update lecture count
    course.numberofLecture = course.lectures.length;

    await course.save();

    res.status(200).json({
      success: true,
      message: "Lecture deleted successfully",
      lectures: course.lectures,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

export {
  getAllCourses,
  getLectureByCourseId,
  createCourse,
  editCourse,
  deleteCourse,
  addLectureInCourse,
  editLecture,
  deleteLecture,
};
