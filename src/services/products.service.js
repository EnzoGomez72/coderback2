import ProductsRepository from "../repository/products.repository.js";

const getProductsAll = async () => {
    return await ProductsRepository.getProductsAll();
};

const getProductById = async (productId) => {
    return await ProductsRepository.getProductById(productId);
};

const createProduct = async (newProduct) => {
    return await ProductsRepository.createProduct(newProduct);
};

const updateProduct = async (productId, updatedFields) => {
    return await ProductsRepository.updateProduct(productId, updatedFields);
};

const deleteProduct = async (productId) => {
    return await ProductsRepository.deleteProduct(productId);
};

export default { getProductsAll, getProductById, createProduct, updateProduct, deleteProduct };