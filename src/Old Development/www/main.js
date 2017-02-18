// Sources
var source_main_tiles = new ol.layer.Tile({source: new ol.source.OSM()});

// Map Object
var map = new ol.Map({
  layers: [source_main_tiles],
  target: 'map',
  view: new ol.View({
	center: ol.proj.fromLonLat([-76.3702, 45.4338]),
	zoom: 16 
  })
});
