import { Router } from "express";

import { getProducts, getProductsById, createProduct, updateProduct, deleteProduct } from "./productController";

const router = Router();

router.get("/", getProducts);

router.get("/:id", getProductsById);

router.post("/", createProduct);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

export default router;
