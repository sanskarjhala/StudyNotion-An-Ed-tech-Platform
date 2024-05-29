const mongoose = require('mongoose');
require('dotenv').config();

exports.databaseConnection = () => {
    mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log("Connected to Database successfully"))
    .catch((error) => {
        console.log("Database connection failed")
        console.error(error);
        process.exit(1);
    })
}


