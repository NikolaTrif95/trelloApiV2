//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const boardModelSchema = new Schema({

    name: {
        type: String,
        required: true,
    },

    created: {
        type: Date,
        required: true,
        default: Date.now,
    },

    listsIds: [{ type: Schema.Types.ObjectId, ref: 'Lists' }]

});

module.exports = boardModelSchema;