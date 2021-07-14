const commentsModel = require("../model/comments/model"),
    {logger} = require("../logger");

module.exports = {

    createCommentOnCard: async (data) => {
        try {
            logger.info(`commentsController/createCommentOnCard - Started comment creation`);
            return await commentsModel.createComment(data.comment);
        } catch (err) {
            logger.error(`commentController/createCommentOnCard - Error while creating comment:${err}`);
            throw err;
        }
    },

    readCommentOnCard: async (data) => {
        try {
            logger.info(`commentsController/readCommentOnCard - Getting comment`);
            return await commentsModel.readComment(data.id);
        } catch (err) {
            logger.error(`commentController/readCommentOnCard - Error while getting comment:${err}`);
            throw err;
        }
    },

    updateCommentOnCard: async (data) => {
        try {
            logger.info(`commentsController/updateCommentOnCard - Started updating comment`);
            return await commentsModel.updateComment(data.id, data.comment);
        } catch (err) {
            logger.error(`commentController/updateCommentOnCard - Error while updating comment:${err}`);
            throw err;
        }
    },

    deleteCommentOnCard: async (data) => {
        try {
            logger.info(`commentsController/deleteCommentOnCard - Started comment removing`);
            return await commentsModel.deleteComment(data.id);
        } catch (err) {
            logger.error(`commentController/deleteCommentOnCard - Error while deleting comment:${err}`);
            throw err;
        }
    }
};