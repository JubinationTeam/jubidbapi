'use strict'
// user-defined dependencies

var User=require('./../models/schema/index.js').User;

// event name
const globalUserDataAccessCall='userDataAccessCall'

// exports
module.exports=function(globalEmitter){
    globalEmitter.on(globalUserDataAccessCall,dataAccessPlan)
}
   
// catches events based on the request and executes the required db operation
function dataAccessPlan(model)
{
            model.once("create", listenerCreate)
            model.once("delete", listenerDelete)
            model.once("read", listenerReadByName)
            model.once("update", listenerUpdate)
            model.once("readById", listenerReadById)
}

// function to create a new user
function listenerCreate(model){
        var value={
        name: model.req.body.name,
        access: model.req.body.access,
        maxEntries: model.req.body.maxEntries

    };

    new User(value).save(function(err, doc){
        if(err) 
        {
            model.status=err
            model.emit(model.callbackService,model);
        }
        else
        {
            model.status=doc
            model.emit(model.callbackService,model);
            console.log('Successfully created!!!');
        }
    });
}

// function to delete a user by id
function listenerDelete(model){
    User.findByIdAndRemove( model.req.body.id,function(err, doc){
        if(err) 
        {
            model.status=err
            model.emit(model.callbackService,model);
        }
        else
        {
            model.status=doc
            model.emit(model.callbackService,model);
            console.log('Successfully deleted!!!');
        }
    });
}

// function to read user data by user's name
function listenerReadByName(model){

    var query={
        //'name': model.req.body.name
        name:model.req.body.name

    };

    User.find(query,function(err, doc){
        if(err) 
        {
            model.status=err
            model.emit(model.callbackService,model);
        }
        else
        {
            model.status=doc
            model.emit(model.callbackService,model);
            console.log('Successfully read!!!');
        }
    });
}

// function to read user data by user's id
function listenerReadById(model){

    User.findById(model.req.body.id,function(err, doc){
        if(err) 
        {
            model.status=err;
            model.emit(model.callbackService,model)
        }
        else
        {   
            model.status=doc;
            model.emit(model.callbackService,model)
            console.log('Successfully Authenticated!!!');
        }
    });
}

//function to update user data
function listenerUpdate(model){
    
    var update={
        'name': model.req.body.name 
    }

    User.findByIdAndUpdate(model.req.body.id, { $set: { 'name': model.req.body.name ,'maxEntries':model.req.body.maxEntries,'access':model.req.body.access}},callback)

   function callback(err,doc){
        if(err) 
        {
            model.status=err
            model.emit(model.callbackService,model);
        }
        else
        {
            model.status=doc
            model.emit(model.callbackService,model);
            console.log('Successfully updated!!!');
        }
    }
}
