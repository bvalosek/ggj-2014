var C = 5;
var colors = require('./colors.js');

var u = require('./simplify.js').u;
var line = require('./simplify.js').line;

module.exports = {
  levelObjects:{
    playerStart: {x: C + 100, y: 50 + C},
    levelFinish:{x: 500, y: 500}
  },
  gems: [
  ],
  walls: [
].
concat(line(u(5),u(3),C,u(3),colors.blue,'b1')).
concat(line(u(10),u(3),C,u(3),colors.red,'r1')).
concat(line(u(25),u(3),C,u(3),colors.blue,'b2')).
concat(line(u(5),u(9)-C,C,u(3),colors.red,'r2')).
concat(line(u(15),u(9)-C,C,u(3),colors.red,'r3')).
concat(line(u(15),u(6),u(10),C,colors.green,'g2')).
concat(line(u(10),u(9)-C,C,u(3),colors.yellow,'y1')).
concat(line(u(5),u(12),u(5),C,colors.blue,'b3')).
concat(line(u(12.5),u(12),u(2.5),C,colors.green,'g3')).
concat(line(u(5),u(15)-C,C,u(3),colors.yellow,'y2')).
concat(line(u(25),u(15)-C,C,u(3),colors.red,'r4')).
concat(line(u(20),u(12),u(5),C,colors.blue,'b4')).
concat(line(u(28),u(12),u(3),C,colors.purple,'p2')).
concat(line(u(2.5),u(6),u(2.5),C,colors.purple,'p1')).
concat(line(u(28),u(6),u(3),C,colors.yellow,'y3')).
concat(line(u(2.5),u(18),u(2.5),C,colors.red,'r5')).
concat(line(u(19),u(21),C,u(3),colors.green,'g1')).
concat(line(u(12),u(18),u(7),C,colors.purple,'p3')).
concat(line(u(25),u(18),u(6),C,colors.blue,'b5'))
};
