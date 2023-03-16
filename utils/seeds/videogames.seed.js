const mongoose = require('mongoose');
const Videogame = require('../../models/Videogames.js');
const fs = require('fs');

const DB_URL = "mongodb+srv://root:OL6QyqnUQJskn6LU@jobi.uzskkuh.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(async () => {

    const allVideogames = await Videogame.find();

    if (allVideogames.length) {
        await Videogame.collection.drop();
    }
}).catch(err => {
    console.log(`Ha habido un error eliminando los datos: ${err}`);
})
.then(async () => {
    const data = fs.readFileSync('./utils/seeds/seeds/videogames.json');
    const parsedData = JSON.parse(data);
    const videogameDocs = parsedData.map((videogame) => {
        return new Videogame(videogame);
    });
    await Videogame.insertMany(videogameDocs);
})
.catch((err) => {
    console.log(`Ha habido un error añadiendo los elementos a la base de datos: ${err}`);
})
.finally(() => mongoose.disconnect());