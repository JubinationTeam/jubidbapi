'use strict'

var httpBlockGetter=require('./helper.js').httpBlockGetter;
var emit=require('./../settings.js').emitter;
var service=require('./../services/authorizationProcessor/authorization.js');

const callbackEventName='sendBackResponse';



module.exports=function(app){
    console.log(this);
    app.post('/create', (req,res)=>{
        var model=httpBlockGetter(req,res,callbackEventName)
        model.typeOfRequest="create"
        model = init(model)
        model.emit("create-service")
    });
    app.post('/read', (req,res)=>{
        var model=httpBlockGetter(req,res,callbackEventName)
        model.typeOfRequest="read"
        model = init(model)
        model.emit("read-service")
    });
    app.post('/update', (req,res)=>{
        var model=httpBlockGetter(req,res,callbackEventName)
        model.typeOfRequest="update"
        model = init(model)
        model.emit("update-service")
    });
    app.post('/delete', (req,res)=>{
        var model=httpBlockGetter(req,res,callbackEventName)
        model.typeOfRequest="delete"
        model = init(model)
        model.emit("delete-service")
    });
    return app;
    
}

function init(model){
        //Instantiating a Service Plan through Factory
        service(model)
        model.on(callbackEventName, ()=>{model.res.send(model.status)})
        return model;
} 