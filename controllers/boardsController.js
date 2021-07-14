const model = require("../model/boards/model"),
    {logger} = require("../logger")

module.exports = {

    createBoard: async (data) => {
        try {
            logger.info("boardsController/createBoard - Starting board creation");
            return await model.createBoard(data);
        } catch (err) {
            logger.error(`boardsController/createBoard - Error while creating board:${err}`);
            throw err;
        }
    },

    readBoard: async (data) => {
        try {
            logger.info("boardsController/readBoard - Getting board");
            return await model.readBoard(data.id);
        } catch (err) {
            logger.error(`boardsController/readBoard - Error while getting board:${err}`);
            throw err;
        }
    },

    updateBoard: async (data) => {
        try {
            logger.info("boardsController/updateBoard - Starting board updating");
            return await model.updateBoard(data.board, data.id);
        } catch (err) {
            logger.error(`boardsController/updateBoard - Error while updating board:${err}`);
            throw err;
        }
    },

    deleteBoard: async (data) => {
        try {
            logger.info("boardsController/deleteBoard - Starting board removing");
            return await model.deleteBoard(data.id);
        } catch (err) {
            logger.error(`boardsController/deleteBoard - Error while deleting board:${err}`);
            throw err;
        }
    },

    updateListsInBoard: async (data) => {
        try {
            logger.info("boardsController/updateListsInBoard - Starting board list array update");
            return await model.updateListsArray(data.boardId, data.listId);
        } catch (err) {
            logger.error(`boardsController/updateListsInBoard - Error while updating board list array:${err}`);
            throw err;
        }
    },

    deleteFromBoard: async (data) => {
        try {
            logger.info("boardsController/deleteFromOldList- Deleting cards from list");
            await model.deleteList(data.boardId, data.listId);
        } catch (err) {
            logger.error(`listsController/deleteFromOldList - Error while deleting card from old list:${err}`);
            throw err
        }
    },

};