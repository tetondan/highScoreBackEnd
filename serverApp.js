var express = require('express');
var http = require('http');
var request = require('request');
var app = express();
// var sqlCom = require('./sqlCom.js')

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('listening at http://%s:%s', host, port);
});

app.put('/api/:username', function (req, res) {
  var params = req.params.username
  console.log(params)
  res.send(params);
});

app.get('/api/highScores', function (req, res) {
  var params = req.params[0];
  var body;
  request('http://api.brewerydb.com/v2/locations/?locality='+params+'&key=e7ef6e5c8b11eff5f00637ddead885af', function (err, response, body) {
    // if(!err && response.statusCode === 200){}
    res.send(body)
  })
})
