import productModel from "../models/products.model.js";

export default class ProductsDao {
    static async find() {
        return await productModel.find();
    }

    static async findById(productId) {
        return await productModel.findById(productId);
    }

    static async create(product) {
        return await productModel.create(product);
    }

    static async update(productId, updatedFields) {
        return await productModel.findByIdAndUpdate(productId, updatedFields, { new: true });
    }

    static async delete(productId) {
        return await productModel.findByIdAndDelete(productId);
    }
}