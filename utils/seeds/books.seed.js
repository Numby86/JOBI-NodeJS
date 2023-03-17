const mongoose = require('mongoose');
const Book = require('../../models/Books.js');
const fs = require('fs');

const DB_URL = process.env.DB_URL;

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(async () => {

    const allBooks = await Book.find();

    if (allBooks.length) {
        await Book.collection.drop();
    }
}).catch(err => {
    console.log(`Ha habido un error eliminando los datos: ${err}`);
})
.then(async () => {
    const data = fs.readFileSync('./utils/seeds/seeds/books.json');
    const parsedData = JSON.parse(data);
    const bookDocs = parsedData.map((book) => {
        return new Book(book);
    });
    await Book.insertMany(bookDocs);
})
.catch((err) => {
    console.log(`Ha habido un error añadiendo los elementos a la base de datos: ${err}`);
})
.finally(() => mongoose.disconnect());