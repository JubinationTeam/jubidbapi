var User=require('./../models/schema/index.js').User;
var model=require('./../settings.js').modelter;

module.exports=dataAccessFactory;
    
function dataAccessFactory(model){
    return new DataAccessPlan(model)
};

function DataAccessPlan(model){
    
    console.log(this);
    switch(model.typeOfRequest){
        case "create":
            model.on("create", listenerCreate)
            break;
        case "delete":
            model.on("delete", listenerDelete)
            break;
        case "read":
            model.on("read", listenerRead)
            break;
        case "update":
            model.on("update", listenerUpdate)
            break;
        default:
            console.log("Wrong");
            
    }
        function listenerCreate(){
                var value={
                name: model.req.body.name,
                access: model.req.body.access,
                maxEntries: model.req.body.maxEntries

            };

            new User(value).save(function(err, doc){
                if(err) 
                {
                    model.status=err
                    model.emit(model.callback);
                }
                else
                {
                    model.status=doc
                    model.emit(model.callback);
                    console.log('Successfully created!!!');
                }
            });
        }
        function listenerDelete(){
            User.findByIdAndRemove( model.req.body.id,function(err, doc){
                if(err) 
                {
                    model.status=err
                    model.emit(model.callback);
                }
                else
                {
                    model.status=doc
                    model.emit(model.callback);
                    console.log('Successfully deleted!!!');
                }
            });
        }
        function listenerRead(){

            var query={
                //'name': model.req.body.name
                name:model.req.body.name

            };

            User.find(query,function(err, doc){
                if(err) 
                {
                    model.status=err
                    model.emit(model.callback);
                }
                else
                {
                    model.status=doc
                    model.emit(model.callback);
                    console.log('Successfully read!!!');
                }
            });
        }
        function listenerUpdate(){


            var update={
                'name': model.req.body.name 
            }



            User.findByIdAndUpdate(model.req.body.id, { $set: { 'name': model.req.body.name ,'maxEntries':model.req.body.maxEntries,'access':model.req.body.access}},callback)

           function callback(err,doc){
                if(err) 
                {
                    model.status=err
                    model.emit(model.callback);
                }
                else
                {
                    model.status=doc
                    model.emit(model.callback);
                    console.log('Successfully updated!!!');
                }
            }
        }
}


