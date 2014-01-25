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
      position : {x:u(6), y: u(17)},
      spatial: {x : C, y: u(8)},
      color: colors.green,
	text: 'g1'
    },
    {
      position : {x:u(6), y: u(4)},
      spatial: {x : C, y: u(5)},
      color: colors.orange,
	text: 'o1'
    },
    {
      position : {x:u(12)+C, y: u(12)},
      spatial: {x : C, y: u(12)},
      color: colors.red,
	text:'r1'
    },
    {
      position : {x:u(18), y: u(18)},
      spatial: {x : C, y: u(6)},
      color: colors.orange,
	text: 'o2'
    },
    {
      position : {x:u(18), y: u(6)},
      spatial: {x : C, y: u(6)},
      color: colors.purple,
	text:'p1'
    },
    {
      position : {x:u(22), y: u(4)},
      spatial: {x : C, y: u(4)},
      color: colors.blue,
	text:'b3'
    },
    {
      position : {x:u(26), y: u(8)-C},
      spatial: {x : u(4), y: C},
      color: colors.blue,
	text:'b4'
    },
    {
      position : {x:u(22), y: u(10)},
      spatial: {x : C, y: u(2)},
      color: colors.green
    },
    {
      position : {x:u(20)+C, y: u(12)},
      spatial: {x : u(2), y: C},
      color: colors.blue,
	text:'b5'
    },
    {
      position : {x:u(26), y: u(12)},
      spatial: {x : u(4), y: C},
      color: colors.purple,
	text:'p3'
    },
    {
      position : {x:u(25), y: u(3)},
      spatial: {x : C, y: u(3)},
      color: colors.green,
	text:'g2'
    },
    {
      position : {x:u(28), y: u(6)-C},
      spatial: {x : u(3), y: C},
      color: colors.green,
	text:'g3'
    },
    {
      position : {x:u(31)+C, y: u(6)-C},
      spatial: {x : u(1), y: C},
      color: colors.purple,
	text:'p4'
    },
    {
      position : {x:u(30), y: u(15)},
      spatial: {x : C, y: u(9)},
      color: colors.red,
	text: 'r3'
    },
    {
      position : {x:u(24)+C, y: u(17)},
      spatial: {x : u(6), y: C},
      color: colors.green,
	text:'g4'
    },
    {
      position : {x:u(31)+C, y: u(8)-C},
      spatial: {x : u(1), y: C},
      color: colors.green,
	text:'g5'
    },
    {
      position : {x:u(31)+C, y: u(12)},
      spatial: {x : u(1), y: C},
      color: colors.blue,
	text:'b6'
    }
].concat(createPoly(u(9), u(13), u(6), u(8), 
	[colors.blue,colors.yellow,colors.purple,colors.red], 
	[1,0,1,0] ) ).concat(
	createPoly(u(3), u(13), u(6), u(8), 
	[colors.red,null,colors.blue,null], 
	[true,false,true,false] ) 
	)

};
