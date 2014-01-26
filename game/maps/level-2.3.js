var C = 5;
var colors = require('./colors.js');
var u = require('./simplify.js').u;
var line = require('./simplify.js').line;
var createGem = require('./simplify.js').createGem;

module.exports = {
  levelObjects:{
    playerStart: {x: u(22), y: u(2.5)},
    levelFinish:{x: u(3), y: u(2.5)}
  },
  size: { x: 1000, y: 1000 },
  startColor: colors.blue,
  gems: [].concat( createGem(u(9),u(2.5),colors.red ) ),
  walls: [].concat( line(u(8),u(4), C, u(4), colors.blue, '') ).
    concat( line(u(8),u(12), C, u(4), colors.yellow, '') ).
    concat( line(u(8),u(20), C, u(4), colors.purple, '') )
};
