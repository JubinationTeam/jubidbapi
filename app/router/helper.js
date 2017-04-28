'use strict'
var objects=require('./../models/objects/index.js');


module.exports={
    'httpBlockGetter':httpBlockMutator
}


function httpBlockMutator(req, res, callback){
        var httpBlock=objects.plainModel;
        httpBlock.req=req
        httpBlock.res=res
        httpBlock.callback=callback
        return httpBlock;
    }