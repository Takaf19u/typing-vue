// server.js
var express = require('express');
var path = require('path');
var history = require('connect-history-api-fallback');

var app = express();
app.use(history());

app.use(express.static(__dirname + "/dist"));

var port = process.env.PORT || 5000;
app.listen(port);
console.log('server started '+ port);