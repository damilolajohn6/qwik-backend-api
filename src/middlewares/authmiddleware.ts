import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json("Access Denied");
  }

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return res.status(500).json("JWT Secret not configured");
    }
    const verified = jwt.verify(token, secret);

    if (typeof verified !== "object" || !verified?.userId) {
      return res.status(401).json("Access denied");
    }
    req.userId = verified.userId;
    req.role = verified.role;
    next();
  } catch (error) {
    res.status(400).send("Access denied");
  }
}

export function verifyAdmin(req: Request, res: Response, next: NextFunction) {
  const role = req.role;
  if (role !== "admin") {
    return res.status(401).json("You do not have an Admin priviledge");
  }
  next();
}
