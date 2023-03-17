const express = require('express');
const Videogame = require('../models/Videogames.js');
const createError = require('../utils/errors/create-errors.js')

const videogamesRouter = express.Router();

videogamesRouter.get('/', async (req, res, next) => {
    try {
        const videogames = await Videogame.find();
        return res.status(200).json(videogames);
    } catch (err) {
        next(err);
    }
});

videogamesRouter.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        const videogame = await Videogame.findById(id);
        if (videogame) {
            return res.status(200).json(videogame);
        } else {
            next(createError('No existe un videojuego con el id indicado', 404));
        }
    } catch (err) {
        next(err);
    }
});

module.exports = videogamesRouter;