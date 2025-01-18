import { createInsertSchema } from "drizzle-zod";
import { Router } from "express";

import {
  getProducts,
  getProductsById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./productController";
import { validateData } from "../../middlewares/validationmiddlewares";
import { createProductSchema, updateProductSchema } from "../../db/productSchema";

const router = Router();

router.get("/", getProducts);

router.get("/:id", getProductsById);

router.post("/", validateData(createProductSchema), createProduct);

router.put("/:id", validateData(updateProductSchema), updateProduct);

router.delete("/:id", deleteProduct);

export default router;
