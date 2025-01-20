import { Router } from "express";
import {
  createOrder,
  getOrder,
  listOrders,
  updateOrder,
} from "./ordersController.js";
import { validateData } from "../../middlewares/validationmiddlewares.js";
import {
  insertOrderWithItemsSchema,
  updateOrderSchema,
} from "../../db/orderSchema.js";
import { verifyToken } from "../../middlewares/authmiddleware.js";

const router = Router();

router.post(
  "/",
  // @ts-ignore
  verifyToken,
  validateData(insertOrderWithItemsSchema),
  createOrder
);
// @ts-ignore
router.get("/", verifyToken, listOrders);
// @ts-ignore
router.get("/:id", verifyToken, getOrder);
// @ts-ignore
router.put("/:id", verifyToken, validateData(updateOrderSchema), updateOrder);

export default router;
