import { Router} from "express";

const router = Router();

router.post("/login", (req, res) => {
  res.send(200);
});

router.post("/register", (req, res) => {
  res.send(200);
});

export default router;
