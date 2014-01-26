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
].concat(line(u(3),u(2),C,u(2),colors.red,'r1')).
concat(line(u(9),u(2),C,u(2),colors.purple,'p1')).
concat(line(u(18),u(2),C,u(2),colors.yellow,'y1')).
concat(line(u(24),u(2),C,u(2),colors.purple,'p2')).
concat(line(u(3),u(6),C,u(2),colors.yellow,'y2')).
concat(line(u(6),u(6),C,u(2),colors.red,'r2')).
concat(line(u(15),u(6),C,u(2),colors.blue,'b1')).
concat(line(u(21),u(6),C,u(2),colors.yellow,'y3')).
concat(line(u(12),u(10),C,u(2),colors.yellow,'y4')).
concat(line(u(15),u(10),C,u(2),colors.green,'g1')).
concat(line(u(21),u(12),C,u(4),colors.purple,'p3')).
concat(line(u(3),u(14),C,u(2),colors.yellow,'y5')).
concat(line(u(9),u(14),C,u(2),colors.purple,'p4')).
concat(line(u(12),u(14),C,u(2),colors.blue,'b2')).
concat(line(u(24),u(16),C,u(4),colors.blue,'b3')).
concat(line(u(3),u(20),C,u(4),colors.green,'g2')).
concat(line(u(9),u(18),C,u(2),colors.red,'r3')).
concat(line(u(15),u(18),C,u(2),colors.red,'r4')).
concat(line(u(9),u(22),C,u(2),colors.blue,'b4')).
concat(line(u(15),u(22),C,u(2),colors.purple,'p5'))


};
