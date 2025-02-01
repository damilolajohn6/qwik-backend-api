import { Router } from "express";

import {
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogById,
} from "./blogsController.js";
import { validateData } from "../../middlewares/validationmiddlewares.js";
import { createBlogSchema, updateBlogSchema } from "../../db/blogsSchema.js";
import { verifyToken, verifyAdmin } from "../../middlewares/authmiddleware.js";

const router = Router();

router.get("/", getBlogs);

router.get("/:id", getBlogById);

router.post(
  "/",
  // @ts-ignore
  verifyToken,
  verifyAdmin,
  validateData(createBlogSchema),
  createBlog
);

router.put(
  "/:id",
  // @ts-ignore
  verifyToken,
  verifyAdmin,
  validateData(updateBlogSchema),
  updateBlog
);

router.delete(
  "/:id",
  // @ts-ignore
  verifyToken,
  verifyAdmin,
  deleteBlog
);

export default router;
