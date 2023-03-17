const express = require('express');
const Toy = require('../models/Toys.js');
const createError = require('../utils/errors/create-errors.js')

const toysRouter = express.Router();

toysRouter.get('/', async (req, res, next) => {
    try {
        const toys = await Toy.find();
        return res.status(200).json(toys);
    } catch (err) {
        next(err);
    }
});

toysRouter.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        const toy = await Toy.findById(id);
        if (toy) {
            return res.status(200).json(toy);
        } else {
            next(createError('No existe ningun juguete con el id indicado', 404));
        }
    } catch (err) {
        next(err);
    }
});

module.exports = toysRouter;