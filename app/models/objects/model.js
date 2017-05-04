'use strict'

//Setup event in a model
const EventEmitter = require('events');
class Model extends EventEmitter {   }

//Creating new model
module.exports=new Model()