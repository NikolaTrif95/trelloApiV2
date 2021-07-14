const Redis = require("ioredis"),
    {isEmpty} = require("lodash"),
    {logger} = require("../logger"),
    usersModel = require("../model/userCredentials/model");
const redis = new Redis({
    host: "trelloRedis",
    port: 6379,
});

module.exports = {

    startGenerate: async () => {
        try {
            let apiKey = createUser(30);
            let serverToken = createUser(62);
            logger.info(`userCredentials/startGenerate - Started user creation`);
            const newUser = await usersModel.createUser(apiKey, serverToken);
            await redis.hmset(`${apiKey}:${serverToken}`, "active", true);
            return newUser;
        } catch (err) {
            logger.error(`userController/startGenerate - Error while creating  user: ${err}`);
            throw err;
        }

    },

    checkIfUserExists: async (data) => {
        const hash = `${data.apiKey}:${data.serverToken}`;
        try {
            let userFromCacheDb = await redis.hgetall(hash);
            if (!isEmpty(userFromCacheDb)) {
                return true;
            }
            const userFromDb = await usersModel.checkIfUserExists(data.apiKey, data.serverToken);
            return userFromDb.length > 0;

        } catch (err) {
            logger.error(`userController/checkIfUserExists - Error while checking if user exist: ${err}`);
            throw err;
        }

    }
};

const createUser = (length) => {
    let result = '',
        characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
        charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
};

