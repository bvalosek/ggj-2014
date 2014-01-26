var C = 10;
var colors = require('./colors.js');
var u = require('./simplify.js').u;
var line = require('./simplify.js').line;
var createGem = require('./simplify.js').createGem;
var createPoly = require('./simplify.js').createPoly;

module.exports = {
  levelObjects:{
    playerStart: {x: u(3), y: u(6)},
    levelFinish:{x: u(19), y: u(8)}
  },
  size: { x: 1000, y:800 },
  startColor: colors.green,
  gems: [
    {
      position : {x: u(2), y:u(14)},
      color: colors.red
    },
    {
      position : {x: u(9.5), y:u(3)},
      color: colors.blue
    },
    {
      position : {x: u(19), y:u(14)},
      color: colors.green
    }
  ],
  walls: [].
concat( line(u(13),u(10), C, u(10), colors.blue, 'b1') ).
concat( line(u(6), u(10), C, u(10), colors.red, 'r1' ) ).
concat( createPoly(u(19),u(8), u(4), u(4), 
	[colors.green, colors.green, colors.green, colors.green], [1,1,1,1], C))  
};
