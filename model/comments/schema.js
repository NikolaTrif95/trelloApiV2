//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const commentsModelSchema = new Schema({

    created: {
        type: Date,
        required: true,
        default: Date.now,
    },

    text: {
        type: String,
        required: true
    }

});

// Compile model from schema
module.exports = commentsModelSchema;