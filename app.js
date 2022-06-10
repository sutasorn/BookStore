const path = require('path')
const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const router = express.Router();
const errorControler = require('./controllers/error');
const indexRouters = require('./routes/index');
const cartRouters = require('./routes/cart');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(express.static(path.join(__dirname,'public')));

app.use(indexRouters);
app.use(cartRouters);

app.use(errorControler.error404);
app.use('/.netlify/functions/app', router);  // path must route to lambda (app.js)
app.use('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
module.exports.handler = serverless(app);