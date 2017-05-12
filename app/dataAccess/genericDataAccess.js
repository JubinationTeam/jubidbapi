'use strict'



// exports
module.exports=function(globalEmitter,global){
    globalEmitter.on(global,dataAccessPlan)
}

var array=[];


// catches events based on the request and executes the required db operation
function dataAccessPlan(model)
{           
    
  //  console.log("setting database ops "+model.dbOpsType)
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
                            break;
                default:
                            model.status="Something went wrong";
                            console.log("emitting wrong "+model.dbOpsType)
                            model.emit(model.callbackService,model);
            }
  }




// function to create a new user
function listenerCreate(model){ 
    array.push(model);
    //console.log("entered create "+" "+model.dbOpsType)
    new model.schema(model.data).save((err,doc)=>{postDb(this,err,doc)});
}

// function to delete a user by id
function listenerDelete(model){
     model.schema.findByIdAndRemove(model.id,(err,doc)=>{postDb(this,err,doc)});
}

// function to read user data by user's data
function listenerReadByFilter(model){
     model.schema.find(model.data,(err,doc)=>{postDb(this,err,doc)});
}

// function to read user data by user's id
function listenerReadById(model){
    model.schema.findById(model.id,(err,doc)=>{postDb(this,err,doc)});
}

//function to update user data
function listenerUpdate(model){
    model.schema.findByIdAndUpdate(model.id, { $set: model.data},(err,doc)=>{postDb(this,err,doc)})
}

function postDb(model,err,doc){
       // console.log("emitting "+" "+model.dbOpsType)
        if(err){
            console.log(err)
            model.status=err
        }
        else{
            model.status=doc
        }
        model.emit(model.callbackService,model);
}


module.exports.printArrays=printArrays

    function printArrays(data){
    array.forEach(function(obj){
            console.log(obj.uniqueId+"::"+data)
        });
}