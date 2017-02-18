// Artillery Code

function arty(imp_shellCount, imp_tgtLocation)
{
	var arty_shellCount = imp_shellCount;
	var arty_features = new Array(count);	
	var arty_spread = 250 / 1000;	// First value is meters of spread
	
	// Right now this is just circular spread
	// Presuming North and East are + and the calcuations are done facing north
    for (var i = 0; i < arty_shellCount; ++i) 
	{
		int max_x = imp_tgtLocation.x + arty_spread;
		int max_y = imp_tgtLocation.y + arty_spread;
		int min_x = imp_tgtLocation.x - arty_spread;
		int min_y = imp_tgtLocation.y - arty_spread;
		
		int x = Math.random() * (max_x - min_x) + min_x;
		int y = Math.random() * (max_y - min_y) + min_y;
		
        arty_features[i] = new ol.Feature(new ol.geom.Point(x,y));
    }

	// Found in Mouse-Position.js
    source_arty.addFeatures(arty_features);
}