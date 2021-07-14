const interfacesPath = "./controllers";
module.exports = {
    lists: require(`${interfacesPath}/listsController`),
    boards: require(`${interfacesPath}/boardsController`),
    cards: require(`${interfacesPath}/cardsController`),
    comments: require(`${interfacesPath}/commentsController`),
    users: require(`${interfacesPath}/usersController`)
};