/*
 * Server queryer
 * Provides the functionality to request and parse server connection data for
 * display on the server admin section of the AWF admin module. 
 * 
 * Requires "fakeServer.json". 
 * For development purposes this queryer is currently pointing to a localfile.
 */
var fakeJson = '{"AWF":{"_uuid": "58b1c31f1 9384586 2f897aa8","cid": 0,"coo": "CA", "latitude": 6850782.3256,"longitude": -6523989.5656,"type": 0,"connected": "2017-01-19 07:10:44","parent": "" }}';

var serverQ = {
    requestServerData: function() {
        // Replace with server ajax call
        return (JSON.parse(fakeJson));
    },

    /*
    * This function parses the JSON built object to be features in the web map.
    */
    returnFeatures: function(){
        var jsonData = this.requestServerData();

        if (jsonData == null) {
            return [];
        }

        var featureList = {
        'type': 'FeatureCollection',
        'crs': {
          'type': 'name',
          'properties': {
            'name': 'EPSG:3857'
          }
        },'features': [
            {
                'type': 'Feature',
                'geometry': {
                    'type': 'Point',
                    'coordinates': [jsonData['AWF'].longitude,jsonData['AWF'].latitude]}
            }]
      };

        /* for (var item in jsonData) {
                featureList += "
                {
                    'type': 'Feature',
                     'geometry': {
                         'type': 'Point',
                          'coordinates': [" + jsonData[item].longitude + ', ' + jsonData[item].latitude + "]
                        }
                }"
        }
        */

        return featureList;
       
    },

    generateTable: function(jsonData) {
        // For each item we find. Build a row.
        if (jsonData == null){
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

    generateRow: function(id, name, countryOfOrgin, connectionDuration) {
        var rowHtml = '<tr><td>' + id + '</td><td>' + name + '</td><td>' + countryOfOrgin + '</td><td>' + connectionDuration + '</td></tr>'
        return rowHtml;
    }
};