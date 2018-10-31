'use strict';
const AccessToken = require('twilio').jwt.AccessToken;
const got = require('got');
const SyncGrant = AccessToken.SyncGrant;
const config = require('./config.js');
var SyncClient = require('twilio-sync');
var syncClient = new SyncClient(getToken());
const url = 'http://localhost:4567/status';

//create a token for Sync
function getToken(){
  let identity = 'smeListMonitor';
  let syncGrant = new SyncGrant({
    serviceSid: config.serviceSid,
  });
  let token = new AccessToken(
    config.accountSid, 
    config.apiKey, 
    config.apiSecret
  );
  token.addGrant(syncGrant);
  token.identity = identity;
  var ret = token.toJwt();
  return ret;
};


//syncClient.list('SyncApptList')
syncClient.list('wscBibData')
  .then(function(list) {
    console.log('Successfully opened a List. SID: ' + list.sid);
    list.on('itemUpdated', function(data){
      console.log(data.item.data.value);

    });
    list.on('itemAdded', function(item) {
      let data = item.item.data.value;
      console.log(data);
       /* got(url, {
            json: true,
            body: data,
            })
            .then(function (data) {
            console.log(data.body)
            })
            .catch(function(err){
              console.log(err);
            });*/
    });
  })
  .catch(function(error) {
    console.log('error', error);
  });








