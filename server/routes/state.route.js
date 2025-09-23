import { Router } from "express";
import { authorizeRoles, isLoggedIn } from "../middleware/auth.middleware.js";

import userStats from "../controllers/state.controller.js";

const router = Router();

router
  .route("/admin/stats/users")
  .get(isLoggedIn, authorizeRoles("admin"), userStats);

export default router;
