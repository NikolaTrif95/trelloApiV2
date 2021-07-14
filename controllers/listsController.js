const model = require("../model/list/model"),
    {logger} = require("../logger");


module.exports = {

    createList: async (data) => {
        try {
            logger.info("boardsController/createList- Starting list creation");
            let createdList = await model.createList(data);
            return createdList;
        } catch (err) {
            logger.error(`boardsController/createList - Error while creating list:${err}`);
            throw err;
        }
    },

    readList: async (data) => {
        try {
            logger.info("boardsController/readList- Getting list");
            return await model.readList(data.id);
        } catch (err) {
            logger.error(`listsController/readList - Error while getting list:${err}`);
            throw err;
        }
    },

    updateList: async (data) => {
        try {
            logger.info("boardsController/updateList- Updating list");
            return await model.updateList(data.listId, data.list);
        } catch (err) {
            logger.error(`listsController/updateList - Error while updating list:${err}`);
            throw err;
        }
    },

    deleteList: async (data) => {
        try {
            logger.info("boardsController/deleteList- Deleting list");
            return await model.deleteList(data.id);
        } catch (err) {
            logger.error(`listsController/deleteList - Error while deleting list:${err}`);
            throw err;
        }
    },

    updateCardsInList: async (data) => {
        try {
            logger.info("boardsController/updateCardsInList- Updating list");
            if(data.listId && data.cardId) {
                return  await model.updateCardsArray(data.listId, data.cardId);
            }
        } catch (err) {
            logger.error(`listsController/updateCardsInList - Error while updating list:${err}`);
            throw err;
        }
    },

    archiveOrRestoreList: async (data) => {
        try {
            logger.info("boardsController/archiveOrRestoreList- Updating list");
            return await model.archiveOrRestoreList(data.id, data.archive);
        } catch (err) {
            logger.error(`listsController/archiveOrRestoreList - Error while updating list:${err}`);
            throw err;
        }
    },

    getListCardsIdsAndFlushCardsArray: async (data) => {
        try {
            logger.info("boardsController/getListCardsIdsAndFlushCardsArray- Updating list");
            const list = await model.getListCardsIds(data.id);
            await cleanCardsFromList(data.id);
            return list[0].cardsId;
        } catch (err) {
            logger.error(`listsController/getListCardsIdsAndFlushCardsArray - Error while updating list array :${err}`);
            throw err;
        }
    },

    pushEachCardIdToList: async (data) => {
        try {
            logger.info("boardsController/pushEachCardIdToList- Updating list");
            return await model.pushCardsIdsToList(data.listId, data.cardsIds);
        } catch (err) {
            logger.error(`listsController/pushEachCardIdToList - Error while pushing new cards to list doc:${err}`);
            throw err;
        }
    },

    deleteFromOldList: async (data) => {
        try {
            logger.info("boardsController/deleteFromOldList- Deleting cards from list");
            await model.deleteFromOldList(data.listId, data.cardId);
        } catch (err) {
            logger.error(`listsController/deleteFromOldList - Error while deleting card from old list:${err}`);
            throw err
        }
    },
};


const cleanCardsFromList = async (listId) => {
    try {
        const toUpdate = {
            cardsId: []
        };
        logger.info("boardsController/cleanCardsFromList- Updating cards in list");
        await model.updateList(listId, toUpdate);
    } catch(err) {
        logger.error(`listsController/cleanCardsFromList - Error while cleaning card array in list doc:${err}`);
        throw err
    }
};