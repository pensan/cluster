const express = require('express');
const HTTP = require('http');
const PORT = 8080; 

var app = express();

app.get('/', function (req, res) {
  res.send('GET request to /')
})

app.listen(PORT, function () {
  console.log('MCP server listening on port %s!', PORT);
})