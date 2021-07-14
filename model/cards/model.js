const cardSchema = require("./schema.js"),
    {logger} = require("../../logger"),
    mongoose = require("mongoose");


// Compile model from schema
const cardModel = mongoose.model('cards', cardSchema );

const createModel = (card) => {
    const newCard = {
        name: card.name,
    };
    return new cardModel(newCard);
};

module.exports = {

    createCard: async (card) => {
        const newCard = createModel(card);
        try {
            await newCard.save();
            return newCard;
        } catch (err) {
            logger.error(`cardController/model/createCard - Error while creating card:${err}`);
            throw err;
        }
    },

    updateCard: async (card, cardId) => {
        try {
            const cardQuery = {_id: cardId},
                newCardValues = {$set: card},
                options = {$upsert: true};
            return await cardModel.updateOne(cardQuery, newCardValues, options);
        }
        catch (err) {
            logger.error(`cardController/model/updateCard - Error while updating card:${err}`);
            throw err;
        }
    },

    deleteCard: async (cardId) => {
        try {
            const cardQuery = {_id: cardId},
                options = {justOne: true};
            return await cardModel.remove(cardQuery, options);
        }
        catch (err) {
            logger.error(`cardController/model/deleteCard - Error while deleting card:${err}`);
            throw err;
        }
    },

    readCard: cardId => new Promise((resolve, reject) => {
        try {
            const cardQuery = {_id: cardId};
            cardModel.find(cardQuery)
                .populate("commentsIds")
                .exec(function(err, docs) {
                    if(err) {
                        return reject( {
                            status: 404,
                            msg: 'Card does not exist in db'
                        });
                    }
                    return resolve(docs);
                });
        }
        catch (err) {
            logger.error(`cardController/model/readCard - Error while getting card:${err}`);
            throw err;
        }
    }),

    updateCommentArray: async (cardId, commentId) => {
        try {
            const cardQuery = {_id: cardId},
                newCommentsIds = {$push: {commentsIds: commentId}},
                options = {justOne: true};
            return await cardModel.updateOne(cardQuery, newCommentsIds, options);
        }
        catch (err) {
            logger.error(`cardController/model/updateCommentsInCard - Error while updating comments array in card:${err}`);
            throw err;
        }
    },

    deleteComment: async (cardId, commentId) => {
        try {
            const cardQuerry = {_id: cardId},
                update = { $pull: { commentsIds: commentId }};
            return await cardModel.updateOne(cardQuerry, update);
        }
        catch (err) {
            logger.error(`card/model/deleteComment - Error while deleting cardsId from list:${err}`);
            throw err;
        }
    }
};