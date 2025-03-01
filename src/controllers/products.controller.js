import productsService from "../services/products.service.js";

const getProductsAll =  async (req, res) => {
    try {
        /*const products = await productModel.find();*/
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
    const { title, description, code, price, status, stock, category, thumbnail} = req.body;

    try {
    // Validar que los campos obligatorios estén presentes
    if (!title || !description || !code || !price || !status || !stock || !category) {
        return res.status(400).json({ status: "Error", message: "Todos los campos son obligatorios" });
    }


 
    const newProduct = {
        title,
        description,
        code,
        price,
        status: status || true,  // Establecer "true" por defecto si no se pasa el status
        stock,
        category,
        thumbnail: thumbnail || "", // Si no hay thumbnail, se asigna una cadena vacía
      };

const product = await productsService.createProduct(newProduct);

      // Enviar la respuesta con el producto creado
      return res.status(201).json({
        status: "Success",
        message: "Producto creado con éxito",
        product,
      });
    } catch (error) {
      // Manejo de errores
      console.error("Error al crear el producto:", error);
      return res.status(500).json({
        status: "Error",
        message: "Hubo un error al procesar tu solicitud. Por favor, intenta nuevamente más tarde.",
        error: error.message,
      });
    }
  };

  const updateProduct = async (req, res) => {
    const { id } = req.params; // ID del producto a modificar
    const { title, description, code, price, status, stock, category, thumbnail } = req.body;
  
    try {
      // Verificar que al menos uno de los campos a modificar sea proporcionado
      if (!title && !description && !code && !price && !status && !stock && !category && !thumbnail) {
        return res.status(400).json({
          status: "Error",
          message: "Debe proporcionar al menos un campo para actualizar",
        });
      }
  
      // Buscar el producto por ID
      /*const product = await productModel.findById(id);*/
      const product = await productsService.getProductById(id);
      
      // Si el producto no existe, devolver un error 404
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
        status: status !== undefined ? status : product.status, // Si status no se pasa, mantener el actual
        stock: stock || product.stock,
        category: category || product.category,
        thumbnail: thumbnail || product.thumbnail,
    };
  
/*await productModel.create(newProduct);*/
const updatedProduct = await productsService.updateProduct(id, updatedFields);
  
      // Enviar una respuesta exitosa con el producto actualizado
      return res.status(200).json({
        status: "Success",
        message: "Producto actualizado con éxito",
        product: updatedProduct,
      });
    } catch (error) {
      // Manejo de errores generales
      console.error("Error al actualizar el producto:", error);
      return res.status(500).json({
        status: "Error",
        message: "Hubo un error al procesar tu solicitud. Por favor, intenta nuevamente más tarde.",
        error: error.message,
      });
    }
  };

  const deleteProduct = async (req, res) => {
    const { id } = req.params;  // Obtener el id del producto desde los parámetros de la URL
  
    try {
      // Buscar el producto por su ID y eliminarlo
      const product = await productsService.deleteProduct(id);
  
      // Si el producto no existe, devolver un error
      if (!product) {
        return res.status(404).json({ status: "Error", message: "Producto no encontrado" });
      }
  
      // Respuesta de éxito
      res.status(200).json({ status: "Success", message: "Producto eliminado correctamente" });
    } catch (error) {
      // En caso de un error en la base de datos
      res.status(500).json({ status: "Error", message: "Hubo un error al eliminar el producto", error: error.message });
    }
  };

export default {getProductsAll, createProduct, updateProduct, deleteProduct};