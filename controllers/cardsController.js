const cardsModel = require("../model/cards/model"),
    {logger} = require("../logger");

module.exports = {

    createCard: async (data) => {
        try {
            logger.info("cardController/createCard - Starting card creation");
            return await cardsModel.createCard(data);
        } catch (err) {
            logger.error(`cardController/createCard - Error while creating card:${err}`);
            throw err
        }
    },

    readCard: async (data) => {
        try {
            logger.info("cardController/readCard - Getting card");
            return await cardsModel.readCard(data.id);
        } catch (err) {
            logger.error(`cardController/readCard - Error while getting card:${err}`);
            throw err
        }
    },

    updateCard: async (data) => {
        try {
            logger.info("cardController/updateCard - Starting card updating");
            return await cardsModel.updateCard(data.card, data.cardId);
        } catch (err) {
            logger.error(`cardController/updateCard - Error while updating card:${err}`);
            throw err
        }
    },

    deleteCard: async (data) => {
        try {
            logger.info("cardController/deleteCard - Starting card removing");
            return await cardsModel.deleteCard(data.id);
        } catch (err) {
            logger.error(`cardController/deleteCard - Error while deleting card:${err}`);
            throw err
        }
    },

    updateCommentsInCard: async (data) => {
        try {
            logger.info("cardController/updateCommentsInCard - Starting updating card comments");
            if(data.cardId && data.commentId) {
                return  await cardsModel.updateCommentArray(data.cardId, data.commentId);
            }
        } catch (err) {
            logger.error(`cardController/updateCommentsInCard - Error while updating comments in card:${err}`);
            throw err;
        }
    },

    deleteCommentFromCard: async (data) => {
        try {
            logger.info("cardController/deleteFromBoard- Deleting comment from card");
            await cardsModel.deleteComment(data.cardId, data.commentId);
        } catch (err) {
            logger.error(`cardController/deleteFromBoard - Error while deleting comment from old card:${err}`);
            throw err
        }
    },
};