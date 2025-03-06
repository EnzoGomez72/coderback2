import cartModel from "../models/carts.model.js";

export default class CartsDao {
    static async create(cart) {
        const newCart = new cartModel(cart);
        return await newCart.save();
    }

    static async findById(cartId) {
        return await cartModel.findById(cartId);
    }

    static async update(cartId, updatedFields) {
        return await cartModel.findByIdAndUpdate(cartId, updatedFields, { new: true });
    }

    static async delete(cartId) {
        return await cartModel.findByIdAndDelete(cartId);
    }
}