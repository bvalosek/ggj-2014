var C = 10;
var colors = require('./colors.js');
var u = require('./simplify.js').u;
var line = require('./simplify.js').line;
var createGem = require('./simplify.js').createGem;

module.exports = {
  levelObjects:{
    playerStart: {x: u(10), y: u(6)},
    levelFinish:{x: u(5000), y: u(5000)}
  },
  size: { x: 1000, y:600 },
  startColor: colors.green,
  gems: [],
  walls: []
};
