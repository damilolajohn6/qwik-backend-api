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
import {
  createProductSchema,
  updateProductSchema,
} from "../../db/productSchema";
import { verifyAdmin, verifyToken } from "../../middlewares/authmiddleware";

const router = Router();

router.get("/", getProducts);

router.get("/:id", getProductsById);

router.post(
  "/",
  verifyToken,
  verifyAdmin,
  validateData(createProductSchema),
  createProduct
);

router.put(
  "/:id",
  verifyToken,
  verifyAdmin,
  validateData(updateProductSchema),
  updateProduct
);

router.delete("/:id", verifyToken, verifyAdmin, deleteProduct);

export default router;
