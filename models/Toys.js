const mongoose = require('mongoose');

const toySchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        image: { type: String, required: true },
        price: { type: Number, required: true, min: [1, "el precio debe ser mayor de 1 siempre"]},
        category: { type: [String], 
                    enum: {
                    values: ["libros", "juguetes", "ropa", "videojuegos"],
                    message: "Esta no es una categoria de nuestros productos web"
                } },
        description: String,
        stock: { type: Number, required: true}
    },
    {
        timestamps: true
    }
);

const Toy = mongoose.model('Toy', toySchema);

module.exports = Toy;