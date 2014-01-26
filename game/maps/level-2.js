var C = 5; 
var colors = require('./colors.js');
var mapCX = 900;
var mapCY = 720;

var unit = mapCX/20;
var u = require('./simplify.js').u;
var line = require('./simplify.js').line;
var createGem = require('./simplify.js').createGem;
var createFullPoly = require('./simplify.js').createFullPoly;
var createPoly = require('./simplify.js').createPoly;

module.exports = {
  levelObjects:{
    playerStart: {x: u(1.5), y: u(16)},
    levelFinish:{x: u(13), y: u(8)}
  },
  size: { x: mapCX, y: mapCY },
  startColor: colors.red,
  gems: [].
concat(createGem(u(5.5), u(6), colors.red, 'r1')).
concat(createGem(u(2), u(6), colors.green, 'g1')).
concat(createGem(u(9.7), u(8), colors.blue, 'b1')).
concat(createGem(u(9.7), u(16), colors.green, 'g2')).
concat(createGem(u(3.8), u(16), colors.blue, 'b2')).
concat(createGem(u(18), u(16), colors.blue, 'b3'))
 ,
  walls: [].
concat( line(u(2.5), u(14), u(2.5), C, colors.blue,'b1') ).
concat( line(u(4.88), u(16), C, u(2), colors.blue,'b2') ).
concat( line(u(16), u(2)-C/2, C, u(2)-C/2, colors.blue, 'b3') ).
concat( line(u(4), u(8), u(4), C, colors.green, 'g1') ).
concat( line(u(13), u(15), C, u(3), colors.green, 'g2') ).
concat( createFullPoly(u(13), u(8), u(10), u(8), colors.red, C ) ).
concat( createFullPoly(u(13), u(8), u(3.5), u(3.5), colors.blue, C ) )
};

