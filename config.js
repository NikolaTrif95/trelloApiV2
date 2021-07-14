module.exports = {
    url: 'mongodb://trelloMongodb:27017/treloDb',
    routePrefix: "http://localhost:3000",
    errorCode500: {
        name : "Internal server error",
        code: 500
    },
    errorCode400: {
        nameMissing : "Bad Request - Board name missing",
        badRequest : "Bad Request",
        code: 400
    }
};