const userCredSchema = require("./schema.js"),
    {logger} = require("../../logger"),
    mongoose = require("mongoose");


// Compile model from schema
const usersCred = mongoose.model('userCredentials', userCredSchema );

const createModel = (apiKey, serverToken) => {
    const newUser = {
        apiKey: apiKey,
        serverToken: serverToken
    };
    logger.info(`User - ${JSON.stringify(newUser)}`);
    return new usersCred(newUser);
};

module.exports = {

    checkIfUserExists: async (apiKey, serverToken)  => {
        try {
            return await usersCred.find({apiKey: apiKey, serverToken: serverToken});
        } catch (err) {
            logger.error(`userCredentials/model/checkIfUserExists - Error while checking if user exist: ${err}`);
            throw err;
        }
    },

    createUser: async (apiToken, serverToken)  => {
        try {
            const newUser = createModel(apiToken, serverToken);
            return await newUser.save({apiToken: apiToken, serverToken: serverToken});
        } catch (err) {
            logger.error(`userCredentials/model/createUser - Error while creating user:${err}`);
            throw err;
        }
    }

};