/*
 * Server queryer
 * Provides the functionality to request and parse server connection data for
 * display on the server admin section of the AWF admin module. 
 * 
 * Requires "fakeServer.json". 
 * For development purposes this queryer is currently pointing to a localfile.
 */
var fakeJson = '{"ADM":{"_uuid": "58b1c31f1 9384586 2f897aa8","cid": 0,"coo": "CA", "latitude": 6850782.3256,"longitude": -6523989.5656,"type": 0,"connected": "2017-01-19 07:10:44","parent": "" }, "CC1":{"_uuid": "58b1c31f1 23423432 2f897aa8","cid": 1,"coo": "CA", "latitude": 6549228.1902,"longitude": -7857677.3863,"type": 1,"connected": "2017-02-01 08:34:44","parent": "0" }, "CC2":{"_uuid": "58b1c4234 242586 2f897aa8","cid": 2,"coo": "CA", "latitude": 6206219.1186,"longitude": -8375080.2814,"type": 1,"connected": "2017-01-31 02:22:44","parent": "0" },"SG1":{"_uuid": "58b1c4234 242586 2f897aa8","cid": 3,"coo": "CA", "latitude": 5206219.1186,"longitude": -7375080.2814,"type": 2,"connected": "2017-01-31 12:26:41","parent": "2" }}';


var serverQ = {
    requestServerData: function () {
        // Replace with server ajax call
        return (JSON.parse(fakeJson));
    },

    populateServerArray: function (serverData) {
        var i = 0;

        for (index in serverData) {
            var serverObj = serverObject;
            app.arrayOfServerObjects.push(serverObj)
            i++;
        }

        console.log(i);
    },

    /*
    * This function uses the server array to generate features in the web map.
    */
    returnFeatures: function () {
        this.populateServerArray(this.requestServerData());

        var featureList = new ol.Collection() 

        if (app.arrayOfServerObjects == null) {
            return featureList;
        }

        for (var index in app.arrayOfServerObjects) {
            featureList.push(
                app.arrayOfServerObjects[index].getFeature()
            );
        }

        return featureList;
    },

    generateTable: function (jsonData) {
        // For each item we find. Build a row.
        if (jsonData == null) {
            return '<tr><td colspan="4">No servers detected</td></tr>'
        }

        var returnTable = ''

        for (var sEl in jsonData) {
            returnTable += this.generateRow(
                jsonData[sEl].cid,
                jsonData[sEl]._uuid,
                jsonData[sEl].coo,
                jsonData[sEl].connected);
        };

        return returnTable;
    },

    generateRow: function (id, name, countryOfOrgin, connectionDuration) {
        var rowHtml = '<tr><td>' + id + '</td><td>' + name + '</td><td>' + countryOfOrgin + '</td><td>' + connectionDuration + '</td></tr>'
        return rowHtml;
    }
};