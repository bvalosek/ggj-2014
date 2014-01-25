var mapCX = 1000;
var mapCY = 1000;
var unit = mapCX/30;

function u(n) { return unit*n; }

function line(posx,posy,hw,hh,col,text)
{
	return [{
      position : {x:posx, y:posy},
      spatial: {x : hw, y: hh},
      color: col,
	text: text
    	}];
}

function createGem(posx,posy,col,text)
{
	return [{
      position : {x:posx, y:posy},
      color: col,
	text: text
    	}];
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
	line: line,
	createGem: createGem,
	mapCX: mapCX,
	unit: unit,
	createPoly: createPoly
}
