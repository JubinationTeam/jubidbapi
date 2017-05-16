
'use strict'

//function to validate the data in the request body
function firstGuard(model){
    model.info="";
    if(model.dbOpsType){
        switch (model.dbOpsType)
        {
             case "create"  :   if(model.data&&model.schema){
                                model.tag=true;
                            }
                            else{
                                model.info+=' No data or schema';
                                model.tag=false;  
                            }
                            break;

            case "read"     :  if(model.id&&model.schema){
                                model.dbOpsType="readById"
                                model.tag=true;
                            }
                            else if(model.data&&model.pageNo&&model.schema){
                                model.tag=true;
                            }
                            else{
                                model.info+=' Invalid body request';
                                model.tag=false; 

                            }
                            break;

            case "update"  :if(model.id&&model.data&&model.schema){
                                model.tag=true;
                            }
                            else{
                                model.info+=' Specify the id,schema and the data to be updated';
                                model.tag=false; 
                            }
                            break;

            case "delete"  :if(model.id&&model.schema){
                                 model.tag=true;
                            }
                            else{
                                 model.info+=' Specify the id and schema';
                                 model.tag=false;
                            }
                            break;
                            
            default         :model.info='URL Not Valid, Use create/read/delete/update'
                            model.tag=false;
                            break;  
            }
        }
        else{
            model.info='URL Not Valid, Use create/read/delete/update'
            model.tag=false;
        }
        return model;
}

//exports
module.exports=firstGuard;

