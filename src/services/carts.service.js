import cartModel from "../models/carts.model.js";

const createCart = async () => {
    const newCart = new cartModel({ products: [] }); // Inicializamos el carrito vacío
    return await newCart.save();
};

const getCartById = async (cid) => {
    return await cartModel.findById(cid);
};
export default {createCart, getCartById};