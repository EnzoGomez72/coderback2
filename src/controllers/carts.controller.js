import cartsService from "../services/carts.service.js";
import productsService from "../services/products.service.js";
import usersService from "../services/users.service.js";
import ticketsService from "../services/tickets.service.js";

const createCart = async (req, res) => {
    try {
        const newCart = await cartsService.createCart();

        return res.status(201).json({
            status: "Success",
            message: "Carrito creado con éxito",
            cart: newCart,
        });
    } catch (error) {
        console.error("Error al crear el carrito:", error);
        return res.status(500).json({
            status: "Error",
            message: "Hubo un error al crear el carrito",
            error: error.message,
        });
    }
};

const addProductToCart = async (req, res) => {
    const { pid } = req.params;
    const { quantity } = req.body;
    const userId = req.user._id;

    try {
        const user = await usersService.getUserById(userId);
        if (!user || !user.cart) {
            return res.status(404).json({ status: "Error", message: "El usuario no tiene un carrito asignado" });
        }

        const cart = await cartsService.getCartById(user.cart);
        if (!cart) {
            return res.status(404).json({ status: "Error", message: "Carrito no encontrado" });
        }

        const product = await productsService.getProductById(pid);
        if (!product) {
            return res.status(404).json({ status: "Error", message: "Producto no encontrado" });
        }

        if (quantity <= 0) {
            return res.status(400).json({ status: "Error", message: "La cantidad debe ser mayor que 0" });
        }

        const productIndex = cart.products.findIndex(
            (item) => item.product.toString() === pid
        );

        if (productIndex !== -1) {
            cart.products[productIndex].quantity += quantity;
        } else {
            cart.products.push({ product: pid, quantity });
        }

        await cartsService.updateCart(cart._id, { products: cart.products });

        res.status(200).json({
            status: "Success",
            message: "Producto agregado al carrito",
            cart,
        });
    } catch (error) {
        console.error("Error al agregar el producto al carrito:", error);
        res.status(500).json({
            status: "Error",
            message: "Hubo un error al procesar tu solicitud",
            error: error.message,
        });
    }
};

const getCartById = async (req, res) => {
    const { cid } = req.params;

    try {
        const cart = await cartsService.getCartById(cid);
        if (!cart) {
            return res.status(404).json({
                status: "Error",
                message: "Carrito no encontrado",
            });
        }

        return res.status(200).json({
            status: "Success",
            cart,
        });
    } catch (error) {
        console.error("Error al obtener el carrito:", error);
        return res.status(500).json({
            status: "Error",
            message: "Hubo un error al obtener el carrito",
            error: error.message,
        });
    }
};

const purchaseCart = async (req, res) => {
    const { cid } = req.params;
    const userId = req.user._id;

    try {
        const cart = await cartsService.getCartById(cid);
        if (!cart) {
            return res.status(404).json({ status: "Error", message: "Carrito no encontrado" });
        }

        let totalAmount = 0;
        const purchasedProducts = [];
        const failedProducts = [];

        for (let item of cart.products) {
            const product = await productsService.getProductById(item.product);
            if (!product) {
                failedProducts.push(item.product);
                continue;
            }

            if (product.stock >= item.quantity) {
                product.stock -= item.quantity;
                await product.save();
                totalAmount += product.price * item.quantity;
                purchasedProducts.push({
                    product: item.product,
                    quantity: item.quantity,
                    price: product.price,
                });
            } else {
                failedProducts.push(item.product);
            }
        }

        let ticket = null;
        if (purchasedProducts.length > 0) {
            ticket = await ticketsService.createTicket({
                amount: totalAmount,
                purchaser: req.user.email,
            });
        }

        cart.products = cart.products.filter(item => failedProducts.includes(item.product));
        await cartsService.updateCart(cart._id, { products: cart.products });

        res.status(200).json({
            status: "Success",
            message: "Compra procesada",
            ticket,
            failedProducts,
        });
    } catch (error) {
        console.error("Error en la compra:", error);
        res.status(500).json({ status: "Error", message: "Hubo un error al procesar la compra", error: error.message });
    }
};

export default { createCart, addProductToCart, getCartById, purchaseCart };