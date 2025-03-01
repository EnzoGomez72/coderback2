import cartModel from "../models/carts.model.js";
import productModel from "../models/products.model.js";
import cartsService from "../services/carts.service.js";
import productsService from "../services/products.service.js";

const createCart = async (req, res) => {
    try {
        const newCart = await cartsService.createCart();

        return res.status(201).json({
            status: "Success",
            message: "Carrito creado con éxito",
            cart: newCart
        });
    } catch (error) {
        console.error("Error al crear el carrito:", error);
        return res.status(500).json({
            status: "Error",
            message: "Hubo un error al crear el carrito",
            error: error.message
        });
    }
};

const addProductToCart = async (req, res) => {
    const { cid, pid } = req.params; // Extraemos los parámetros de la URL
    const { quantity } = req.body; // Extraemos la cantidad del cuerpo de la solicitud
  
    try {
      // Verificar si el carrito existe
      const cart = await cartsService.getCartById(cid);
      if (!cart) {
        return res.status(404).json({
          status: "Error",
          message: "Carrito no encontrado",
        });
      }
  
      // Verificar si el producto existe
      const product = await productsService.getProductById(pid);
      if (!product) {
        return res.status(404).json({
          status: "Error",
          message: "Producto no encontrado",
        });
      }
  
      // Verificar si la cantidad es válida
      if (quantity <= 0) {
        return res.status(400).json({
          status: "Error",
          message: "La cantidad debe ser mayor que 0",
        });
      }
  
      // Buscar si el producto ya existe en el carrito
      const productIndex = cart.products.findIndex(
        (item) => item.product.toString() === pid
      );
  
      if (productIndex !== -1) {
        // Si el producto ya está en el carrito, actualizar la cantidad
        cart.products[productIndex].quantity += quantity;
      } else {
        // Si el producto no está en el carrito, agregarlo
        cart.products.push({ product: pid, quantity });
      }
  
      // Guardar los cambios en el carrito
      await cart.save();
  
      // Enviar respuesta
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

// Obtener un carrito por ID
const getCartById = async (req, res) => {
    const { cid } = req.params;

    try {
        const cart = await cartModel.findById(cid).populate("products.product");
        if (!cart) {
            return res.status(404).json({
                status: "Error",
                message: "Carrito no encontrado"
            });
        }

        return res.status(200).json({
            status: "Success",
            cart
        });
    } catch (error) {
        console.error("Error al obtener el carrito:", error);
        return res.status(500).json({
            status: "Error",
            message: "Hubo un error al obtener el carrito",
            error: error.message
        });
    }
};

// Eliminar un carrito por ID
const deleteCartById = async (req, res) => {
    const { cid } = req.params;

    try {
        const cart = await cartModel.findByIdAndDelete(cid);
        if (!cart) {
            return res.status(404).json({
                status: "Error",
                message: "Carrito no encontrado"
            });
        }

        return res.status(200).json({
            status: "Success",
            message: "Carrito eliminado con éxito"
        });
    } catch (error) {
        console.error("Error al eliminar el carrito:", error);
        return res.status(500).json({
            status: "Error",
            message: "Hubo un error al eliminar el carrito",
            error: error.message
        });
    }
};

export default { createCart, addProductToCart, getCartById, deleteCartById };