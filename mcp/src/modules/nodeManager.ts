const CRYPTO = require('crypto');
const LOGGER = require('./logger');
const REQUEST = require('request-promise');

class NodeManager {
    private keepAliveTimer : number = 5000
    private nodeCouter : number = 0

    private nodeList: any = {}

    public constructor() {
        this.checkNodesAvailability();
    }
    public addNode(node) : string {
        
        if (!this.nodeList.hasOwnProperty(node.type)) {
            this.nodeList[node.type] = {};
        }
        
        node.id = CRYPTO.createHash('md5').update(JSON.stringify(node.address)).digest('hex');
        this.nodeList[node.type][node.id] = node;
        this.nodeCouter++;

        LOGGER.debug('Added', node.id, 'to', node.type, 'list')
        
        return node.id;
    }
    public removeNode(nodeType : string, nodeId : string) : void {        
        if (this.nodeList.hasOwnProperty(nodeType)) {  
            if (this.nodeList[nodeType].hasOwnProperty(nodeId)) {    
                delete this.nodeList[nodeType][nodeId]; 
                this.nodeCouter--;
                LOGGER.debug('Removed', nodeId, 'from', nodeType, 'list')
            }
        } 
    }
    public getNodes() {
        return this.nodeList;
    }

    private checkNodesAvailability() : void {
        setTimeout(() => { this.checkNodesAvailability(); }, this.keepAliveTimer);
        
        LOGGER.debug("Checking", this.nodeCouter, "nodes");

        // For each node type ...
        for (var nodeType in this.nodeList) {
            if (this.nodeList.hasOwnProperty(nodeType)) {                
                var nodesOfType = this.nodeList[nodeType];
                // for each node entry ...
                for (var nodeId in nodesOfType) {                    
                    if (nodesOfType.hasOwnProperty(nodeId)) {
                        var node = nodesOfType[nodeId];
                        this.checkNodeConnection(node);                    
                    }
                }                
            }
        }            
    }
    private checkNodeConnection(node){
        REQUEST.get(node.address + '/status')
        .catch((err) => {
            if (err.error.code === 'ECONNREFUSED'){
                this.removeNode(node.type, node.id);
            }                            
        });  
    }
}

export = new NodeManager();

