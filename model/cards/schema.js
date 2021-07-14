//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const cardModelSchema = new Schema({

    name: {
        type: String,
        required: true,
    },

    created: {
        type: Date,
        required: true,
        default: Date.now,
    },

    commentsIds: [{ type: Schema.Types.ObjectId, ref: 'comments' }]

});

// Compile model from schema
module.exports = cardModelSchema;