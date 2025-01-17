import { productsTable } from "./../../db/productSchema";
import { Request, Response } from "express";
import { db } from "../../db/index";

export function getProducts(req: Request, res: Response) {
  try {

  } catch (error) {
    res.status(500).send(error);
  }
}

export function getProductsById(req: Request, res: Response) {
  try {
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function createProduct(req: Request, res: Response) {
  try {
    const [product] = await db
      .insert(productsTable)
      .values(req.body)
      .returning();

    res.status(201).json(product);
  } catch (error) {
    res.status(500).send(error);
  }
}

export function updateProduct(req: Request, res: Response) {
  try {
  } catch (error) {
    res.status(500).send(error);
  }
}

export function deleteProduct(req: Request, res: Response) {
  try {
  } catch (error) {
    res.status(500).send(error);
  }
}
