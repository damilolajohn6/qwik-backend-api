import { Router } from "express";

import { getBlogs, createBlog, updateBlog, deleteBlog } from "./blogsController";
import { validateData } from "../../middlewares/validationmiddlewares";
import { createBlogSchema, updateBlogSchema } from "../../db/blogsSchema";

const router = Router();

router.get("/", getBlogs);

router.post("/", validateData(createBlogSchema), createBlog);

router.put("/:id", validateData(updateBlogSchema) , updateBlog);

router.delete("/:id", deleteBlog);

export default router;
