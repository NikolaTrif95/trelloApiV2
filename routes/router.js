const express = require("express"),
    middlewares = require("../middlewares/routeMiddlewares"),
    endpoitns = require("../interfaces/endpoitns"),
    services = require("../service");

module.exports = (function () {

    const router = express.Router();
    const registerBoardsRouter =  (service, routePrefix) => {

        /*
        * Route creating board
        * POST /1/boards/
        * @queryParam apiKey - required
        * @queryParam serverToken - required
        * @param name - required
        */
        router.route(`${routePrefix}/`).post(middlewares.checkName, endpoitns.boardsEndpoints.createBoard);

        /*
        * Route for reading board
        * GET /1/boards/{id}
        * @queryParam apiKey - required
        * @queryParam serverToken - required
        * @param id - required
        */
        router.route(`${routePrefix}/:id`).get(middlewares.checkId, endpoitns.boardsEndpoints.readBoard);

        /*
        * Route for updating board
        * PUT /1/boards/{id}
        * @queryParam apiKey - required
        * @queryParam serverToken - required
        * @queryParam name - param to update
        * @param id - required
        */
        router.route(`${routePrefix}/:id`).put(middlewares.checkId, endpoitns.boardsEndpoints.updateBoard);

        /*
        * Route for deleting board
        * DELETE /1/boards/{id}
        * @queryParam apiKey - required
        * @queryParam serverToken - required
        * @param id - required
        */
        router.route(`${routePrefix}/:id`).delete(middlewares.checkId, endpoitns.boardsEndpoints.deleteBoard);

        /*
        * Route for getting lists on board
        * GET /1/boards/{id}/lists
        * @queryParam apiKey - required
        * @queryParam serverToken - required
        * @param id - required
        */
        router.route(`${routePrefix}/:id/lists`).get(middlewares.checkId, endpoitns.boardsEndpoints.readBoardLists);

    };

    const registerListsRouter =  (service, routePrefix) => {

        /*
        * Route creating List
        * POST /1/lists/
        * @queryParam apiKey - required
        * @queryParam serverToken - required
        * @queryParam boardId - required
        * @queryParam name - required
        */
        router.route(`${routePrefix}/`).post(middlewares.checkBoardQueryId, middlewares.checkName, endpoitns.listsEndpoints.createList);

        /*
        * Route for reading List
        * GET /1/lists/{id}
        * @queryParam apiKey - required
        * @queryParam serverToken - required
        * @param id - required
        */
        router.route(`${routePrefix}/:id`).get(middlewares.checkId, endpoitns.listsEndpoints.readList);

        /*
        * Route for updating list
        * PUT /1/lists/{id}
        * @queryParam apiKey - required
        * @queryParam serverToken - required
        * @queryParam name - param to update
        * @param id - required
        */
        router.route(`${routePrefix}/:id`).put(middlewares.checkId, endpoitns.listsEndpoints.updateList);

        /*
        * Route for deleting List
        * DELETE /1/lists/{id}
        * @queryParam apiKey - required
        * @queryParam serverToken - required
        * @param id - required
        */
        router.route(`${routePrefix}/:id`).delete(middlewares.checkId, endpoitns.listsEndpoints.deleteList);

        /*
        * Route for archive/unarchived list
        * PUT /1/lists/{id}/closed
        * @queryParam apiKey - required
        * @queryParam serverToken - required
        * @queryParam value - set to true to archive
        * @param id - required
        */
        router.route(`${routePrefix}/:id/closed`).put(middlewares.checkId, endpoitns.listsEndpoints.archiveOrRestoreList);

         /*
         * Get all cards on list
         * GET /1/lists/{id}/cards
         * @param apiKey - required
         * @param serverToken - required
         * @param id - required
         */
        router.route(`${routePrefix}/:id/cards`).get(middlewares.checkId, endpoitns.listsEndpoints.readCardsOnList);

         /*
         * Move all cards on list
         * POST /1/lists/{id}/moveAllCards
         * @queryParam apiKey - required
         * @queryParam serverToken - required
         * @queryParam listId - required
         * @queryParam boardId - required
         * @param id - required
         */
        router.route(`${routePrefix}/:id/moveAllCards`).post(endpoitns.listsEndpoints.moveAllCardsToList);

        /*
        * I didn't find this route in trello API docs, but find it on trello API forum https://community.atlassian.com/t5/Trello-questions/How-to-move-card-form-one-list-to-another-list-using-cardID/qaq-p/1529729
        * Route for deleting card
        * PUT /1/cards/{id}/{listId}
        * @queryParam apiKey - required
        * @queryParam serverToken - required
        * @queryParam listId - required
        * @Param id - required
        */
        router.route(`${routePrefix}/:cardId/:id/moveCard`).put(middlewares.checkId, endpoitns.listsEndpoints.moveCard);

    };

    const registerCardsRouter =  (service, routePrefix) => {

        /*
        * Route creating card
        * POST /1/cards/
        * @queryParam apiKey - required
        * @queryParam serverToken - required
        * @queryParam listId - required
        * @queryParam name - required
        */
        router.route(`${routePrefix}/`).post(middlewares.checkListQueryId, middlewares.checkName, endpoitns.cardsEndpoints.createCard);


        /*
        * Route for reading card
        * GET /1/cards/{id}
        * @queryParam apiKey - required
        * @queryParam serverToken - required
        * @param id - required
        */
        router.route(`${routePrefix}/:id`).get(middlewares.checkId, endpoitns.cardsEndpoints.readCard);


        /*
        * Route for updating card
        * PUT /1/cards/{id}
        * @queryParam apiKey - required
        * @queryParam serverToken - required
        * @queryParam name - param to update
        * @param id - required
        */
        router.route(`${routePrefix}/:id`).put(middlewares.checkId, endpoitns.cardsEndpoints.updateCard);


        /*
        * Route for deleting card
        * DELETE /1/cards/{id}
        * @queryParam apiKey - required
        * @queryParam serverToken - required
        * @queryParam listId - required
        * @param id - required
        */
        router.route(`${routePrefix}/:id`).delete(middlewares.checkId, endpoitns.cardsEndpoints.deleteCard);

    };

    const registerCommentsRouter =  (service, routePrefix) => {

        /*
        *
        * Route for creating comment on card
        * POST /1/cards/{id}/actions/comments
        * @queryParam apiKey - required
        * @queryParam serverToken - required
        * @queryParam text - required
        * @param id - required
        */
        router.route(`${routePrefix}/:id`).post(middlewares.checkId, middlewares.checkTextForComments,  endpoitns.commentsEndpoints.createCommentOnCard);

        /*
        * Route for reading comment on card
        * GET /1/cards/{id}/actions/comments
        * @queryParam apiKey - required
        * @queryParam serverToken - required
        * @param id - required
        */
        router.route(`${routePrefix}/:id`).get(middlewares.checkId, endpoitns.commentsEndpoints.readCommentOnCard);

        /*
        * Route for reading all comments on card
        * GET /1/cards/{id}/actions/comments
        * @queryParam apiKey - required
        * @queryParam serverToken - required
        * @param id - required
        */
        router.route(`${routePrefix}/:id/all`).get(middlewares.checkId, endpoitns.commentsEndpoints.readAllCommentsOnCard);

        /*
        * PUT /1/cards/{id}/actions/{idAction}/comments
        * Route for creating comment on card
        * @queryParam apiKey - required
        * @queryParam serverToken - required
        * @queryParam name - param to update
        * @param id - required
        */
        router.route(`${routePrefix}/:id`).put(middlewares.checkId, middlewares.checkTextForComments, endpoitns.commentsEndpoints.updateCommentOnCard);

        /*
        * POST /1/cards/{id}/actions/comments
        * Route for creating comment on card
        * @queryParam apiKey - required
        * @queryParam serverToken - required
        * @queryParam cardId - required
        * @param id - required
        */
        router.route(`${routePrefix}/:id`).delete(middlewares.checkId, endpoitns.commentsEndpoints.deleteCommentOnCard);

    };

    const registerUsersRouter =  (service, routePrefix) => {
        /*
        * POST /1/cards/{id}/actions/comments
        * Route for creating comment on card
        * @queryParam apiKey - required
        * @queryParam serverToken - required
        */
        router.route(`${routePrefix}/`).post(endpoitns.usersEndpoints.createUser);
    };

    registerBoardsRouter(services, "/1/boards");
    registerListsRouter(services, "/1/lists");
    registerCardsRouter(services, "/1/cards");
    registerCommentsRouter(services, "/1/comments");
    registerUsersRouter(services, "/users");

    return router;
}());