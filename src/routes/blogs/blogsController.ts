import { Request, Response } from "express";
import { db } from "../../db/index";
import { eq } from "drizzle-orm";
import _ from "lodash";

import { createBlogSchema, blogTable } from "../../db/blogsSchema";

export async function getBlogs(req: Request, res: Response) {
  try {
    const blogs = await db.select().from(blogTable);
    res.json(blogs);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function getBlogById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const [blog] = await db
      .select()
      .from(blogTable)
      .where(eq(blogTable.id, Number(id)));

    if (!blog) {
      res.status(404).send({ message: "Blog not found" });
    } else {
      res.json(blog);
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function createBlog(req: Request, res: Response) {
  try {
    const data = _.pick(req.body, Object.keys(createBlogSchema.shape));
    const [blog] = await db
      .insert(blogTable)
      .values(req.cleanBody)
      .returning();

    res.status(201).json(blog);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function updateBlog(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const updateFields = req.cleanBody;
    const [blog] = await db
      .update(blogTable)
      .set(updateFields)
      .where(eq(blogTable.id, id))
      .returning();

    if (blog) {
      res.json(blog);
    } else {
      res.status(404).send({ message: "Blog not found" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function deleteBlog(req: Request, res: Response) {
  try {
      const id = Number(req.params.id);
      const [deletedBlog] = await db.delete(blogTable).where(eq(blogTable.id, id)).returning();
      if (!deletedBlog) {
        res.status(404).send({ message: "Blog not found" });
      } else {
        res.json(deletedBlog);}
    } catch (error) {
      res.status(500).send(error);
    }
}

