const boardSchema = require("./schema.js"),
    {logger} = require("../../logger"),
    mongoose = require("mongoose");


// Compile model from schema
const boardModel = mongoose.model('boards', boardSchema );

const createModel = (board) => {
    const newBoard = {
        name: board.name
    };
    return new boardModel(newBoard);
};

module.exports = {

    createBoard: async (board) => {
        const newBoard = createModel(board);
        try {
            await newBoard.save();
            return newBoard
        } catch (err) {
            logger.error(`boards/model/createBoard - Error while creating board:${err}`);
            throw err;
        }
    },

    updateBoard: async (board, boardId) => {
        try {
            const boardQuery = {_id: boardId},
                newBoardValues = {$set: board},
                options = {$upsert: true};
            return await boardModel.updateOne(boardQuery, newBoardValues, options);
        }
        catch (err) {
            logger.error(`boards/model/updateBoard - Error while updating board:${err}`);
            throw err;
        }
    },

    deleteBoard: async (boardId) => {
        try {
            const boardQuery = {_id: boardId},
                options = {justOne: true};
            return await boardModel.remove(boardQuery, options);
        }
        catch (err) {
            logger.error(`boards/model/deleteBoard - Error while deleting board:${err}`);
            throw err;
        }
    },

    updateListsArray: async (boardId, listId) => {
        try {
            const boardQuery = {_id: boardId},
                newvalues = {$push: {listsIds: listId}},
                options = {justOne: true};
            return await boardModel.updateOne(boardQuery, newvalues, options);
        }
        catch (err) {
            logger.error(`boards/model/updateListsArray - Error while updating list array in board:${err}`);
            throw err;
        }
    },

    readBoard: boardId => new Promise((resolve, reject) => {
        try {
            const boardQuery = {_id: boardId};
            boardModel.find(boardQuery)
                .populate({
                    path: "listsIds",
                    populate: {
                        path: "cardsId",
                        model: "cards",
                        populate: {
                            path: "commentsIds",
                            models: "comments"
                        }
                    }
                })

                .exec(function(err, docs) {
                    if(err) {
                        return reject( {
                            status: 404,
                            msg: 'Board does not exist in db'
                        });
                    }
                    return resolve(docs);
                });
        }
        catch (err) {
            logger.error(`boards/model/readBoard - Error while getting board:${err}`);
            throw err;
        }
    }),

    deleteList: async (boardId, listId) => {
        try {
            const boardQuery = {_id: boardId},
                update = { $pull: { listsIds: listId }};
            return await boardModel.updateOne(boardQuery, update);
        }
        catch (err) {
            logger.error(`boards/model/deleteList - Error while deleting cardsId from list:${err}`);
            throw err;
        }
    }
};