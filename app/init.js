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

//variables required by controller init function
var routerInitModel={
        'globalEmitter':globalEmitter,
        'url':url,
        'validRequestEntities':validRequestEntities
    };

const globalDataAccessCall='dataAccessCall';


//instantiating Handler,Service layer and Data Access layer
function init(){
    controllerInit(routerInitModel);
    serviceAuthorizeOps(globalEmitter,'admin',globalDataAccessCall);
    serviceAuthenticate(globalEmitter,'user',globalDataAccessCall);
    genericDataAccess(globalEmitter,globalDataAccessCall);
}

//exports
module.exports.init=init;