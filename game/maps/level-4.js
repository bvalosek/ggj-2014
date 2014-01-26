var C = 10;
var colors = require('./colors.js');

var u = require('./simplify.js').u;
var line = require('./simplify.js').line;
var createPoly = require('./simplify.js').createPoly;

// Override U function
var oldU = u;
var u = function(n) {
  return oldU(n)*1.5;
}

module.exports = {
  levelObjects:{
    playerStart: {x: u(2), y: u(21)},
    levelFinish:{x: u(30)+3*C, y: u(2)-2*C}
  },
  size: { x: 2040, y: 1440 },
  startColor: colors.red,
  gems: [
  {
    position : {x: u(3), y: u(3)},
    color : colors.yellow
  },
  {
    position : {x: u(3), y: u(11)},
    color : colors.green
  },
  {
    position : {x: u(3), y: u(15)},
    color : colors.red
  },
  {
    position : {x: u(2), y: u(19)},
    color : colors.blue
  },
  {
    position : {x: u(4), y: u(22)},
    color : colors.green
  },
  {
    position : {x: u(9), y: u(3)},
    color : colors.red
  },
  {
    position : {x: u(9), y: u(6)},
    color : colors.blue
  },
  {
    position : {x: u(10)-3*C, y: u(12)+2*C},
    color : colors.purple
  },
  {
    position : {x: u(10)-3*C, y: u(21)},
    color : colors.yellow
  },
  {
    position : {x: u(15), y: u(3)},
    color : colors.yellow
  },
  {
    position : {x: u(15), y: u(21)},
    color : colors.purple
  },
  {
    position : {x: u(20), y: u(3)},
    color : colors.purple
  },
  {
    position : {x: u(27)+2*C, y: u(6)},
    color : colors.red
  },
  {
    position : {x: u(24)+2*C, y: u(10)-C},
    color : colors.blue
  },
  {
    position : {x: u(27)+2*C, y: u(10)-C},
    color : colors.green
  },
  {
    position : {x: u(24)+2*C, y: u(15)-2*C},
    color : colors.blue
  },
  {
    position : {x: u(24)+2*C, y: u(21)},
    color : colors.red
  },
  {
    position : {x: u(32)+C, y: u(6)},
    color : colors.purple
  },
  {
    position : {x: u(32)+C, y: u(10)-C},
    color : colors.red
  },
  {
    position : {x: u(32)+C, y: u(21)},
    color : colors.blue
  }

  ],
  walls: [].
concat(line(u(24)+C,u(17),u(6),C,colors.green,'g4')).
concat(line(u(32)-C/2,u(12),u(2)+C/2,C,colors.blue,'b6')).
concat(line(u(26)-C/2,u(12),u(4),C,colors.purple,'p3')).
concat(line(u(32)-C/2,u(8)-C,u(2)+C/2,C,colors.green,'g5')).
concat(line(u(20)+C,u(12),u(2),C,colors.blue,'b5')).
concat(line(u(26),u(8)-C,u(4),C,colors.blue,'b4')).
concat(line(u(22),u(4),C,u(4),colors.blue,'b3')).
concat(line(u(22),u(10)-C/2,C,u(2)-C/2,colors.green,'g6')).
concat(line(u(28)+2*C,u(4),u(1)+3*C,C,colors.green,'g3')).
concat(line(u(27),u(2),C,u(2),colors.green,'g2')).
concat(line(u(32)-C/2,u(4),u(2)+C/2,C,colors.purple,'p4')).
concat(line(u(6),u(4.5),C,u(4.5),colors.yellow,'y1')).
concat(line(u(18),u(6)+C/2,C,u(6)+C/2,colors.purple,'p1')).
concat(line(u(18),u(18)-C/2,C,u(6)+C/2,colors.yellow,'y2')).
concat(line(u(12),u(12),C,u(12),colors.red,'r1')).
concat(line(u(9), u(9), u(3)+C, C, colors.blue,'b0')).
concat(line(u(9), u(17), u(3)+C, C, colors.purple,'p0')).
concat(line(u(3)+C/2, u(9), u(3)+C/2, C, colors.red,'r0')).
concat(line(u(3)+C/2, u(17), u(3)+C/2, C, colors.blue,'b00')).
concat(line(u(6),u(16.5)-C/2,C,u(7.5)+C/2,colors.green,'g1')).
concat(line(u(30),u(14)-C/2,C,u(10)+C/2,colors.red,'r3'))

};
