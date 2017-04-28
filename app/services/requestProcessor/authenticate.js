//var emit=require('./../../settings.js').emitter;
//var User=require('./../../models/schema/index.js').User;

//emit.on("authenticateRead", listener)
//
//function listener(obj)
//{
//User.findById(obj.req.body.id,function(err, doc){
//        if(err) 
//        {
//            obj.status=err
//            emit.emit('sendBackResponse',obj);
//        }
//        else
//        {
//            console.log(doc.access)
//            obj.status=doc
//            for(var i=0;i<=doc.access.length;i++)
//                {
//                    
//                    if(doc.access[i]=="R")
//                        {
//                            
//                    console.log("Accress Granted"+doc.access[i]);
//                        }
//                    
//                }
//            emit.emit('sendBackResponse',obj);
//            console.log('Successfully read!!!');
//        }
//    });
//}