import { createInsertSchema } from "drizzle-zod";
import { Router } from "express";

import {
  getProducts,
  getProductsById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./productController.js";
import { validateData } from "../../middlewares/validationmiddlewares.js";
import {
  createProductSchema,
  updateProductSchema,
} from "../../db/productSchema.js";
import { verifyAdmin, verifyToken } from "../../middlewares/authmiddleware.js";

const router = Router();

router.get("/", getProducts);

router.get("/:id", getProductsById);

// @ts-ignore

router.post(
  "/",
  // @ts-ignore
  verifyToken,
  verifyAdmin,
  validateData(createProductSchema),
  createProduct
);

// @ts-ignore
router.put(
  "/:id",
  // @ts-ignore
  verifyToken,
  verifyAdmin,
  validateData(updateProductSchema),
  updateProduct
);

// @ts-ignore
router.delete("/:id", verifyToken, verifyAdmin, deleteProduct);

export default router;
