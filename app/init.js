'use strict'

//services
var serviceAuthorizeOps=require('./services/profileManager/userProfileService.js');
var serviceAuthenticate=require('./services/operations/authenticateService.js');
var controllerInit=require('./controller/handler.js').init;

//data access
var genericDataAccess=require('./dataAccess/genericDataAccess.js');

//global event emitter
const EventEmitter = require('events');
class GlobalEmitter extends EventEmitter {   }
const globalEmitter = new GlobalEmitter();

//url variables
const url='/:type/:ops';

//valid url's
var validRequestEntities=["admin/create/","admin/read/","admin/delete/","admin/update/",
                         "user/create/","user/read/","user/delete/","user/update/"];

//variables required by controller init function
var routerInitModel={
        'globalEmitter':globalEmitter,
        'url':url,
        'validRequestEntities':validRequestEntities
    };


//instantiating Handler,Service layer and Data Access layer
function init(){
    controllerInit(routerInitModel);
    serviceAuthorizeOps(globalEmitter,'admin');
    serviceAuthenticate(globalEmitter,'user');
    genericDataAccess(globalEmitter);
}

//exports
module.exports.init=init;