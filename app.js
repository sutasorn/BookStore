const path = require('path')
const express = require('express');

const bodyParser = require('body-parser');

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
app.listen(3000);

