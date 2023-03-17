const mongoose = require('mongoose');
const Cloth = require('../../models/Clothes.js');
const fs = require('fs');

const DB_URL = process.env.DB_URL;

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(async () => {

    const allCloths = await Cloth.find();

    if (allCloths.length) {
        await Cloth.collection.drop();
    }
}).catch(err => {
    console.log(`Ha habido un error eliminando los datos: ${err}`);
})
.then(async () => {
    const data = fs.readFileSync('./utils/seeds/seeds/clothes.json');
    const parsedData = JSON.parse(data);
    const clothDocs = parsedData.map((cloth) => {
        return new Cloth(cloth);
    });
    await Cloth.insertMany(clothDocs);
})
.catch((err) => {
    console.log(`Ha habido un error añadiendo los elementos a la base de datos: ${err}`);
})
.finally(() => mongoose.disconnect());