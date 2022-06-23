const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const errorControler = require('../controllers/error');
const indexRouters = require('../routes/index');
const cartRouters = require('../routes/cart');
const app = express();
import path from 'path';
const _dirname = path.resolve();
//const path = require('path')
app.set('view engine', 'ejs');
app.set('views', 'views');
app.engine('ejs', require('ejs').__express);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.use(express.static(path.join(__dirname,'public')));
//app.use('/css',express.static(path.join(_dirname,'public/css')));
console.log(_dirname,"ddd")

app.use(indexRouters);
app.use(cartRouters);

app.use(errorControler.error404);
export async function handler(event, context) {
    const wrapper = serverless(app);
    return wrapper(event, context);
  }