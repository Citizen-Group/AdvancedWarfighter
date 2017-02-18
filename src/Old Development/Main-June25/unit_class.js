// Unit Class
var unit_class = {

	// Properties holds all the values that our unit will operate on.
	// Keeping properties modular means all classes are stateless, are comptletely 
	// control by the data. We do this, so that the Server(s) 

	// Initialization.
	// Makes a new object. With our without data.
	 //init: function{};

	// Cleanup
	// Clears up any connections or memberships, when this unit is removed
	//destroy () {};

	// Update functions
	update: {
		// Pull data from server or be given data.
		pull: function(){
			
		},
		// Accept data from server or be given data.
		update_push: function(){
			
		}
	},

	// Returns the internal properties of a object for consumption.
	getProperties: function() {
	   return properties = {
			"PK_ID": 1102,
			"NAME": {
			"FIRST": "Justin",
			"MIDDLE": "M",
			"LAST": "Kelly"
			},
			"LOC": {
			"X": -76.3702,
			"Y": 45.4338,
			"Z": ""
			},
			"AZMUTH": 3200,
			"TYPE": "RIFLE MAN",
			"STATUS": "HEALTHY",
			"COUNTRY": "CANADA",
			"TEAM": {
			"TEAM_ID": 0,
			"TEAM_NAME": "BRAVO",
			"UNITS_INCOMMAND": [
			  1000,
			  1253,
			  2356,
			  6532,
			  5623,
			  6532
			],
			"LEADER": "0-A",
			"CMD": "7-C"
			}
		}
	}
};