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
    playerStart: {x: u(1.5), y: u(23)},
    levelFinish:{x: u(14), y: u(9)}
  },
  size: { x: mapCX, y: mapCY },
  startColor: colors.red,
  gems: [].
concat(createGem(u(4), u(6), colors.red, 'r1')).
concat(createGem(u(9.5), u(5), colors.green, 'g1')).
concat(createGem(u(9.5), u(12), colors.blue, 'b1')).
concat(createGem(u(12), u(18), colors.green, 'g2')).
concat(createGem(u(5), u(24), colors.green, 'g3')).
concat(createGem(u(2), u(19), colors.blue, 'b2')).
concat(createGem(u(23), u(16), colors.blue, 'b3'))
 ,
  walls: [].
concat( line(u(4), u(17), u(4), C, colors.blue,'b1') ).
concat( line(u(8)-C, u(21), C, u(4), colors.blue,'b2') ).
concat( line(u(19), u(2)-C/2, C, u(2)-C/2, colors.blue, 'b3') ).
concat( line(u(5.5), u(8.5), u(5.5), C, colors.green, 'g1') ).
concat( line(u(15), u(18), C, u(7), colors.green, 'g2') ).
concat( createFullPoly(u(14), u(9), u(13), u(11), colors.red, C ) ).
concat( createFullPoly(u(14), u(9), u(5), u(4), colors.blue, C ) ).
concat( createPoly(u(23.5), u(8), u(3), u(3), 
	[colors.blue,colors.blue,colors.blue,colors.blue], [1,0,1,1], C ) )
};

