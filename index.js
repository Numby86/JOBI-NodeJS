const express = require('express');
const videogamesRouter = require('./routes/videogames.routes.js');
const booksRouter = require('./routes/books.routes.js');
const toysRouter = require('./routes/toys.routes.js');
const clothesRouter = require('./routes/clothes.routes.js');
const connect = require('./utils/db/connect.js');

connect();

const PORT = 4000;
const server = express();

server.get('/', (req, res) => {
    res.json(`Bienvenido a nuestro e-commerce`)
});
server.use('/products', videogamesRouter, booksRouter, clothesRouter, toysRouter);

server.listen(PORT, () => {
    console.log(`El servidor está escuchando en http://localhost:${PORT}`);
});

module.exports = server;