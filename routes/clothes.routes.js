const express = require('express');
const Cloth = require('../models/Clothes.js');

const clothesRouter = express.Router();

clothesRouter.get('/', async (req, res) => {
    try {
        const clothes = await Cloth.find();
        return res.status(200).json(clothes);
    } catch (err) {
        return res.status(500).json(err);
    }
});

clothesRouter.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const cloth = await Cloth.findById(id);
        if (cloth) {
            return res.status(200).json(cloth);
        } else {
            return res.status(404).json('No existe ninguna prenda de ropa con el id indicado');
        }
        
    } catch (err) {
        return res.status(500).json(err);
    }
});

module.exports = clothesRouter;