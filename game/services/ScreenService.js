module.exports = ScreenService;

var Canvas = require('../../lib/renderer/Canvas.js');

/**
 * @constructor
 */
function ScreenService(container)
{
  var width  = window.innerWidth;
  var height = window.innerHeight;
  var aspect = width / height;

  // Create a canvas and convert to a Canvas wrapper
  var el = navigator.isCocoon ? 'screencanvas' : 'canvas';
  var screen = window.document.createElement(el);
  this.screen = screen = new Canvas(screen);
  screen.resize(width, height);

  if (navigator.isCocoon)
    screen._canvas.setAttribute('screencanvas', 'true');

  var body = window.document.body;
  body.style.background = 'black';
  body.appendChild(screen._canvas);

  container.register('screen', screen);
}



