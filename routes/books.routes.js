const express = require('express');
const Book = require('../models/Books.js');
const createError = require('../utils/errors/create-errors.js')

const booksRouter = express.Router();

booksRouter.get('/', async (req, res, next) => {
    try {
        const books = await Book.find();
        return res.status(200).json(books);
    } catch (err) {
        return next(err);
    }
});

booksRouter.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        const book = await Book.findById(id);
        if (book) {
            return res.status(200).json(book);
        } else {
            next(createError('No existe ningún libro con el id indicado', 404));
        }
        
    } catch (err) {
        next(err);
    }
});


module.exports = booksRouter;