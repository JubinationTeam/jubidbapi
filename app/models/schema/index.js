'use strict'
// user-defined dependencies
var user=require('./user.js');
var primary=require('./primary.js');
var diet=require('./diet.js');
var custStatus=require('./custStatus.js');
var healthCheckup=require('./healthCheckup.js');
var scheduledMails=require('./scheduledMails.js');
var feedback=require('./feedback.js');
var tpVendor=require('./tpVendor.js');
var leadFollowUpStatus=require('./leadFollowUpStatus.js');
var payment=require('./payment.js');
var futureRecommendations=require('./futureRecommendations.js');
var transaction=require('./transaction.js');
var auth=require('./auth.js');
var tpProducts=require('./tpProducts.js');

//exports
module.exports={
    'User':user,
    'Primary':primary,
    'Diet':diet,
    'CustStatus':custStatus,
    'HealthCheckup':healthCheckup,
    'ScheduledMails':scheduledMails,
    'Feedback':feedback,
    'TpVendor':tpVendor,
    'LeadFollowUpStatus':leadFollowUpStatus,
    'Payment':payment,
    'FutureRecommendations':futureRecommendations,
    'Transaction':transaction,
    'Auth':auth,
    'TpProducts' :tpProducts
    
};

