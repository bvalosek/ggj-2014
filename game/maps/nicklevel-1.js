var C = 10;
var colors = require('./colors.js');
var u = require('./simplify.js').u;
var line = require('./simplify.js').line;
var createGem = require('./simplify.js').createGem;
var createPoly = require('./simplify.js').createPoly;

module.exports = {
  levelObjects:{
    playerStart: {x: u(2), y: u(3)},
    levelFinish:{x: u(19), y: u(6)}
  },
  size: { x: 1000, y:520 },
  startColor: colors.green,
  gems: [].
concat( createGem(u(2), u(11), colors.red, '') ).
concat( createGem(u(9.5), u(3), colors.blue, '') ).
concat( createGem(u(19), u(11), colors.green, '') ),

  walls: [].
concat( line(u(13),u(6.5), C, u(6.5), colors.blue, 'b1') ).
concat( line(u(6), u(6.5), C, u(6.5), colors.red, 'r1' ) ).
concat( createPoly(u(19),u(6), u(5), u(5), 
	[colors.green, colors.green, colors.green, colors.green], [1,1,1,1], C))  
};
