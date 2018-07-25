const express        = require('express');
const cors           = require('cors')
const MongoClient    = require('mongodb').MongoClient;
const app            = express();
const db             = require('express-mongo-db')
const mongoHost      = process.env.MONGO_HOST || 'localhost'
const mongoDBName    = process.env.MONGO_DB || 'artlab'
const appRouter      = require('./routes/app');
const logger         = require('morgan')

app.use(db('mongodb://'+ mongoHost + ':27017/' + mongoDBName))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: 'http://localhost:3001',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}))

app.use(function (req, res, next) {
  res.header("Content-Type", "application/json");
  next();
})
app.use('/', appRouter);
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
