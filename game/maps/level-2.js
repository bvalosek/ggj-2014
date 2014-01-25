var C = 15; 
var colors = require('./colors.js');
var mapCX = 1000;
var mapCY = 1000;

module.exports = {
  gems: { },
  walls: [
//LINE 1
    {	
      position : {x: mapCX/8, y: 2*mapCY/3},
      spatial: {x : mapCY/8, y: 1*C},
      color: colors.blue 
    },
    {	
      position : {x: mapCX/4, y: .776*mapCY},
      spatial: {x : 1*C, y: mapCY/8},
      color: colors.blue 
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

//START
    {
      position : {x: C + 25, y:50 + C},
      spatial: {x : C, y: C},
      color: colors.green
    },
//GEM 1 
    {
      position : {x: C + 25, y:(mapCY/4) * 3},
      spatial: {x : C, y: C},
      color: colors.blue
    },
//GEM 1.5 
    {
      position : {x: C + 165, y:(mapCY/4) * 3 + 100},
      spatial: {x : C, y: C},
      color: colors.green
    },
//GEM 2
    {
      position : {x: 3*(mapCX/8), y:50 + C},
      spatial: {x : C, y: C},
      color: colors.blue
    },
//GEM 3
    {
      position : {x: (3*(mapCX/4)) + C, y:(mapCY/4) * 3},
      spatial: {x : C, y: C},
      color: colors.green
    }
  ]
};


