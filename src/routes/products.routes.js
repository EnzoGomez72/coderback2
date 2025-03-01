import { Router } from "express";
import productsController from "../controllers/products.controller.js";
import passport from "passport";
import authRole from "../middlewares/authMiddleware.js";
const router = Router();


router.get("/", productsController.getProductsAll);

router.post("/", passport.authenticate("current", {session: false}), authRole("admin"), productsController.createProduct);

router.put("/:id", passport.authenticate("current", {session: false}), authRole("admin"), productsController.updateProduct);

router.delete("/:id", passport.authenticate("current", {session: false}), authRole("admin"), productsController.deleteProduct);

export default router;