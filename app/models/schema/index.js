'use strict'
// user-defined dependencies
var user=require('./user.js').User;
var primary=require('./primary.js').primary;
var diet=require('./diet.js').diet;
var custStatus=require('./custStatus.js').custStatus;
var healthCheckup=require('./healthCheckup.js').healthCheckup;
var scheduledMails=require('./scheduledMails.js').scheduledMails;
var feedback=require('./feedback.js').feedback;
var tpVendor=require('./tpVendor.js').tpVendor;
var leadFollowUpStatus=require('./leadFollowUpStatus.js').leadFollowUpStatus;
var payment=require('./payment.js').payment;
var futureRecommendations=require('./futureRecommendations.js').futureRecommendations;
var transaction=require('./transaction.js').transaction;
var auth=require('./auth.js').auth
var tpProducts=require('./tpProducts.js').tpProducts;

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

