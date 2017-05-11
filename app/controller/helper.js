'use strict'

//user-defined dependencies
var model=require('./../models/objects/index.js');

//converts model into an http block
function httpBlockMutator(req, res){
    var httpBlock=model.plainModel;
    httpBlock.setMaxListeners(6);
    httpBlock.req=req
    httpBlock.res=res
    httpBlock.params=req.params
    return httpBlock;
}

//list of helper functions
var listOfFunctions={
    'httpBlockGetter':httpBlockMutator
};

//exports
module.exports=listOfFunctions;
