'use strict';

const CONFIG = require('./modules/config');
const EXPRESS = require('express');
const REQUEST = require('request-promise');
const PORT = 8081; 

let app = EXPRESS();

REQUEST({
  method: 'POST',
  uri: CONFIG.mcpAddress + '/register',
  body: {
    type: 'worker',
    address: 'http://localhost:' + CONFIG.ownPort
  },
  json: true
}).then(function(res){
  console.log(res);
  CONFIG.id = res.nodeId;
});


app.get('/status', function (req, res) {
  res.status(200).send(JSON.stringify({id: CONFIG.id}));
})


app.listen(CONFIG.ownPort, function () {
  console.log('MCP server listening on port %s!', CONFIG.ownPort);
})