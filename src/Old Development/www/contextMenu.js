	<link href="http://cdn.jsdelivr.net/openlayers.contextmenu/latest/ol3-contextmenu.min.css" rel="stylesheet">
	<script src="http://cdn.jsdelivr.net/openlayers.contextmenu/latest/ol3-contextmenu.js"></script>
	
	<!-- Latest compiled and minified CSS -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

	<!-- Optional theme -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">

	<!-- Latest compiled and minified JavaScript -->
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>

	<!-- Add icon library -->
	<link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.min.css">
	
<style>
	@import url(https://fonts.googleapis.com/css?family=Open+Sans);
	html, body, #map{
		width:100%;
		height:100%;
		margin: 0;
		overflow:hidden;
	}
	body {
		font: 1.5em "Open Sans",Helvetica,Arial,sans-serif;
		color: #222;
		font-weight: 100;
	}
	#map{
		position:absolute;
		z-index:1;
		top:0; bottom:0;
	}
	.ol-control button{ 
		background-color: rgba(40, 40, 40, 0.8) !important;
	}
	.ol-control button:hover{ 
		background-color: rgba(40, 40, 40, 1) !important;
	}
	.ol-ctx-menu-container{
	font-size:10px;
	padding:4px;
	}
</style>

<script>
(function(win, doc){
  'use strict';
  
  var view = new ol.View({
      center: [0, 0],
      zoom: 2,
      minZoom: 2,
      maxZoom: 20
    }),
	
    vectorLayer = new ol.layer.Vector({
      source: new ol.source.Vector()
    }),
	
    baseLayer = new ol.layer.Tile({
      source: new ol.source.OSM()
    }),
	
    map = new ol.Map({
      target: doc.getElementById('map'),
      view: view,
      layers: [baseLayer, vectorLayer]
    }),
	
    // from https://github.com/DmitryBaranovskiy/raphael
    elastic = function(t) {
      return Math.pow(2, -10 * t) * Math.sin((t - 0.075) * (2 * Math.PI) / 0.3) + 1;
    },
	
	// Icons
	url_marker = 'C:/Users/owner/Desktop/www/www/icon.png',
	url_center = 'C:/Users/owner/Desktop/www/www/icon.png',	
	
	// Functions
	center = function(obj, foo){
		var pan = ol.animation.pan({
			duration: 1000,
			easing: elastic,
			source: view.getCenter()
		});
			map.beforeRender(pan);
			view.setCenter(obj.coordinate);
	},
	
	marker = function(obj){
	var coord4326 = ol.proj.transform(
		obj.coordinate, 'EPSG:3857', 'EPSG:4326'),
	template = 'Coordinate is ({x} | {y})',
	iconStyle = new ol.style.Style({
	  image: new ol.style.Icon({
		scale: .6,
		src: url_marker
	  }),
	  text: new ol.style.Text({
		offsetY: 25,
		text: ol.coordinate.format(coord4326, template, 2),
		font: '15px Open Sans,sans-serif',
		fill: new ol.style.Fill({ color: '#111' }),
		stroke: new ol.style.Stroke({
		  color: '#eee', width: 2
		})
	  })
	}),
	feature = new ol.Feature({
	  type: 'removable',
	  geometry: new ol.geom.Point(obj.coordinate)
	});
  
	feature.setStyle(iconStyle);
	vectorLayer.getSource().addFeature(feature);
	};

	var act_move = function(obj){
	};
	var act_moveF = function(obj){
	};
	var act_sneak = function(obj){
	};
	var act_fire = function(obj){
	};
	var act_smoke = function(obj){
	};
	var act_defend = function(obj){
	};
	var act_ambush = function(obj){
	};
	
	var act_makeUnit = function(obj){
	var coord4326 = ol.proj.transform(
	obj.coordinate, 'EPSG:3857', 'EPSG:4326'),
	template = 'Coordinate is ({x} | {y})',
	iconStyle = new ol.style.Style({
	  image: new ol.style.Icon({
		scale: .3,
		src: url_marker
	  }),
	  text: new ol.style.Text({
		offsetY: 25,
		text: ol.coordinate.format(coord4326, template, 2),
		font: '8px Open Sans,sans-serif',
		fill: new ol.style.Fill({ color: '#111' }),
		stroke: new ol.style.Stroke({
		  color: '#eee', width: 2
		})
	  })
	}),
	feature = new ol.Feature({
	  name: 'ID 123',
	  type: 'removable',
	  geometry: new ol.geom.Point(obj.coordinate)
	});
  
	feature.setStyle(iconStyle);
	vectorLayer.getSource().addFeature(feature);
	};
  var contextmenu_items = [
    {
      text: 'Move',
      icon: url_marker,
	  callback: act_move
    },
    {
      text: 'Move Fast',
      icon: url_marker,
      callback: act_moveF
    },
    {
      text: 'Sneak',
      icon: url_marker,
      callback: act_sneak
    },
    {
      text: 'Fire',
      icon: url_marker,
      callback: act_fire
    },
    {
      text: 'Smoke',
      icon: url_marker,
      callback: act_smoke
    },
    {
      text: 'Defend',
      icon: url_marker,
      callback: act_defend
    },
    {
      text: 'Ambush',
      icon: url_marker,
      callback: act_ambush
    },
	'-',
	{
       text: 'Measure',
       icon: url_marker,
	   callback: measureTool
	},
	{
      text: 'Make Unit',
      icon: url_marker,
      callback: act_makeUnit
    }
  ];
  
  // entry point
  var contextmenu = new ContextMenu({
    width: 100,
    default_items: false,
    items: contextmenu_items
  });
  
  map.addControl(contextmenu);
  
  
  
  var removeMarker = function(obj){
    vectorLayer.getSource().removeFeature(obj.data.marker);
  };
  
  var removeMarkerItem = {
    text: 'Remove this Marker',
    icon: url_marker,
    callback: removeMarker
  };
   
   
  function commandDraw (imp_unit, imp_type) {
  console.log('mexico');
  testing.start();
  //.stop?
  //listener for clear command.
	// Get Position of right clicked unit
	// Kill all other draw modes
	// Start draw interaction between point IMP_UNIT and Mouse	
  };
  
  function measureTool() {
	// Enter Drawing 
	commandDraw('1','2');
	console.log('sex');
	
  };
    
  function fetch (){
	return '00001';
  }
  
  var displayID = {
    text: fetch(),
    icon: url_marker,
    callback: null
  };
  
  /**
  * When opened (right click). Look to see if anyone is underneath our mouse
  * if so, act on it - in this case see if it is a removable marker.
  * if so allow the user custom options. Else, reqular menu.
  **/
  contextmenu.on('open', function(evt){
    var feature = map.forEachFeatureAtPixel(evt.pixel, function(ft, l){
      return ft;
    });

    if (feature && feature.get('type') == 'removable') {
      contextmenu.clear();
      removeMarkerItem.data = {
        marker: feature
      };
	  contextmenu.push(displayID);
      contextmenu.push(removeMarkerItem);
      
    } else {
      contextmenu.clear();
      contextmenu.extend(contextmenu_items);
	  testing.start;
	  
    }
  });
  
  var testing = {
	start: function() { console.log('poop') },
	stop: function() { console.log('pee') }
  };
  
  map.on('pointermove', function(e) {
    if (e.dragging) return;
         
    var pixel = map.getEventPixel(e.originalEvent);
    var hit = map.hasFeatureAtPixel(pixel);
    
    map.getTarget().style.cursor = hit ? 'pointer' : '';
  });

})(window, document);
</script>
