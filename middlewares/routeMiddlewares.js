const userController = require("../controllers/usersController");

module.exports = {

    checkName: (req, res, next) => {
        if (!req.query.name && typeof req.query.name !== "string") {
            return res.status(400).json({
                status: "Fail",
                message: "Missing name of new entity",
            });
        }
        next();
    },

    checkId: (req, res, next) => {
        if (!req.params.id && typeof req.params.id !== "string") {
            return res.status(400).json({
                status: "Fail",
                message: "Wrong ID format",
            });
        }
        next();
    },

    checkCommentId: (req, res, next) => {
        if (!req.params.commentId) {
            return res.status(400).json({
                status: "Fail",
                message: "Missing comment ID",
            });
        }
        next();
    },

    checkBoardQueryId: (req, res, next) => {
        if (!req.query.boardId) {
            return res.status(400).json({
                status: "Fail",
                message: "Missing ID of requested entity",
            });
        }
        next();
    },

    checkListQueryId: (req, res, next) => {
        if (!req.query.listId && typeof req.query.listId !== "string") {
            return res.status(400).json({
                status: "Fail",
                message: "Missing ID of requested entity",
            });
        }
        next();
    },

    checkTextForComments: (req, res, next) => {
        if (!req.query.text && typeof req.query.text !== "string" ) {
            return res.status(400).json({
                status: "Fail",
                message: "Missing text for comments",
            });
        }
        next();
    },

    checkIfUserExists: async (req, res, next) => {
        try {
            let userExist = await userController.checkIfUserExists({apiKey: req.query.apiKey, serverToken: req.query.serverToken});
            if (!userExist) {
                return res.status(400).json({
                    status: "Fail",
                    message: "User doesnt exist in our system",
                });
            }
            next();
        } catch (err) {
            return res.status(400).json({
                status: "Fail",
                message: "Internal Server Error",
            });
        }

    }
};

