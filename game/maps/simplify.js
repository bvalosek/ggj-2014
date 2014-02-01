var mapCY = 1000;
var unit = 40;
var wallWidth = 5;
var wallUnit = 40;

function setUnitSize(n) { unit = n; }
function setWallWidth(n) { wallWidth = n; }
function setWallUnit(n) { wallUnit = n; }
function u(n) { return unit*n; }
function w(n) { return wallUnit*n; }

//posx/posy - center position x/y
//orient - 'v' for vertical, 'h' for horizontal
//length - wall length in v/h wall units
//Col - color
//Text - render debug text
function createLine(posx, posy, orient, length, col, text)
{
   if(orient=='v')
	return line(w(posx), w(posy), wallWidth, w(length)+wallWidth, col, text);
   if(orient=='h')
	return line(w(posx), w(posy), w(length)+wallWidth, wallWidth, col, text);

}

function createGem(posx,posy,col,text)
{
	return [{
      position : {x:posx, y:posy},
      color: col,
	text: text
    	}];
}

function line(posx,posy,hw,hh,col,text)
{
	return [{
      position : {x:posx, y:posy},
      spatial: {x : hw, y: hh},
      color: col,
	text: text
    	}];
}

function createFullPoly(cX, cY, w, h, col, C)
{
	return	createPoly(cX, cY, w, h, [col,col,col,col], [1,1,1,1], C);
}

function createPoly(cX, cY, w, h, color, b1, C)
{
var retArray = [];
if(b1[0])
{
	retArray=retArray.concat([{
      position : {x: cX, y: cY - (h/2)},
      spatial: {x : w/2 , y: C},
      color: color[0]
    }]);
}if(b1[1])
{

	retArray=retArray.concat([{
      position : {x: cX +(w/2) + C, y: cY},
      spatial: {x : C, y: h/2 + C},
      color: color[1]
    }]);
}
if(b1[2])
{
	retArray=retArray.concat([{
      position : {x: cX, y: cY +(h/2)},
      spatial: {x : w/2, y: C},
      color: color[2]
    }]);
}
if(b1[3])
{
	retArray=retArray.concat( [  {
      position : {x: cX-(w/2)-C, y: cY},
      spatial: {x : C, y: h/2 + C},
      color: color[3]
    }]);
}
return retArray;
}

module.exports = { 
	u: u,
	setUnitSize: setUnitSize,
	setWallWidth: setWallWidth,
	setWallUnit: setWallUnit,
	line: line,
	createLine: createLine,
	createGem: createGem,
	unit: unit,
	createPoly: createPoly,
	createFullPoly: createFullPoly
}
