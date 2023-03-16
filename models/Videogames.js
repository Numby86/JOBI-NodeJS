const mongoose = require('mongoose');

const videogameSchema = new mongoose.Schema(
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
        plataforma: String,
        stock: { type: Number, required: true}
    },
    {
        timestamps: true
    }
);

const Videogame = mongoose.model('Videogame', videogameSchema);

module.exports = Videogame;