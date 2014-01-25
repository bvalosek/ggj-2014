var C = 10;
var colors = require('./colors.js');
var mapCX = 1000;
var mapCY = 1000;
var unit = mapCX/30;

function u(n) { return unit*n; }

function createPoly(cX, cY, w, h, color, b1)
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
  levelObjects:{
    playerStart: {x: C + 100, y: 50 + C},
    levelFinish:{x: (3*(mapCX/4)), y: (mapCY/3)}
  },
  gems: [
  ],
  walls: [
    {
      position : {x:u(8), y: u(16)},
      spatial: {x : C, y: u(8)},
      color: colors.green
    },
    {
      position : {x:u(8), y: u(4)},
      spatial: {x : C, y: u(4)},
      color: colors.orange
    },
    {
      position : {x:u(16)+C, y: u(12)},
      spatial: {x : C, y: u(12)},
      color: colors.red
    },

].concat(createPoly(u(12), u(12), u(8), u(8), 
	[colors.blue,colors.yellow,colors.purple,colors.red], 
	[1,0,1,0] ) ).concat(
	createPoly(u(4), u(12), u(8), u(8), 
	[colors.red,null,colors.blue,null], 
	[true,false,true,false] ) 
	)

};
