import { Router } from "express";
import {
  authorizeRoles,
  authorizeSubscriber,
  isLoggedIn,
} from "../middleware/auth.middleware.js";
import upload from "../middleware/multer.middleware.js";
import {
  getAllCourses,
  getLectureByCourseId,
  createCourse,
  editCourse,
  deleteCourse,
  addLectureInCourse,
  editLecture,
  deleteLecture,
} from "../controllers/course.controller.js";
const router = Router();

router
  .route("/")
  .get(getAllCourses)
  .post(
    isLoggedIn,
    authorizeRoles("admin"),
    upload.single("thumbnail"),
    createCourse
  );
router
  .route("/:id")
  .get(isLoggedIn, authorizeSubscriber, getLectureByCourseId)
  .put(isLoggedIn, authorizeRoles("admin"), editCourse)
  .delete(isLoggedIn, authorizeRoles("admin"), deleteCourse)
  .post(
    isLoggedIn,
    authorizeRoles("admin", "user"),
    upload.single("lecture"),
    addLectureInCourse
  );

router
  .route("/:courseId/:lectureId")
  .put(
    isLoggedIn,
    authorizeRoles("admin", "user"),
    upload.single("lecture"),
    editLecture
  )
  .delete(isLoggedIn, authorizeRoles("admin"), deleteLecture);

export default router;
