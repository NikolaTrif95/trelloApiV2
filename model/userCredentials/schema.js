//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const userCred = new Schema({

    apiKey: {
        type: String,
        required: true,
    },

    serverToken: {
        type: String,
        required: true,
    }

});

module.exports = userCred;