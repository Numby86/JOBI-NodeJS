const express = require('express');
const Videogame = require('../models/Videogames.js');

const videogamesRouter = express.Router();

videogamesRouter.get('/', async (req, res) => {
    try {
        const videogames = await Videogame.find();
        return res.status(200).json(videogames);
    } catch (err) {
        return res.status(500).json(err);
    }
});

videogamesRouter.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const videogame = await Videogame.findById(id);
        if (videogame) {
            return res.status(200).json(videogame);
        } else {
            return res.status(404).json('No existe un videojuego con el id indicado');
        }
        
    } catch (err) {
        return res.status(500).json(err);
    }
});

module.exports = videogamesRouter;