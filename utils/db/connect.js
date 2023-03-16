const mongoose = require('mongoose');

const DB_URL = "mongodb+srv://root:OL6QyqnUQJskn6LU@jobi.uzskkuh.mongodb.net/?retryWrites=true&w=majority";

const connect = () => {
    mongoose.connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
};

module.exports = connect;