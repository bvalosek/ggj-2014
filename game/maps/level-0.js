var C = 10;
var colors = require('./colors.js');
var u = require('./simplify.js').u;
var line = require('./simplify.js').line;
var createGem = require('./simplify.js').createGem;

module.exports = {
  levelObjects:{
    playerStart: {x: u(2), y: u(2.5)},
    levelFinish:{x: u(23), y: u(2.5)}
  },
  size: { x: 1000, y:200 },
  startColor: colors.green,
  gems: [].concat( createGem(u(9),u(2.5),colors.red ) ),
  walls: [].concat( line(u(12),u(2.5), C, u(2.5), colors.red, '') )
};
