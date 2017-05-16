'use strict'

//services
var serviceAuthorizeOps=require('./services/profileManager/adminProfileService.js');
var serviceAuthenticate=require('./services/operations/userService.js');
var controllerInit=require('./controller/handler.js').init;

//data access
var genericDataAccess=require('./dataAccess/genericDataAccess.js');

//global event emitter
const EventEmitter = require('events');
class GlobalEmitter extends EventEmitter {   }
const globalEmitter = new GlobalEmitter();
globalEmitter.setMaxListeners(3);

//url variables
const url='/:type/:ops';

//valid url's
var validRequestEntities=["admin/create/","admin/read/","admin/delete/","admin/update/",
                         "user/create/","user/read/","user/delete/","user/update/"];

const globalDataAccessCall='dataAccessCall';

//variables required by controller init function
var routerInitModel={
        'globalEmitter':globalEmitter,
        'url':url,
        'validRequestEntities':validRequestEntities,
        'callbackName':'callbackRouter'
    };

var dataAccessInitModel={
        'globalEmitter':globalEmitter,
        'callName':globalDataAccessCall
    };



//instantiating Handler,Service layer and Data Access layer
function init(){
    controllerInit(routerInitModel);
    serviceAuthorizeOps(globalEmitter,'admin',globalDataAccessCall);
    serviceAuthenticate(globalEmitter,'user',globalDataAccessCall);
    genericDataAccess(dataAccessInitModel);
}

//exports
module.exports.init=init;