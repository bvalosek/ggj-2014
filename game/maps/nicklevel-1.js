var C = 15;
var colors = require('./colors.js');
var mapCX = 1000;
var mapCY = 1000;

module.exports = {
  levelObjects:{
    playerStart: {x: C + 25, y: 50 + C},
    levelFinish:{x: 1000, y: 1000}
  },
  gems: [
    //GEM 1
    {
      position : {x: C + 25, y:(mapCY/4) * 3},
      color: colors.red
    },
    //GEM 2
    {
      position : {x: 3*(mapCX/8), y:50 + C},
      color: colors.blue
    },
    //GEM 3
    {
      position : {x: (3*(mapCX/4)) + C, y:(mapCY/4) * 3},
      color: colors.green
    }
  ],
  walls: [
    //LINE 1
    {
      position : {x: mapCX/4, y: mapCY/2},
      spatial: {x : 1*C, y: mapCY/2},
      color: colors.red
    },
    //LINE 2
    {
      position : {x: mapCX/2, y: mapCY/2},
      spatial: {x : 1*C, y: mapCY/2},
      color: colors.blue
    },
    //SQUARE
    {
      position : {x: (3*(mapCX/4)), y: (mapCY/3)},
      spatial: {x : 6*C, y: 1*C},
      color: colors.green
    },
    {
      position : {x: (3*(mapCX/4))-7*C, y: (mapCY/3)+6*C},
      spatial: {x : 1*C, y: 7*C},
      color: colors.green
    },
    {
      position : {x: (3*(mapCX/4)), y: (mapCY/3)+12*C},
      spatial: {x : 6*C, y: 1*C},
      color: colors.green
    },
    {
      position : {x: (3*(mapCX/4))+7*C, y: (mapCY/3)+6*C},
      spatial: {x : 1*C, y: 7*C},
      color: colors.green
    },

  ]
};
