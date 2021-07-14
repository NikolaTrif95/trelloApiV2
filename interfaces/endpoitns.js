const config = require("../config"),
    {logger} = require("../logger"),
    service = require("../service");

const boardsEndpoints = {

    createBoard: async (req, res) => {
        try {
            let board = await service.boards.createBoard(req.query);
            return res.json(board);
        } catch (err) {
            logger.error(`boardsEndpoints/createBoard - Error while creating board:${err}`);
            return res.json({statusCode: config.errorCode500.code, message: config.errorCode500.name});
        }
    },

    readBoard: async (req, res) => {
        try {
            let board = await service.boards.readBoard(req.params);
            return res.json(board);
        } catch (err) {
            logger.error(`boardsEndpoints/readBoard - Error while getting board:${err}`);
            return res.json({statusCode: config.errorCode500.code, message: config.errorCode500.name});
        }
    },

    updateBoard: async (req, res) => {
        try {
            let board = await service.boards.updateBoard({board: req.query, id: req.params.id});
            return res.json(board);
        } catch (err) {
            logger.error(`boardsEndpoints/updateBoard - Error while updating board:${err}`);
            return res.json({statusCode: config.errorCode500.code, message: config.errorCode500.name});
        }
    },

    deleteBoard: async (req, res) => {
        try {
            let deleted = await service.boards.deleteBoard(req.params);
            return res.json({statusCode: 200, message: "Success", deleted: deleted.deletedCount});
        } catch (err) {
            logger.error(`boardsEndpoints/deleteBoard - Error while deleting board:${err}`);
            return res.json({statusCode: config.errorCode500.code, message: config.errorCode500.name})
        }
    },

    readBoardLists: async (req, res) => {
        try {
            let board = await service.boards.readBoard(req.params);
            return res.json(board[0].listsIds)
        } catch (err) {
            logger.error(`boardsEndpoints/readBoardLists - Error while getting board lists:${err}`);
            return res.json({statusCode: config.errorCode500.code, message: config.errorCode500.name})
        }
    },
};

const listsEndpoints = {

    createList: async (req, res) => {
        try {
            const createdList = await service.lists.createList(req.query);
            await service.boards.updateListsInBoard({boardId: req.query.boardId, listId: createdList._id});
            return res.json(createdList);
        } catch (err) {
            logger.error(`listsEndpoints/createList - Error while creating list:${err}`);
            return res.json({statusCode: config.errorCode500.code, message: config.errorCode500.name});
        }
    },

    readList: async (req, res) => {
        try {
            let list = await service.lists.readList(req.params);
            return res.json(list)
        } catch (err) {
            logger.error(`listsEndpoints/readList - Error while getting list:${err}`);
            return res.json({statusCode: config.errorCode500.code, message: config.errorCode500.name});
        }
    },

    updateList: async (req, res) => {
        try {
            let updatedList = await service.lists.updateList({listId: req.params.id, list: req.query});
            return res.json(updatedList)
        } catch (err) {
            logger.error(`listsEndpoints/updateList - Error while updating list:${err}`);
            return res.json({statusCode: config.errorCode500.code, message: config.errorCode500.name});
        }
    },

    deleteList: async (req, res) => {
        try {
            let deletedList = await service.lists.deleteList(req.params);
            await service.boards.deleteFromBoard({listId: req.params.id, boardId: req.query.boardId});
            res.json(deletedList)
        } catch (err) {
            logger.error(`listsEndpoints/deleteList - Error while deleting list:${err}`);
            return res.json({statusCode: config.errorCode500.code, message: config.errorCode500.name});
        }
    },

    readCardsOnList: async (req, res) => {
        try {
            let list = await service.lists.readList(req.params);
            if (list) {
                return res.json(list[0].cardsId)
            }
            return res.json({statusCode: 404, message: "List not found"});
        } catch (err) {
            logger.error(`listsEndpoints/readCardsOnList - Error while getting cards on list:${err}`);
            return res.json({statusCode: config.errorCode500.code, message: config.errorCode500.name});
        }
    },

    archiveOrRestoreList: async (req, res) => {
        try {
            let archive = req.query.value === "true" ? true : false;
            await service.lists.archiveOrRestoreList(req.params.id, archive);
            return res.json({statusCode: 200, message: "Success", archived: archive});
        } catch (err) {
            logger.error(`listsEndpoints/archiveOrRestoreList - Error while archiving list:${err}`);
            return res.json({statusCode: config.errorCode500.code, message: config.errorCode500.name});
        }
    },

    moveAllCardsToList: async (req, res) => {
        try {
            let cardsIds = await service.lists.getListCardsIdsAndFlushCardsArray(req.params);
            await service.lists.pushEachCardIdToList({ cardsIds: cardsIds, listId: req.query.listId });
            return res.json({statusCode: 200, message: "Success", movedCardsIds: cardsIds})
        } catch (err) {
            logger.error(`listsEndpoints/moveAllCardsToList - Error while moving all cards:${err}`);
            return res.json({statusCode: config.errorCode500.code, message: config.errorCode500.name});
        }
    },

    moveCard: async (req, res) => {
        try {
            await service.lists.deleteFromOldList({ listId: req.params.id, cardId: req.params.cardId });
            await service.lists.updateCardsInList({listId: req.query.listId, cardId: req.params.cardId});
            return res.json({statusCode: 200, message: "Success"});
        } catch (err) {
            logger.error(`listsEndpoints/moveAllCardsToList - Error while moving card:${err}`);
            return res.json({statusCode: config.errorCode500.code, message: config.errorCode500.name});
        }
    }
};

