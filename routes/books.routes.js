const express = require('express');
const Book = require('../models/Books.js');

const booksRouter = express.Router();

booksRouter.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        return res.status(200).json(books);
    } catch (err) {
        return res.status(500).json(err);
    }
});

booksRouter.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const book = await Book.findById(id);
        if (book) {
            return res.status(200).json(book);
        } else {
            return res.status(404).json('No existe ningun libro con el id indicado');
        }
        
    } catch (err) {
        return res.status(500).json(err);
    }
});

module.exports = booksRouter;