var GREEN = { r: 0, g: 255, b: 0 };

module.exports = {
  walls: [
    {
      position: {x: 500, y: 500},
      spatial: {x : 100, y: 200},
      color: {r: 255, g: 0, b: 0}
    },
    {
      position: {x: 500, y:200},
      spatial: {x : 200, y: 100},
      color: GREEN
    }
  ],
  gems: [
  	{
      position: {x: 500, y:200},
      spatial: {x : 200, y: 100},
      color: GREEN
    }
  ],
  levelObjects:{
  	playerStart: {x: 50, y: 60},
  	levelFinish:{x: 1000, y: 1000}
  }
};
