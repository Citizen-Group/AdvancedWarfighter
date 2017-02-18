// Pie Menu - Justin Kelly

function pieMenu (elementID) {
// Position
var arcX = 0;
var arcY = 0;

// Information
var steps = 5;						// The amount of wedges
var radius = 250 / 2; 				// Pixle width to edge
var thickness = 60;					// Pixle thickness +/- from the edge
var stepAngle = 2 / steps;			// Span of a single wedge (2PI = 360*)
var stepPadding = 0.01;				// Gap between wedges
var lineWidth = 5;					// Line Thickness
var startAngle = 1.5;				// Starting Orintarion (right is 0|2, left 1)
var counterClockwise = true;		// Direction of drawing
var targetCanvas = document.getElementById(elementID);
var ctxt = targetCanvas.getContext('2d');

// Status
var isHidden = true;
var highlightedMenuItem = -1; //whichOneSelected();
var showMenuDepth = 0;

// The Menu Data Objects
var menuArray = [];

initRadialMenu ();

function initRadialMenu() {
	var x = arcX
	var y = arcY;
	var local_startAngle = startAngle; 
	var adjust = stepAngle/2;
	
	loadMenuData();
	
	// Add content to menu array		
	for (i = 0; i < steps; i++)
	{
		var A = local_startAngle + adjust - stepPadding;
		var B = local_startAngle - adjust + stepPadding;		
		
		//context.arc(x, y, radius, A * Math.PI, B * Math.PI, counterClockwise);
					
		// Shift the Start line to the next position
		local_startAngle = local_startAngle - stepAngle; 
	}		
}

function updateMenu(){
	
};

function drawMenu (level){
	var x = arcX
	var y = arcY;
	var local_startAngle = startAngle; 
	var adjust = stepAngle/2;
	var rad = radius * level;

	for (i = 0; i < steps; i++)
	{
		var A = local_startAngle + adjust - stepPadding;
		var B = local_startAngle - adjust + stepPadding;		
		
		context.beginPath();
		context.arc(x, y, rad, A * Math.PI, B * Math.PI, counterClockwise);
		context.lineWidth = thickness;
		
		if (highlightedMenuItem == i){
			context.strokeStyle = "#FF1100";
		}
		else{
			context.strokeStyle = "#F33300"
		}

		context.stroke();

		var dis = 15; // Ratio of thickness and width.
		var mXY = findCenterOfStep(local_startAngle * Math.PI, local_startAngle * Math.PI, thickness);
		
		context.beginPath();		
		context.rect(mXY.x-dis, mXY.y-dis, dis * 2, dis * 2);
		context.fillStyle = 'grey';
		context.fill();
		context.lineWidth = 1;
		context.strokeStyle = 'black';
		
		context.fillStyle = 'black';
		context.font = '20pt Calibri';
		context.fillText(menuArray[i].text, mXY.x-dis, mXY.y-dis);
		context.stroke()
					
		// Shift the Start line to the next position
		local_startAngle = local_startAngle - stepAngle; 
	}		
};

targetCanvas.click(function(e){
	
	// If the ARC is being drawn.
	if (arcAlive == true ) // And menu isnt being clicked
	{
		// Get the magnatiude of the line
		var r = hypot(mouseX - arcX, arcY - mouseY);
		
		// If it exceeds the menu. Let the menu die. 
		// else we just fired off a event message.
		if (r > (radius + thickness /2) * showMenuDepth) {
			isHidden = true; // Kill the arc
			// Undraw function()
			showMenuDepth = 0;
			clearCanvas();	
		} else {
			showMenuDepth = 2;
			drawMenu(2);
		}
	} else {
		isHidden = false;
		showMenuDepth = 1;
		// Capture the mouse
		arcX = mouseX;
		arcY = mouseY;
		initRadialMenu();
	}
});

function mouseMove (e){
	// keep updating the mouse
	mouseX = e.pageX - this.offsetLeft;
	mouseY = e.pageY - this.offsetTop;
	
	// If the radial menu is active
	if (isHidden == false){
		// Clear the screen and draw again.
		clearCanvas();
		drawRadialMenu();		
		drawFollowLine();						
	}
	// Else do nothing
};

// Support
function currentAngleToMouse (){
	var returnedStartAngle = Math.atan2(arcY - mouseY, mouseX - arcX);

	if (returnedStartAngle < 0)
	{
		// Bottom Numbers -0 to PI (-0 to 1)
		returnedStartAngle = returnedStartAngle/Math.PI * -1;
	}
	else
	{
		// top Numbers PI to +0 (1 to 0)
		returnedStartAngle = 2 - returnedStartAngle/Math.PI;
	}
	return returnedStartAngle;
};

function getCornerXY (center, angle, distance) {
	p = {x:0,y:0};
	p.x = center.x + distance * Math.cos(angle);
	p.y = center.y + distance * Math.sin(angle);
	return p;	
};

function findCenterOfStep(start, stop, thickness) {
	// Draw a inverted triangle facing down based on some ratio
	// between start and stop points.
	
	// Counter ClockWise
	var origin_xy = {x:arcX, y:arcY};
	var leftCenPoint = getCornerXY(origin_xy, stop, radius);
	var rightCenPoint = getCornerXY(origin_xy, start, radius);
	
	// Return the center point.
	// X1 + X2 gives you the distance + the displacement from 0.
	// Devide by /2 and midpoint is had.
	var return_x = (leftCenPoint.x + rightCenPoint.x)/2;
	var return_y = (leftCenPoint.y + rightCenPoint.y)/2;
	return p = {x:return_x, y:return_y};
};

function drawNumber(number, xy) {
	context.font = '10pt Calibri';
	context.fillText(number, xy.x, xy.y);
};

function whichOneSelected()	{
	var angle = currentAngleToMouse();
	
	var local_startAngle = startAngle; 
	var adjust = stepAngle/2;
		
	// Quickly grab all the bounds of the steps
	for (i = 0; i < steps; i++) {		
		// Start
		var A = local_startAngle + adjust - stepPadding;
		// Stop
		var B = local_startAngle - adjust + stepPadding;
		
		// if the number passes 3o'clock it will result in negitives. 
		// Because we start at somthing other then 0, this will often
		
		// Cross overs
		// If this pair has smaller end, the start.
		// we have crossed over zero.
		if (B < 0){
			// b to 0, 0 to A
			if ((B+2 < angle && angle <= 2) || (angle < A && angle >= 0)){
				return i;
			}
		}
		if (angle >= B && angle <= A) {
			return i;
		}
	
		
		local_startAngle = local_startAngle - stepAngle; 			
	}	
	
	return 0;
};

function drawFollowLine() {
	context.beginPath();
	context.lineWidth = lineWidth;		
	context.moveTo(arcX, arcY); 
	context.lineTo(mouseX, mouseY);
	context.closePath();
	var dis = 10;
	context.rect(mouseX-dis, mouseY-dis+5, dis*2, dis*2);
	var mXY = {x:mouseX-dis, y:mouseY-dis};
	var aXY = {x:100, y:30};
	drawNumber(mouseX + ", " + mouseY, mXY);
	sel = whichOneSelected();
	drawNumber(sel+1, aXY);
	context.lineWidth = lineWidth;
	context.strokeStyle = "#333333"
	context.stroke();
};

// Seed menuArray for later drawing.
function menuItem () {
	this.id = 0;
	this.startStop = 0;
	this.endStop = 0;
	this.center = {x:0,y:0};
	this.icon = "";
	this.text = "";
	this.parent = null;
	this.children = [];
};
	
function loadMenuData (){
	// Clear the array.
	menuArray = [];

	var menuTemp1 = new menuItem();
	menuTemp1.id = 1;
	menuTemp1.icon = "/menu/1.png";
	menuTemp1.text = "1";
	menuTemp1.parent = null;	
	menuArray.push(menuTemp1);
	
		// Children of 1
		var menuTemp11 = new menuItem();
		menuTemp11.id = 11;
		menuTemp11.icon = "/menu/11.png";
		menuTemp11.text = "1.1";
		menuTemp11.parent = 1;	
		menuArray[0].children.push(menuTemp11);
		
		var menuTemp12 = new menuItem();		
		menuTemp12.id = 12;
		menuTemp12.icon = "/menu/12.png";
		menuTemp12.text = "1.2";
		menuTemp12.parent = 1;	
		menuArray[0].children.push(menuTemp12);
				
		var menuTemp13 = new menuItem();
		menuTemp13.id = 13;
		menuTemp13.icon = "/menu/13.png";
		menuTemp13.text = "1.3";
		menuTemp13.parent = 1;	
		menuArray[0].children.push(menuTemp13)

	var menuTemp2 = new menuItem();
	menuTemp2.id = 2;
	menuTemp2.icon = "/menu/2.png";
	menuTemp2.text = "2";
	menuTemp2.parent = null;	
	menuArray.push(menuTemp2);

	var menuTemp3 = new menuItem();
	menuTemp3.id = 3;
	menuTemp3.icon = "/menu/3.png";
	menuTemp3.text = "3";
	menuTemp3.parent = null;	
	menuArray.push(menuTemp3);

	var menuTemp4 = new menuItem();
	menuTemp4.id = 4;
	menuTemp4.icon = "/menu/4.png";
	menuTemp4.text = "4";
	menuTemp4.parent = null;	
	menuArray.push(menuTemp4);
	
	var menuTemp5 = new menuItem();
	menuTemp5.id = 5;
	menuTemp5.icon = "/menu/5.png";
	menuTemp5.text = "5";
	menuTemp5.parent = null;	
	menuArray.push(menuTemp5);
}
	
};