import CartsDao from "../dao/carts.dao.js";

export default class CartsRepository {
    static async createCart() {
        return await CartsDao.create({ products: [] });
    }

    static async getCartById(cartId) {
        return await CartsDao.findById(cartId);
    }

    static async updateCart(cartId, updatedFields) {
        return await CartsDao.update(cartId, updatedFields);
    }

    static async deleteCart(cartId) {
        return await CartsDao.delete(cartId);
    }
}