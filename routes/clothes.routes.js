const express = require('express');
const Cloth = require('../models/Clothes.js');
const createError = require('../utils/errors/create-errors.js')

const clothesRouter = express.Router();

clothesRouter.get('/', async (req, res, next) => {
    try {
        const clothes = await Cloth.find();
        return res.status(200).json(clothes);
    } catch (err) {
        next(err);
    }
});

clothesRouter.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        const cloth = await Cloth.findById(id);
        if (cloth) {
            return res.status(200).json(cloth);
        } else {
           next(createError('No existe ninguna prenda de ropa con el id indicado', 404));
        }
    } catch (err) {
        next(err);
    }
});

module.exports = clothesRouter;