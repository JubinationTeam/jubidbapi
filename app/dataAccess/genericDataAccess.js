'use strict'


// event name
var globalCall;

// exports
module.exports=function(globalEmitter,global){
    globalCall=global
    globalEmitter.on(globalCall,dataAccessPlan)
}
   
// catches events based on the request and executes the required db operation
function dataAccessPlan(model)
{           
    
            console.log("Sent to DB")
            switch (model.dbOpsType)
                    {
                case "create" :
                            model.once("create", listenerCreate)
                            break;
                case "delete" :
                            model.once("delete", listenerDelete)
                            break;
                case "read" :
                            model.once("read", listenerReadByFilter)
                            break;
                case "update":    
                            model.once("update", listenerUpdate)
                            break;
                case "readById":
                            model.once("readById", listenerReadById)
                default:
                            model.status="Something went wrong";
                            model.emit(model.callbackService,model);
            }
  }

// function to create a new user
function listenerCreate(model){
    var value=model.data;
    new model.schema(value).save(function(err, doc){
        if(err) 
        {
            model.status=err
            model.emit(model.callbackService,model);
        }
        else
        {
            model.status=doc
            model.emit(model.callbackService,model);
        }
    });
}

// function to delete a user by id
function listenerDelete(model){
    model.schema.findByIdAndRemove( model.id,function(err, doc){
        if(err) 
        {
            model.status=err
            model.emit(model.callbackService,model);
        }
        else
        {
            model.status=doc
            model.emit(model.callbackService,model);
        }
    });
}

// function to read user data by user's data
function listenerReadByFilter(model){

    var query=model.data;
    model.schema.find(query,function(err, doc){
        if(err) 
        {
            model.status=err
            model.emit(model.callbackService,model);
        }
        else
        {
            model.status=doc
            model.emit(model.callbackService,model);
        }
    });
}

// function to read user data by user's id
function listenerReadById(model){
    model.schema.findById(model.id,function(err, doc){
        if(err) 
        {
            model.status=err
            model.emit(model.callbackService,model)
        }
        else
        {   
            model.status=doc
            model.emit(model.callbackService,model)
        }
    });
}

//function to update user data
function listenerUpdate(model){
    model.schema.findByIdAndUpdate(model.id, { $set: model.data},function(err,doc){
        if(err) 
        {
            model.status=err
            model.emit(model.callbackService,model);
        }
        else
        {
            model.status=doc
            model.emit(model.callbackService,model);
        }
        
    })
}