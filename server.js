'use strict'

// node dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// user-defined dependencies
var connection=require('./app/dbConnection.js');
var initFunction=require('./app/init.js').init;

// json parsing
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(jsonParser);
app.use(urlencodedParser);


// port settings
var port = process.env.PORT||80;
app.listen(port,init)

// initialiser function
function init(){
    //mongodb connection
    connection.connect();
    console.log("Server is listening");
    initFunction(); 
    //controller call
    require('./app/controller/handler.js').process(app);
 
};