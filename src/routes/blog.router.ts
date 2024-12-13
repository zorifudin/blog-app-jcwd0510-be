import { Router } from "express";
import { getSamplesController } from "../controllers/sample.controller";
import {
  createBlogsController,
  getBlogsController,
} from "../controllers/blog.controller";
import { uploader } from "../lib/multer";
import { fileFilter } from "../lib/fileFilter";
import { validateCreateBlog } from "../validators/blog.validator";
import { verifyToken } from "../lib/jwt";

const router = Router();

router.get("/", getBlogsController);
router.post(
  "/",
  verifyToken,
  uploader().fields([{ name: "thumbnail", maxCount: 1 }]),
  fileFilter,
  validateCreateBlog,
  createBlogsController
);

export default router;
