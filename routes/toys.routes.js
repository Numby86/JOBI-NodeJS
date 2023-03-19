const express = require('express');
const Toy = require('../models/Toys.js');

const toysRouter = express.Router();

toysRouter.get('/', async (req, res) => {
    try {
        const toys = await Toy.find();
        return res.status(200).json(toys);
    } catch (err) {
        return res.status(500).json(err);
    }
});

toysRouter.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const toy = await Toy.findById(id);
        if (toy) {
            return res.status(200).json(toy);
        } else {
            return res.status(404).json('No existe ningun juguete con el id indicado');
        }
        
    } catch (err) {
        return res.status(500).json(err);
    }
});

module.exports = toysRouter;