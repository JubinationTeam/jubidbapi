'use strict'
var httpBlockGetter=require('./helper.js').httpBlockGetter;
var emit=require('./../settings.js').emitter;

var callBackEventName="callback";

module.exports=function(app){



    /////////////////////////////////////////////////////////////
    app.post('/:doc/create/one', function(req, res) {
        var obj = httpBlockGetter(req,res,callbackEventName)
        obj.doc=req.params.doc
        emit.emit("authenticateRead",obj)
    });

    app.post('/:doc/create/many', function(req, res) {
        var obj = httpBlockGetter(req,res,callbackEventName)
        obj.doc=req.params.doc
        emit.emit("createMany",obj)
    });

    app.post('/:doc/read/:key/:val', function(req, res) {
        var obj = httpBlockGetter(req,res,callbackEventName)
        obj.doc=req.params.doc
        obj.key=req.params.key
        obj.val=req.params.val
        emit.emit("readWithFilter",obj)
    });

    app.post('/:doc/read/all', function(req, res) {
       var obj = httpBlockGetter(req,res,callbackEventName)
        obj.doc=req.params.doc
        emit.emit("readAll",obj)
    });

    app.post('/:doc/read/match', function(req, res) {
        var obj = httpBlockGetter(req,res,callbackEventName)
        obj.doc=req.params.doc
        emit.emit("readMatch",obj)
    });

    app.post('/:doc/update/:key/:val', function(req, res) {
        var obj = factory(req,res)
        obj.doc=req.params.doc
        obj.key=req.params.key
        obj.val=req.params.val
        emit.emit("updateOne",obj)
    });

    app.post('/:doc/delete', function(req, res) {
        var obj = factory(req,res)
        obj.doc=req.params.doc
        emit.emit("deleteOne",obj)
    });

    
    return app;
    //////////////////////////////////////////////////////////////
    

}