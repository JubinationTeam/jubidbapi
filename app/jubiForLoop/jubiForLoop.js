
module.exports=function(data,array,customFunction,callbackFunction){
    
    array.forEach(function(key,i){
        setTimeout(function(){
            customFunction(data,key);
                if((i+1)===array.length){
                        callbackFunction(data)
                    }
        },500)
        })
    
}