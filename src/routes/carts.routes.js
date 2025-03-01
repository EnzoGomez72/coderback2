import { Router } from "express";
import cartsController from "../controllers/carts.controller.js";
import passport from "passport";
import authRole from "../middlewares/authMiddleware.js";

const router = Router();

// Ruta para crear un carrito
router.post("/", cartsController.createCart);

// Ruta para agregar un producto al carrito
router.post("/:cid/products/:pid", passport.authenticate("current", {session: false}), authRole("user"),cartsController.addProductToCart);

// Ruta para obtener un carrito por ID
router.get("/:cid", cartsController.getCartById);

// Ruta para eliminar un carrito por ID
router.delete("/:cid", cartsController.deleteCartById);


export default router;