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
].concat(line(u(5),u(5),C,u(5),colors.red,'r1')).
concat(line(u(5),u(12),C,u(2),colors.blue,'b1')).
concat(line(u(12),u(3),C,u(3),colors.green,'g1')).
concat(line(u(12),u(10),C,u(4),colors.purple,'p1')).
concat(line(u(12),u(18),C,u(4),colors.orange,'o1')).
concat(line(u(5),u(18),C,u(4),colors.purple,'p2')).
concat(line(u(19),u(3),C,u(3),colors.orange,'o2')).
concat(line(u(19),u(10),C,u(4),colors.green,'g2')).
concat(line(u(19),u(18),C,u(4),colors.purple,'p3')).
concat(line(u(25),u(16),C,u(6),colors.purple,'p4')).
concat(line(u(8.5),u(6),u(3.5)+C,C,colors.blue,'b2')).
concat(line(u(6)+C,u(10),u(6),C,colors.orange,'o3')).
concat(line(u(6)+C,u(14),u(6),C,colors.green,'g3')).
concat(line(u(15.5),u(6),u(3.5)+C,C,colors.red,'r2')).
concat(line(u(15.5),u(14),u(3.5)+C,C,colors.blue,'b3')).
concat(line(u(24),u(6),u(5)+C,C,colors.blue,'b4')).
concat(line(u(24),u(10),u(5)+C,C,colors.red,'r3'))
};
