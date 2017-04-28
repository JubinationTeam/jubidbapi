'use strict'

var schema=require('./app/settings.js');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var router = express.Router();
var port = process.env.PORT||80;

var authRouter= require('./app/router/authHandler.js')(router);
var opsRouter= require('./app/router/opsHandler.js')(router);


// create application/json parser 
var jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser 
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(jsonParser);
app.use(urlencodedParser);

app.use('/auth',authRouter);
app.use('/ops',opsRouter);

app.listen(port,()=>{schema.connect(); console.log("Server is listening");});
