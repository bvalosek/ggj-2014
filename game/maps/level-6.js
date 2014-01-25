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
].concat(line(u(5),u(5),C,u(5),colors.red,'r1'))
};
