'use strict'

//data access
var genericDataAccess=require('jubi-mongoose-data-access');

//controller
var controllerInit=require('jubi-express-controller').init;

//services
var serviceAuthorizeOps=require('./services/profileManager/adminProfileService.js');
var serviceAuthenticate=require('./services/operations/userService.js');


//global event emitter
const EventEmitter = require('events');
class GlobalEmitter extends EventEmitter {   }
const globalEmitter = new GlobalEmitter();
globalEmitter.setMaxListeners(3);

//url variables
const postUrlDef='/:type/:ops';
const getUrlDef='/';

//valid url's
var validRequestEntities={
                            "post":["admin/create/","admin/read/","admin/delete/","admin/update/",
                         "user/create/","user/read/","user/delete/","user/update/"],
                            "get":[]
                         };


const globalDataAccessCall='dataAccessCall';

//variables required by controller init function
var routerInitModel={
        'globalEmitter':globalEmitter,
        'postUrlDef':postUrlDef,
        'getUrlDef':getUrlDef,
        'validRequestEntities':validRequestEntities,
        'callbackName':'callbackRouter',
        'nextCall':'service'
    };
//variables required by data access init function
var dataAccessInitModel={
        'globalEmitter':globalEmitter,
        'nextCall':'dataAccessCall'
        
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