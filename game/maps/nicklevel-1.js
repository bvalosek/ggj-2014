var GREEN = { r: 0, g: 255, b: 0 };
var RED = { r: 255, g: 0, b:0 };
var BLUE = { r: 0, g: 0, b:255 };
var C = 20; 

module.exports = {
  walls: [
    {	
      position : {x:250, y: 450},
      spatial: {x : 1*C, y: 18*C},
      color: RED
    },
    {	
      position : {x: 575, y: 450},
      spatial: {x : 1*C, y: 18*C},
      color: BLUE
    },
    {
      position : {x: 875, y: 300},
      spatial: {x : 6*C, y: 1*C},
      color: GREEN
    },
    {
      position : {x: 875-7*C, y: 300+6*C},
      spatial: {x : 1*C, y: 7*C},
      color: GREEN
    },
    {
      position : {x: 875, y: 300+12*C},
      spatial: {x : 6*C, y: 1*C},
      color: GREEN
    },
    {
      position : {x: 875+7*C, y: 300+6*C},
      spatial: {x : 1*C, y: 7*C},
      color: GREEN
    },

//START
    {
      position : {x: 1*C + 25, y:2*C},
      spatial: {x : 1*C, y: 1*C},
      color: GREEN
    },
//GEM
    {
      position : {x: 1*C + 25, y:20*C},
      spatial: {x : 1*C, y: 1*C},
      color: RED
    },
//GEM
    {
      position : {x: 350 + 1*C, y:2*C},
      spatial: {x : 1*C, y: 1*C},
      color: BLUE
    },
//GEM
    {
      position : {x: 40*C, y:30*C},
      spatial: {x : 1*C, y: 1*C},
      color: GREEN
    }
  ]
};
