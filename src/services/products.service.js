import productModel from "../models/products.model.js";

const getProductsAll = ()=> {
    return productModel.find()
};

const createProduct = async (newProduct) => {
    return await productModel.create(newProduct);
};

const getProductById = async (id) => {
    return await productModel.findById(id);
};

const updateProduct = async (id, updatedFields) => {
    return await productModel.findByIdAndUpdate(id, updatedFields, { new: true });
};

const deleteProduct = async (id) => {
    return await productModel.findByIdAndDelete(id);
};
export default {getProductsAll, createProduct, getProductById, updateProduct, deleteProduct};