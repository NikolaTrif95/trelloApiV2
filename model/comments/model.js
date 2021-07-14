const commentsSchema = require("./schema.js"),
    {logger} = require("../../logger"),
    mongoose = require("mongoose");


// Compile model from schema
const commentModel = mongoose.model('comments', commentsSchema );

const createModel = (comment) => {
    const newComment = {
        text: comment.text,
    };
    return new commentModel(newComment);
};

module.exports = {

    createComment: async (comment) => {
        try {
            const newCard = createModel(comment);
            await newCard.save();
            return newCard;
        } catch (err) {
            logger.error(`commentController/model/createComment - Error while creating comment:${err}`);
            throw err;
        }
    },

    readComment: async (commentId) => {
        try {
            const commentQuery = {_id: commentId};
            return await commentModel.find(commentQuery);
        }
        catch (err) {
            logger.error(`commentController/model/readComment - Error while getting comment:${err}`);
            throw err;
        }
    },

    updateComment: async (commentId, comment) => {
        try {
            const cardQuery = {_id: commentId},
                cardValue = {$set: comment},
                options = {justOne: true, $upsert: true};
            return await commentModel.updateOne(cardQuery, cardValue, options);
        }
        catch (err) {
            logger.error(`commentController/model/updateComment - Error while updating comment:${err}`);
            throw err;
        }
    },

    deleteComment: async (commentId) => {
        try {
            const commentQuery = {_id: commentId};
            console.log(commentId, "???")
            return await commentModel.remove(commentQuery);
        }
        catch (err) {
            logger.error(`commentController/model/deleteComment - Error while deleting comment:${err}`);
            throw err;
        }
    }
};