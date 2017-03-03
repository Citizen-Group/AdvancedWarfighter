// Class of server object.
var serverObject = {
    "_uuid": "",
    "cid": -1,
    "coo": "NULL",
    "latitude": 1250,
    "longitude": 530,
    "type": 0,
    "connected": "0000-00-00 00:00:00",
    "parent": [],

    // add a foreign serverObject as our parent
    addParent: function(imp_serverObject) {
        if(!this._contains(imp_serverObject)) {
            this["parent"].push(imp_serverObject);
        }       
    },
    
    // set your self as the parent of a foreign serverObject
    addChild: function(imp_serverObject) {
        if(!imp_serverObject._contains(this)) {
            imp_serverObject["parent"].push(this);
        }          
    },

    _contains: function(imp_serverObject){
        // Check to see if the imp obj has us in it.
        var i = imp_serverObject["parent"].length;
        while (i--) {
            if (imp_serverObject["parent"][i]._uuid === this._uuid) {
                return true;
            }
        }
        return false;
    },

    // return self as a feature 
    getFeature: function() {
        return  new ol.Feature({
        geometry: new ol.geom.Point([this.longitude, this.latitude]),
        labelPoint: new ol.geom.Point([this.longitude, this.latitude]),         
        name: this.cid,
        type: this.type,
        serverObj: this})
    }
}
