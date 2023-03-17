const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {type: String, require: true, unique: true, match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "El email no tiene un formato valido."]},
    password: {type: String, require: true },
    name: {type: String},
    surname: {type: String},
    telefono: {type: Number},
    role: {type: String, enum: ["administrador", "usuario"]}
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;