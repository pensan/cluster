const BODY_PARSER = require('body-parser');
const express = require('express');
const NODE_MANAGER = require('./modules/nodeManager');
const PORT = 8080; 



let app = express();
app.use( BODY_PARSER.json() );

app.post('/register', function (req, res) {
    let node = req.body;
    let nodeId = NODE_MANAGER.addNode(node);
    res.send(JSON.stringify({nodeId: nodeId}));
})

app.listen(PORT, function () {
    console.log('MCP server listening on port %s!', PORT);
})