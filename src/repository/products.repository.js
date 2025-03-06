import ProductsDao from "../dao/products.dao.js";

export default class ProductsRepository {
    static async getProductsAll() {
        return await ProductsDao.find();
    }

    static async getProductById(productId) {
        return await ProductsDao.findById(productId);
    }

    static async createProduct(newProduct) {
        return await ProductsDao.create(newProduct);
    }

    static async updateProduct(productId, updatedFields) {
        return await ProductsDao.update(productId, updatedFields);
    }

    static async deleteProduct(productId) {
        return await ProductsDao.delete(productId);
    }
}