const cardsEndpoints = {

    createCard: async (req, res) => {
        try {
            let createdCard = await service.cards.createCard(req.query);
            await service.lists.updateCardsInList({listId: req.query.listId, cardId: createdCard._id});
            return res.json(createdCard)
        } catch (err) {
            logger.error(`cardsEndpoints/createCard - Error while creating card:${err}`);
            return res.json({statusCode: config.errorCode500.code, message: config.errorCode500.name});
        }
    },

    readCard: async (req, res) => {
        try {
            let card = await service.cards.readCard(req.params);
            return res.json(card);
        } catch (err) {
            logger.error(`cardsEndpoints/readCard - Error while getting card:${err}`);
            return res.json({statusCode: config.errorCode500.code, message: config.errorCode500.name});
        }
    },

    updateCard: async (req, res) => {
        try {
            let updatedCard = await service.cards.updateCard({card: req.query, cardId: req.params.id});
            return res.json(updatedCard);
        } catch (err) {
            logger.error(`cardsEndpoints/updateCard - Error while updating card:${err}`);
            return res.json({statusCode: config.errorCode500.code, message: config.errorCode500.name});
        }
    },

    deleteCard: async (req, res) => {
        try {
            let deletedCard = await service.cards.deleteCard(req.params);
            await service.lists.deleteFromOldList({cardId: req.params.id, listId: req.query.listId});
            return res.json(deletedCard);
        } catch (err) {
            logger.error(`cardsEndpoints/deleteCard - Error while deleting card:${err}`);
            return res.json({statusCode: config.errorCode500.code, message: config.errorCode500.name});
        }
    }
};

const commentsEndpoints = {

    createCommentOnCard: async (req, res) => {
        try {
            let createdComment = await service.comments.createCommentOnCard({cardId: req.params.id,  comment: req.query});
            await service.cards.updateCommentsInCard({cardId: req.params.id, commentId: createdComment._id});
            return res.json(createdComment);
        } catch (err) {
            logger.error(`commentsEndpoints/createCommentOnCard - Error while creating comment:${err}`);
            return res.json({statusCode: config.errorCode500.code, message: config.errorCode500.name});
        }
    },

    readCommentOnCard: async (req, res) => {
        try {
            let card = await service.comments.readCommentOnCard(req.params);
            return res.json(card);
        } catch (err) {
            logger.error(`commentsEndpoints/readCommentOnCard - Error while getting comment:${err}`);
            return res.json({statusCode: config.errorCode500.code, message: config.errorCode500.name});
        }
    },

    readAllCommentsOnCard: async (req, res) => {
        try {
            let card = await service.cards.readCard(req.params);
            return res.json(card[0].commentsIds);
        } catch (err) {
            logger.error(`commentsEndpoints/readAllCommentsOnCard - Error while getting all comments:${err}`);
            return res.json({statusCode: config.errorCode500.code, message: config.errorCode500.name});
        }
    },

    updateCommentOnCard: async (req, res) => {
        try {
            let updatedComment = await service.comments.updateCommentOnCard({id: req.params.id, comment: req.query});
            return res.json(updatedComment);
        } catch (err) {
            logger.error(`commentsEndpoints/updateCommentOnCard - Error while updating comments:${err}`);
            return res.json({statusCode: config.errorCode500.code, message: config.errorCode500.name});
        }
    },

    deleteCommentOnCard: async (req, res) => {
        try {
            let deletedCard = await service.comments.deleteCommentOnCard(req.params);
            await service.cards.deleteCommentFromCard({cardId: req.query.cardId, commentId: req.params.id});
            return res.json(deletedCard);
        } catch (err) {
            logger.error(`commentsEndpoints/deleteCommentOnCard - Error while deleting comments:${err}`);
            return res.json({statusCode: config.errorCode500.code, message: config.errorCode500.name});
        }
    }

};

const usersEndpoints = {

    createUser: async (req, res) => {
        try {
            const userCredentials = await service.users.startGenerate();
            return res.json(userCredentials);
        } catch (err) {
            logger.error(`usersEndpoints/createUser - Error while creating user:${err}`);
            return res.json({statusCode: config.errorCode500.code, message: config.errorCode500.name});
        }
    }

};



module.exports = {
    boardsEndpoints: boardsEndpoints,
    listsEndpoints: listsEndpoints,
    cardsEndpoints: cardsEndpoints,
    commentsEndpoints: commentsEndpoints,
    usersEndpoints: usersEndpoints
};