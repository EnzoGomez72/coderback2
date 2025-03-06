import productsService from "../services/products.service.js";

const getProductsAll = async (req, res) => {
    try {
        const products = await productsService.getProductsAll();

        if (products.length === 0) {
            return res.status(404).json({ status: "Error", message: "No se encontraron productos" });
        }

        res.status(200).json({ status: "Ok", payload: products });
    } catch (error) {
        res.status(500).json({ status: "Error", error: error.message });
    }
};

const createProduct = async (req, res) => {
    const { title, description, code, price, status, stock, category, thumbnail } = req.body;

    try {
        if (!title || !description || !code || !price || !status || !stock || !category) {
            return res.status(400).json({ status: "Error", message: "Todos los campos son obligatorios" });
        }

        const newProduct = {
            title,
            description,
            code,
            price,
            status: status || true,
            stock,
            category,
            thumbnail: thumbnail || "",
        };

        const product = await productsService.createProduct(newProduct);

        res.status(201).json({
            status: "Success",
            message: "Producto creado con éxito",
            product,
        });
    } catch (error) {
        console.error("Error al crear el producto:", error);
        res.status(500).json({
            status: "Error",
            message: "Hubo un error al procesar tu solicitud. Por favor, intenta nuevamente más tarde.",
            error: error.message,
        });
    }
};

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { title, description, code, price, status, stock, category, thumbnail } = req.body;

    try {
        if (!title && !description && !code && !price && !status && !stock && !category && !thumbnail) {
            return res.status(400).json({
                status: "Error",
                message: "Debe proporcionar al menos un campo para actualizar",
            });
        }

        const product = await productsService.getProductById(id);

        if (!product) {
            return res.status(404).json({
                status: "Error",
                message: "Producto no encontrado",
            });
        }

        const updatedFields = {
            title: title || product.title,
            description: description || product.description,
            code: code || product.code,
            price: price || product.price,
            status: status !== undefined ? status : product.status,
            stock: stock || product.stock,
            category: category || product.category,
            thumbnail: thumbnail || product.thumbnail,
        };

        const updatedProduct = await productsService.updateProduct(id, updatedFields);

        res.status(200).json({
            status: "Success",
            message: "Producto actualizado con éxito",
            product: updatedProduct,
        });
    } catch (error) {
        console.error("Error al actualizar el producto:", error);
        res.status(500).json({
            status: "Error",
            message: "Hubo un error al procesar tu solicitud. Por favor, intenta nuevamente más tarde.",
            error: error.message,
        });
    }
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await productsService.deleteProduct(id);

        if (!product) {
            return res.status(404).json({ status: "Error", message: "Producto no encontrado" });
        }

        res.status(200).json({ status: "Success", message: "Producto eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ status: "Error", message: "Hubo un error al eliminar el producto", error: error.message });
    }
};

export default { getProductsAll, createProduct, updateProduct, deleteProduct };