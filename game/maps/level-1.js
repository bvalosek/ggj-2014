var colors = require('./colors.js');
module.exports = {
  walls: [
    {
      position: {x: 500, y: 500},
      spatial: {x : 100, y: 200},
      color: colors.blue
    },
    {
      position: {x: 500, y:200},
      spatial: {x : 200, y: 100},
      color: colors.green
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
