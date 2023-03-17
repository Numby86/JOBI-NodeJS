require('dotenv').config();

const express = require('express');
const videogamesRouter = require('./routes/videogames.routes.js');
const booksRouter = require('./routes/books.routes.js');
const toysRouter = require('./routes/toys.routes.js');
const clothesRouter = require('./routes/clothes.routes.js');
const connect = require('./utils/db/connect.js');
const cors = require('cors');
const passport = require('passport');
const createError = require('./utils/errors/create-errors.js');
const userRouter = require('./routes/user.routes.js');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');
const DB_URL = process.env.DB_URL;

connect();

const PORT = process.env.PORT || 4000;
const server = express();

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(express.static(path.join(__dirname, 'public')));

require('./utils/authentication/passport.js');

server.use(session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1200000
    },
    store: MongoStore.create({
        mongoUrl: DB_URL,
    })
}));

server.use(passport.initialize());
server.use(passport.session());

server.get('/', (req, res) => {
    res.json(`Bienvenido a nuestro e-commerce`)
});
server.use('/videogames', videogamesRouter);
server.use('/books', booksRouter);
server.use('/clothes', clothesRouter);
server.use('/toys', toysRouter);
server.use('/user', userRouter);

server.use('*', (req, res, next) => {
    next(createError('Esta ruta no existe', 404));
});

server.use((err, req, res, next) => {
    return res.status(err.status || 500).json(err.message || 'Unexpected error');
});

server.listen(PORT, () => {
    console.log(`El servidor está escuchando en http://localhost:${PORT}`);
});

module.exports = server;