var C = 15; 
var colors = require('./colors.js');
var mapWidth = 1000;
var mapHeight = 1000;

module.exports = {
  walls: [
//LINE 1
    {	
      position : {x:250, y: mapHeight/2},
      spatial: {x : 1*C, y: mapHeight},
      color: colors.red 
    },
//LINE 2
    {	
      position : {x: 575, y: mapHeight/2},
      spatial: {x : 1*C, y: mapHeight},
      color: colors.blue
    },
//SQUARE
    {
      position : {x: 875, y: 300},
      spatial: {x : 6*C, y: 1*C},
      color: colors.green
    },
    {
      position : {x: 875-7*C, y: 300+6*C},
      spatial: {x : 1*C, y: 7*C},
      color: colors.green
    },
    {
      position : {x: 875, y: 300+12*C},
      spatial: {x : 6*C, y: 1*C},
      color: colors.green
    },
    {
      position : {x: 875+7*C, y: 300+6*C},
      spatial: {x : 1*C, y: 7*C},
      color: colors.green
    },

//START
    {
      position : {x: C + 25, y:50 + C},
      spatial: {x : C, y: C},
      color: colors.green
    },
//GEM
    {
      position : {x: C + 25, y:750},
      spatial: {x : C, y: C},
      color: colors.red
    },
//GEM
    {
      position : {x: 400, y:50 + C},
      spatial: {x : C, y: C},
      color: colors.blue
    },
//GEM
    {
      position : {x: 1000 - C, y:750},
      spatial: {x : C, y: C},
      color: colors.green
    }
  ]
};
