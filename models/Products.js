const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        image: { type: String, required: true },
        price: { type: Number, required: true, min: [1, "el precio debe ser mayor de 1 siempre"]},
        category: { type: String, 
                    enum: {
                    values: ["libros", "juguetes", "ropa", "videojuegos"],
                    message: "Esta no es una categoria de nuestros productos web"
                } },
        description: String,
        stock: { type: Number, required: true},
        type: [String],
        author: [String],
        pages: Number,
        editorial: String,
        languague: String,
        bookbinding: String,
        yearEdition: Number,
        isbn: Number,
        size: String,
        color: String,
        platform: String
    },
    {
        timestamps: true
    }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;