// Sources
var source_main_tiles = new ol.layer.Tile({source: new ol.source.OSM()});
var source_main = new ol.source.Vector();
var source_arty = new ol.source.Vector();

// Map functions
var messageBox = new ol.Overlay({
          element: document.getElementById('overlay'),
          positioning: 'bottom-center'
        });

var menuoverlay = new ol.Overlay({
          element: document.getElementById('menu-holder'),
          positioning: 'middle-center'
        });
	
var layer_vector_main = new ol.layer.Vector({
  source: source_main,
  style: new ol.style.Style({
	  fill: new ol.style.Fill({
      color: 'rgba(142, 255, 255, 0.2)'
    }),
    stroke: new ol.style.Stroke({
      color: '#ffcc33',
      width: 2
    }),
    image: new ol.style.Circle({
      radius: 7,
      fill: new ol.style.Fill({
        color: 'blue'
      })
    })
  })
});

var MouseCorr_global;

/// *** XYZ Code
var mousePositionControl = new ol.control.MousePosition({
  coordinateFormat: ol.coordinate.createStringXY(4),
  projection: 'EPSG:4326',
  // comment the following two lines to have the mouse position
  // be placed within the map.
  className: 'custom-mouse-position',
  target: document.getElementById('mouse-position'),
  undefinedHTML: '&nbsp;'
});

// Code to grab values from the main page
var projectionSelect = $('#projection');
var precisionInput = $('#precision');

projectionSelect.on('change', function() {
  mousePositionControl.setProjection(ol.proj.get(this.value));
});

projectionSelect.val(mousePositionControl.getProjection().getCode());

precisionInput.on('change', function() {
  var format = ol.coordinate.createStringXY(this.valueAsNumber);
  mousePositionControl.setCoordinateFormat(format);
});
/// *** XYZ Code
		
// *** Draw Code
var typeSelect = document.getElementById('type');
var draw; // global so we can remove it later

function addInteraction() 
{
  var value = typeSelect.value;
  
  if (value !== 'None') {
    draw = new ol.interaction.Draw({
      source: source_main,
      type: (value)
    });
	
    map.addInteraction(draw);
  }
}

function drawTextOnUnit(event) {
    // extract the spatial coordinate of the click event in map projection units
	var coord = event.coordinate;
	var kl = $('#wep');
	
	// format a human readable version
	var hdms = 'VF:CAD-UAV-29312-C';
	
	/*if ($('#side').val() == 'BLU') {*/

	// update the overlay element's content
	var element = messageBox.getElement();
	element.innerHTML = hdms;

	// position the element (using the coordinate in the map's projection) and add it to the map
	messageBox.setPosition(coord);
	map.addOverlay(messageBox);  
}

function drawMenu(event) 
{
	menuoverlay.setPosition(event.coordinate);
	map.addOverlay(menuoverlay);
}

menuoverlay.on('click', function(event) {
	alert('HOPPA');
});

// returns what submenu is clicked.
function menuProcess ()
{
	
}

/**
 * Let user change the geometry type.
 * @param {Event} e Change event.
 */
typeSelect.onchange = function(e) 
{
  map.removeInteraction(draw);
  addInteraction();
};

addInteraction();

// ******************
// Map Object
var map = new ol.Map({
  controls: ol.control.defaults({
    attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
      collapsible: false
    })
  }).extend([mousePositionControl]),
  layers: [source_main_tiles, layer_vector_main],
  target: 'map',
  view: new ol.View({
	center: ol.proj.fromLonLat([-76.3702, 45.4338]),
	zoom: 16 
  })
});

map.on('pointermove', function(event)
{
	
});

window.onresize = function() {
    setTimeout( function() { map.updateSize();}, 200);
};

map.on('click', function(event)
{
	MouseCorr_global = event.coordinate;
	
    //arty();
	drawTextOnUnit(event);
	drawMenu(event);
});

// Menu Lisiters
// On Click heard by 

// Utility Commands
function startTime() 
{
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('time').innerHTML =
    h + ":" + m + ":" + s;
    var t = setTimeout(startTime, 500);
}

function checkTime(i) 
{
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}