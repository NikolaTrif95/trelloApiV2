//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const listModelSchema = new Schema({

    name: {
        type: String,
        required: true,
    },

    archived: {
        type: Boolean,
        default: false,
    },

    created: {
        type: Date,
        required: true,
        default: Date.now,
    },

    cardsId: [{ type: Schema.Types.ObjectId, ref: 'cards' }]
});

module.exports = listModelSchema;