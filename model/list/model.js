const listSchema = require("./schema.js"),
    logger = require("../../logger"),
    mongoose = require("mongoose");


// Compile model from schema
const listModel = mongoose.model('Lists', listSchema );

const createModel = (listParams) => {
    const newList = {
        name: listParams.name,
    };
    return new listModel(newList);
};

module.exports = {

    createList: async (listParams) => {
        try {
            const newList = createModel(listParams);
            return await newList.save();
        } catch (err) {
            logger.error(`list/model/createList - Error while creating list:${err}`);
            throw err;
        }
    },

    updateList: async (listId, list) => {
        try {
            const listQuery = {_id: listId},
                newListValues = {$set: list},
                options = {$upsert: true};
            return await listModel.updateOne(listQuery, newListValues, options);
        }
        catch (err) {
            logger.error(`list/model/updateList - Error while updating list:${err}`);
            throw err;
        }
    },

    deleteList: async (listId) => {
        try {
            const listQuery = {_id: listId},
                options = {justOne: true};
            return await listModel.remove(listQuery, options);
        }
        catch (err) {
            logger.error(`list/model/deleteList - Error while deleting list:${err}`);
            throw err;
        }
    },

    archiveOrRestoreList: async (listId, archiveValue) => {
        try {
            const listQuery = {_id: listId},
                value = {$set: {archived: archiveValue}},
                options = {$upsert: true};
            return await listModel.updateOne(listQuery, value, options);
        }
        catch (err) {
            logger.error(`list/model/archiveOrRestoreList - Error while updating list:${err}`);
            throw err;
        }
    },

    readList: listId => new Promise((resolve, reject) => {
        const listQuery = {_id: listId};
        listModel.find(listQuery)
            .populate({
                path: "cardsId",
                populate: {
                    path: "commentsIds",
                    model: "comments"
                }
            })
            .exec(function(err, docs) {
                if(err) {
                    return reject( {
                        status: 404,
                        message: 'Card does not exist in db'
                    });
                }
                return resolve(docs);
            });
    }),

    getListCardsIds: async (listId) => {
        try {
            const listQuery = {_id: listId};
            return await listModel.find(listQuery);
        } catch (err) {
            logger.error(`list/model/getListCardsIds - Error while getting list cardsId:${err}`);
            throw err;
        }
    },

    pushCardsIdsToList: async (listId, cardIds) => {
        try {
            const listQuery = {_id: listId},
                newListValues = {$push: {cardsId: {$each: cardIds}}};
            return await listModel.updateOne(listQuery, newListValues);
        } catch (err) {
            logger.error(`list/model/pushCardsIdsToList - Error while adding to list cardsId array:${err}`);
            throw err;
        }
    },

    updateCardsArray: async (listId, cardId) => {
        try {
            const listQuery = {_id: listId},
                newListValues = {$push: {cardsId: cardId}};
            return await listModel.updateOne(listQuery, newListValues);
        }
        catch (err) {
            logger.error(`list/model/updateCardsArray - Error while updating list cardsId array:${err}`);
            throw err;
        }
    },

    deleteFromOldList: async (listId, cardId) => {
        try {
            const cardQuery = {_id: listId},
                update = { $pull: { cardsId: cardId }};
            return await listModel.updateOne(cardQuery, update);
        }
        catch (err) {
            logger.error(`list/model/deleteFromOldList - Error while deleting cardsId from list:${err}`);
            throw err;
        }
    }
};