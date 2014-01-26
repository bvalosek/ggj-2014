var C = 10; 
var colors = require('./colors.js');
var mapCX = 1000;
var mapCY = 1000;
var unit = mapCX/20;

function u(n) { return unit*n; }

function createPoly(cX, cY, w, h, color)
{
return [{
      position : {x: cX, y: cY - (h/2)},
      spatial: {x : w/2 + C/2, y: C},
      color: color
    },
    {
      position : {x: cX-(w/2), y: cY},
      spatial: {x : C, y: h/2 + C},
      color: color
    },
    {
      position : {x: cX, y: cY +(h/2)},
      spatial: {x : w/2 + C/2, y: C},
      color: color
    },
    {
      position : {x: cX +(w/2), y: cY},
      spatial: {x : C, y: h/2 + C},
      color: color
    }];
}

module.exports = {
  levelObjects:{
    playerStart: {x: u(3), y: u(3)},
    levelFinish:{x: u(15), y: u(8)}
  },
  gems: [
    {
      position : {x: u(1), y:u(14)},
      color: colors.blue
    },
    {
      position : {x: u(4), y:u(17)},
      color: colors.green
    },
    {
      position : {x: u(25), y:u(16)},
      color: colors.blue
    },
    {
      position : {x: u(9), y:u(6)},
      color: colors.red
    },
    {
      position : {x: u(9), y:u(10)},
      color: colors.red
    },
    {
      position : {x: u(11)+ C, y:u(6)},
      color: colors.blue
    },
    {
      position : {x: u(11)+ C, y:u(10)},
      color: colors.blue
    },
    {
      position : {x:u(14), y:u(15)},
      color: colors.green
    }

]
 ,
  walls: [
//LINE 1
    {	
      position : {x: u(3), y:u(13)},
      spatial: {x : u(3), y: C},
      color: colors.blue 
    },
    {	
      position : {x: u(6), y: u(16)-C},
      spatial: {x : C, y: u(3)},
      color: colors.blue 
    },
    {	
      position : {x: u(15), y: u(14)},
      spatial: {x : C, y: u(4)},
      color: colors.green
    },
    {	
      position : {x: u(6), y: u(8)},
      spatial: {x : u(6), y: C},
      color: colors.green
    },
    {	
      position : {x: u(18), y: u(2)},
      spatial: {x : C, y: u(2)},
      color: colors.blue 
    }


  ].concat( createPoly(u(15), u(8), u(6), u(4), colors.blue ) ).concat( 
	createPoly(u(15), u(8), u(10), u(8), colors.red ) ).concat( 
	createPoly(u(25), u(8), u(3), u(3), colors.blue ) )


};

