import cartModel from "../models/carts.model.js";
import productModel from "../models/products.model.js";

const createCart = async (req, res) => {
    try {
        const newCart = new cartModel({
            products: [] // Inicializamos el carrito vacío
        });

        await newCart.save();

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

// Agregar producto a un carrito existente
/*const addProductToCart = async (req, res) => {
    const { cid, pid, quantity } = req.body;

    try {
        // Verificar que el carrito exista
        const cart = await cartModel.findById(cid);
        if (!cart) {
            return res.status(404).json({
                status: "Error",
                message: "Carrito no encontrado"
            });
        }

        // Verificar que el producto exista
        const product = await productModel.findById(pid);
        if (!product) {
            return res.status(404).json({
                status: "Error",
                message: "Producto no encontrado"
            });
        }

        // Verificar stock disponible
        if (quantity > product.stock) {
            return res.status(400).json({
                status: "Error",
                message: `No hay suficiente stock para el producto ${product.title}`
            });
        }

        // Verificar si el producto ya está en el carrito
        const productIndex = cart.products.findIndex(item => item.product.toString() === pid);
        
        if (productIndex !== -1) {
            // Si ya está en el carrito, actualizamos la cantidad
            cart.products[productIndex].quantity += quantity;
        } else {
            // Si no está en el carrito, lo agregamos
            cart.products.push({
                product: pid,
                quantity
            });
        }

        // Guardar cambios en el carrito
        await cart.save();

        return res.status(200).json({
            status: "Success",
            message: "Producto agregado al carrito con éxito",
            cart
        });
    } catch (error) {
        console.error("Error al agregar el producto al carrito:", error);
        return res.status(500).json({
            status: "Error",
            message: "Hubo un error al agregar el producto al carrito",
            error: error.message
        });
    }
};*/

const addProductToCart = async (req, res) => {
    const { cid, pid } = req.params; // Extraemos los parámetros de la URL
    const { quantity } = req.body; // Extraemos la cantidad del cuerpo de la solicitud
  
    try {
      // Verificar si el carrito existe
      const cart = await cartModel.findById(cid);
      if (!cart) {
        return res.status(404).json({
          status: "Error",
          message: "Carrito no encontrado",
        });
      }
  
      // Verificar si el producto existe
      const product = await productModel.findById(pid);
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