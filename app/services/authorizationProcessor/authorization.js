'use strict'


var emit=require('./../../settings.js').emitter;

var dataAccess=require('./../../dataAccess/userDataAccess.js');


//Factory for the service plan
module.exports=function(model){
    return new ServicePlan(model)
};
    
    
//Constructor for service plan
function ServicePlan(model){
    console.log(this);
    switch(model.typeOfRequest){
        case "create":
            model.on('create-service', ()=>{
                dataAccess(model);
                model.emit("create");
            });
            break;
        case "read":
            model.on('read-service', ()=>{
                dataAccess(model);
                model.emit("read");
            });
            break;
        case "update":
            model.on('update-service', ()=>{
                dataAccess(model);
                model.emit("update");
            });
            break;
        case "delete":
            model.on('delete-service', ()=>{
                dataAccess(model);
                model.emit("delete");
            });
            break;
        default:
            console.log("Mannn! you are at wrong place");
    }
}
