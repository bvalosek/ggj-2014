var C = 10;
var colors = require('./colors.js');
var mapCX = 1000;
var mapCY = 1000;
var unit = mapCX/20;

function u(n) { return unit*n; }

module.exports = {
  levelObjects:{
    playerStart: {x: C + 25, y: 50 + C},
    levelFinish:{x: (3*(mapCX/4)), y: (mapCY/3)}
  },
  gems: [
    {
      position : {x: u(3), y:u(5)},
      color: colors.red
    },
    {
      position : {x: u(2), y: u(12)},
      color: colors.purple
    }
  ],
  walls: [
    {
      position : {x: u(2), y: u(2)},
      spatial: {x : C, y: u(2)},
      color: colors.green,
      text: 'g1'
    },
    {
      position : {x: u(6), y: u(4)},
      spatial: {x : u(4) + C, y: C },
      color: colors.red,
	text: 'r1'
    },
    {
      position : {x: u(5) - C, y: u(7)+C},
      spatial: {x : C, y: u(3) },
      color: colors.blue,
	text: 'b1'
    },
    {
      position : {x: u(2), y: u(10) - C},
      spatial: {x : u(3), y: C },
      color: colors.red,
	text: 'r2'
    },
    {
      position : {x: u(5) - C, y: u(12)},
      spatial: {x : C, y: u(2) },
      color: colors.purple,
	text: 'p1'
    },
    {
      position : {x: u(10), y: u(7)+C},
      spatial: {x : C, y: u(3) },
      color: colors.purple,
	text: 'p2'
    },
    {
      position : {x: u(12)+C, y: u(10)},
      spatial: {x : u(2), y: C },
      color: colors.green,
	text: 'g2'
    },
    {
      position : {x: u(14)+C, y: u(1)},
      spatial: {x : C, y: u(2) },
      color: colors.purple,
	text: 'p3'
    },

    {
      position : {x: u(14)+C, y: u(6)+C},
      spatial: {x : C, y: u(4) },
      color: colors.blue,
	text: 'b2'
    },
    {
      position : {x: u(15), y: u(10)},
      spatial: {x : u(1), y: C },
      color: colors.red,
	text: 'r3'
    },
    {
      position : {x: u(16), y: u(12)-C},
      spatial: {x : C, y: u(2) },
      color: colors.green,
	text: 'g3'
    },

]  
};
