'use strict';
const got = require('got');
const url = 'http://192.168.1.21/stoker.json';
var Twitter = require('twitter');
var config = require('./config.js');
var T = new Twitter(config);

setInterval(function () {
  got(url)
    .then(function (data) {
      let logData = JSON.parse(data.body);
      logData.stoker.sensors.forEach(element => {
        console.log(element.name+':'+element.tc)
        T.post('statuses/update', { status: 'My Smoker Update ' + element.name + ':' + element.tc})
        .catch(err=>console.log(err));
      });
    })
    .catch(err => console.log(err));
}, 600 * 1000);












