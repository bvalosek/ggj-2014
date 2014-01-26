var C = 10;
var colors = require('./colors.js');
var mapCX = 1000;
var mapCY = 1000;
var unit = mapCX/30;

var u = require('./simplify.js').u;
var line = require('./simplify.js').line;
var createPoly = require('./simplify.js').createPoly;

module.exports = {
  levelObjects:{
    playerStart: {x: 100, y: 50},
    levelFinish:{x: 500, y: 500}
  },
  size: { x: mapCX, y: mapCY },
  gems: [
  {
    position : {x: u(1), y: u(1)},
    color : colors.yellow
  },
  {
    position : {x: u(1), y: u(11)},
    color : colors.green
  },
  {
    position : {x: u(1), y: u(15)},
    color : colors.red
  },
  {
    position : {x: u(1), y: u(19)},
    color : colors.green
  },
  {
    position : {x: u(4), y: u(23)},
    color : colors.blue
  },
  {
    position : {x: u(11), y: u(1)},
    color : colors.blue
  },
  {
    position : {x: u(7), y: u(7)},
    color : colors.red
  },
  {
    position : {x: u(11), y: u(11)},
    color : colors.purple
  },
  {
    position : {x: u(11), y: u(19)},
    color : colors.yellow
  },
  {
    position : {x: u(15), y: u(1)},
    color : colors.yellow
  },
  {
    position : {x: u(15), y: u(23)},
    color : colors.purple
  },
  {
    position : {x: u(20), y: u(1)},
    color : colors.purple
  },
  {
    position : {x: u(23), y: u(6)},
    color : colors.red
  },
  {
    position : {x: u(23), y: u(11)},
    color : colors.blue
  },
  {
    position : {x: u(26), y: u(11)},
    color : colors.green
  },
  {
    position : {x: u(26), y: u(16)},
    color : colors.blue
  },
  {
    position : {x: u(20), y: u(23)},
    color : colors.red
  },
  {
    position : {x: u(32)+C, y: u(6)+2*C},
    color : colors.purple
  },
  {
    position : {x: u(32)+C, y: u(11)},
    color : colors.red
  },
  {
    position : {x: u(32)+C, y: u(23)},
    color : colors.blue
  }

  ],
  walls: [].
concat(line(u(24)+C,u(17),u(6),C,colors.green,'g4')).
concat(line(u(30),u(15),C,u(9),colors.red,'r3')).
concat(line(u(32)-C,u(12),u(2),C,colors.blue,'b6')).
concat(line(u(26),u(12),u(4),C,colors.purple,'p3')).
concat(line(u(32)-C,u(8)-C,u(2),C,colors.green,'g5')).
concat(line(u(20)+C,u(12),u(2),C,colors.blue,'b5')).
concat(line(u(26),u(8)-C,u(4),C,colors.blue,'b4')).
concat(line(u(22),u(4),C,u(4),colors.blue,'b3')).
concat(line(u(22),u(10)-C/2,C,u(2)-C/2,colors.green,'g6')).
concat(line(u(28),u(6)-C,u(3),C,colors.green,'g3')).
concat(line(u(25),u(3),C,u(3),colors.green,'g2')).
concat(line(u(6),u(17),C,u(8),colors.green,'g1')).
concat(line(u(32)+C,u(6)-C,u(2),C,colors.purple,'p4')).
concat(line(u(18),u(6),C,u(6),colors.purple,'p1')).
concat(line(u(6),u(4),C,u(5),colors.yellow,'y1')).
concat(line(u(18),u(18),C,u(6),colors.yellow,'y2')).
concat(line(u(12)+C,u(12),C,u(12),colors.red,'r1')).
	concat(createPoly(u(9), u(13), u(6), u(8), 
	[colors.blue,colors.yellow,colors.purple,colors.red], 
	[1,0,1,0], C ) ).
	concat(
	createPoly(u(3), u(13), u(6), u(8), 
	[colors.red,null,colors.blue,null], 
	[true,false,true,false], C ) 
	)

};
