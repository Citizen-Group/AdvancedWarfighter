// Helper Class for reuseable functions

var hlpr = {
	
	// Helper function to provide an array of properties
	objToString: function(imp_obj){
		// toSource, JSON.stringify
		let returnBuffer = '';
		
		function Iterate(iter_obj) {
			// For each property in object
			for (prop in iter_obj) {
				// Check to see if there is futher depth. If so recurse.
				if (iter_obj.hasOwnProperty(prop) && isNaN(prop) && prop != 'geometry') {
				  returnBuffer += prop + ": " + iter_obj[prop] + "<br>";
				  Iterate(iter_obj[prop]);
				}
			}
		}
		
		// Execute first run.
		Iterate(imp_obj);
		
		return returnBuffer;
	}

};