'use strict'

// node dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// user-defined dependencies
var connection=require('./app/dbConnection.js');
var initFunction=require('./init.js').init;

// json parsing
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(jsonParser);
app.use(urlencodedParser);

// router settings
var router = express.Router();
var authRouter= require('./app/router/authHandler.js')(router);
var opsRouter= require('./app/router/opsHandler.js')(router);
app.use('/auth',authRouter);
app.use('/ops',opsRouter);

// port settings
var port = process.env.PORT||80;
app.listen(port,init)

// initialiser function
function init(){
    //mongodb connection
    connection.connect();
    console.log("Server is listening");
    initFunction();
};
