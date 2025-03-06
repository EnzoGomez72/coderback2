import CartsRepository from "../repository/carts.repository.js";

const createCart = async () => {
    return await CartsRepository.createCart();
};

const getCartById = async (cartId) => {
    return await CartsRepository.getCartById(cartId);
};

const updateCart = async (cartId, updatedFields) => {
    return await CartsRepository.updateCart(cartId, updatedFields);
};

const deleteCart = async (cartId) => {
    return await CartsRepository.deleteCart(cartId);
};

export default { createCart, getCartById, updateCart, deleteCart };