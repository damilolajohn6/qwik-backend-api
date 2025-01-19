import { Router } from "express";

import {
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} from "./blogsController";
import { validateData } from "../../middlewares/validationmiddlewares";
import { createBlogSchema, updateBlogSchema } from "../../db/blogsSchema";
import { verifyToken, verifyAdmin } from "../../middlewares/authmiddleware";

const router = Router();

router.get("/", getBlogs);

router.post(
  "/",
  verifyToken,
  verifyAdmin,
  validateData(createBlogSchema),
  createBlog
);

router.put("/:id", validateData(updateBlogSchema), updateBlog);

router.delete("/:id", deleteBlog);

export default router;
