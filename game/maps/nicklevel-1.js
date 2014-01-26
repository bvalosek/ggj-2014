var C = 15;
var colors = require('./colors.js');
var mapCX = 1000;
var mapCY = 1000;

function createPoly(cX, cY, w, h)
{
return [{
      position : {x: cX, y: cY - (h/2)},
      spatial: {x : w/2 + C/2, y: C},
      color: colors.green
    },
    {
      position : {x: cX-(w/2), y: cY},
      spatial: {x : C, y: h/2 + C},
      color: colors.green
    },
    {
      position : {x: cX, y: cY +(h/2)},
      spatial: {x : w/2 + C/2, y: C},
      color: colors.green
    },
    {
      position : {x: cX +(w/2), y: cY},
      spatial: {x : C, y: h/2 + C},
      color: colors.green
    }];
}

module.exports = {
  levelObjects:{
    playerStart: {x: C + 25, y: 50 + C},
    levelFinish:{x: (3*(mapCX/4)), y: (mapCY/3)}
  },
  size: { x: mapCX, y: mapCY },
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
    }].concat( createPoly((3*(mapCX/4)),(mapCY/3), 12*C, 12*C))  
};
