var C = 10; 
var colors = require('./colors.js');
var mapCX = 1000;
var mapCY = 1000;

var unit = mapCX/20;
var u = require('./simplify.js').u;
var line = require('./simplify.js').line;
var createGem = require('./simplify.js').createGem;
var createFullPoly = require('./simplify.js').createFullPoly;
var createPoly = require('./simplify.js').createPoly;

module.exports = {
  levelObjects:{
    playerStart: {x: u(3), y: u(3)},
    levelFinish:{x: u(14), y: u(9)}
  },
  size: { x: mapCX, y: mapCY },
  startColor: colors.red,
  gems: [].
concat(createGem(u(7), u(7), colors.red, '')).
concat(createGem(u(7), u(11), colors.red, '')).
concat(createGem(u(9.5), u(7), colors.blue, '')).
concat(createGem(u(9.5), u(11), colors.blue, '')).
concat(createGem(u(14), u(15), colors.green, '')).
concat(createGem(u(4), u(17), colors.green, '')).
concat(createGem(u(2), u(22), colors.blue, '')).
concat(createGem(u(23), u(16), colors.blue, ''))
 ,
  walls: [].
concat( line(u(3), u(19), u(3), C, colors.blue) ).
concat( line(u(6)-C, u(22), C, u(3), colors.blue) ).
concat( line(u(19), u(2)+C/2, C, u(2)+C/2, colors.blue) ).
concat( line(u(5.5), u(8.5), u(5.5), C, colors.green) ).
concat( line(u(15), u(18)+C, C, u(7)-C, colors.green) ).
    concat( createFullPoly(u(14), u(9), u(11), u(9), colors.red, C ) ).
    concat( createFullPoly(u(14), u(9), u(6), u(5), colors.blue, C ) ).
    concat( createPoly(u(23.5), u(8), u(3), u(3), 
	[colors.blue,colors.blue,colors.blue,colors.blue], [1,0,1,1], C ) )
};

