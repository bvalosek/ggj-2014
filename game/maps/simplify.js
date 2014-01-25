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
module.exports = { 
	u: u,
	line: line,
	createGem: createGem,
	mapCX: mapCX,
	unit: unit
}
