const express = require('express'),
    cookieParser = require('cookie-parser'),
    mongoose = require("mongoose"),
    middleware = require("./middlewares/routeMiddlewares"),
    config = require("./config"),
    chalk = require('chalk'),
    indexRouter = require('./routes/router'),
    swStats = require("swagger-stats"),
    Redis = require('ioredis'),
    redisClient = new Redis(6379,  "trelloRedis"),
    RateLimit = require("express-rate-limit"),
    RedisStore = require("rate-limit-redis");


const app = express();

const limiter = new RateLimit({
  store: new RedisStore({
    client: redisClient
  }),
  max: 100,
  delayMs: 0,
});
//${process.env.REDIS_URL}
redisClient.on('connect', () => {
  console.log(`%s Redis client is connected on address: `, chalk.green('✔'));
});

redisClient.on('error', (err) => {
  console.log(`%s Redis connection error. Please make sure redis-server is running.${err}`, chalk.red('✗'));
});

//  apply to all requests
app.use(limiter);

app.use(swStats.getMiddleware({}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(/\/((?!users).)*/, middleware.checkIfUserExists);
app.use('/', indexRouter);


// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
// });
// mongoose.set('useFindAndModify', false);
// mongoose.set('useCreateIndex', true);
// mongoose.set('useNewUrlParser', true);
// mongoose.set('useUnifiedTopology', true);

const db = mongoose.connection;

mongoose.connect(config.url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: true });
mongoose.connection.on('error', (err) => {
  console.error(err);
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  // eslint-disable-next-line no-undef
  process.exit();
});

db.once('open', () => {
  console.log(`%s Mongo database is connected on address: ${config.url}`, chalk.green('✔'));
});




module.exports = app;
