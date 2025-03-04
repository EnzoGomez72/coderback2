import { Schema, model } from "mongoose";


const productSchema = new Schema({
    title: {
        type: String,
        required: [ true, "El nombre es obligatorio" ],
        uppercase: true,
        trim: true,
        minLength: [ 3, "El nombre debe tener al menos 3 caracteres" ],
        maxLength: [ 25, "El nombre debe tener como máximo 25 caracteres" ],
    },
    description:{
        type: String,
        required: [ true, "La descripción del producto es obligatorio" ],
        trim: true,
        maxLength: [ 50, "La descripción debe tener como máximo 50 caracteres" ],
    },
    code:{
        type: String,
        required: [ true, "El código es obligatorio" ],
        lowercase: true,
        trim: true,
        unique: true,
        validate: {
            validator: async function (code) {
                const countDocuments = await this.model("products").countDocuments({
                    _id:{ $ne: this._id },
                    code,
                });
                return countDocuments===0;
            },
            message: "El código ya está registrado",
        },
    },
    price:{
        type: Number,
        required: [ true, "El precio es obligatorio" ],
        min: [ 0, "El precio debe ser un valor positivo" ],
    },
    status: {
        type: Boolean,
        required: [ true, "El estado es obligatorio" ],
    },
    stock: {
        type: Number,
        required: [ true, "El stock es obligatorio" ],
        min: [ 0, "El stock debe ser un valor positivo" ],
    },
    category:{
        type: String,
        required: [ true, "La categoría del producto es obligatorio" ],
        trim: true,
        minLength: [ 3, "La categoría debe tener al menos 3 caracteres" ],
        maxLength: [ 15, "La categoría debe tener como máximo 15 caracteres" ],
    },
    thumbnail: {
        type: String,
        trim: true,
    },
}, {
    timestamps: true, // Añade timestamps para generar createdAt y updatedAt
    versionKey: false, // Elimina el campo __v de versión
});

const ProductModel = model("products", productSchema);

export default ProductModel;

