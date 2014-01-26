module.exports = InputService;

var Vec2 = require('tiny-ecs').Vec2;

/**
 * @constructor
 */
function InputService(container)
{
  // Maintain 'this' on callbacks
  this._keyDown    = this._keyDown.bind(this);
  this._keyUp      = this._keyUp.bind(this);
  this._mouseDown  = this._mouseDown.bind(this);
  this._mouseUp    = this._mouseUp.bind(this);
  this._mouseMove  = this._mouseMove.bind(this);
  this._mouseWheel = this._mouseWheel.bind(this);

  // Map of currently running inputs and their state (0 for off /
  // neutral, -1, 1 range). Each input has a tag that is generated
  this.inputs = {};

  this.inputs.keysPressed = 0;

  this.monitorKeys();
  this.monitorMouse();

  container.register('inputs', this.inputs);
  container.register('inputService', this);
}

// Called from the game loop, let us update anything we need
InputService.prototype.update = function(dt, time)
{
  delete this.inputs.position_wheel;

  if (navigator.webkitGetGamepads) {
    var pads = navigator.webkitGetGamepads();
    this.inputs.gamepads = navigator.webkitGetGamepads();
  }
};

// Add keyboard inputs (presses) to the manager
InputService.prototype.monitorKeys = function()
{
  document.onkeydown = this._keyDown;
  document.onkeyup   = this._keyUp;
};

// Add mouse (hover and click) inputs to the manager
InputService.prototype.monitorMouse = function()
{
  this.inputs.hover_m   = new Vec2();
  document.onmousedown  = this._mouseDown;
  document.onmouseup    = this._mouseUp;
  document.onmousemove  = this._mouseMove;
  document.onmousewheel = this._mouseWheel;

  // Block right click, still gets picked up on the normal mousedown
  // event as seperate button
  document.oncontextmenu = function() { return false; };
};

InputService.prototype._keyDown = function(e)
{
  e.preventDefault();
  this.inputs['button_k_' + e.keyCode] = 1;
  this.inputs.keysPressed++;
};

InputService.prototype._keyUp = function(e)
{
  e.preventDefault();
  delete this.inputs['button_k_' + e.keyCode];
};

InputService.prototype._mouseWheel = function(e)
{
  e.preventDefault();
  var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
  this.inputs.position_wheel = delta;
};

InputService.prototype._mouseDown = function(e)
{
  e.preventDefault();
  this.inputs['position_m_' + e.which] = new Vec2(e.clientX, e.clientY);
};

InputService.prototype._mouseUp = function(e)
{
  e.preventDefault();
  delete this.inputs['position_m_' + e.which];
};

InputService.prototype._mouseMove = function(e)
{
  e.preventDefault();
  var x = e.clientX;
  var y = e.clientY;
  this.inputs.hover_m.x = x;
  this.inputs.hover_m.y = y;

  if (this.inputs['position_m_' + e.which]) {
    this.inputs['position_m_' + e.which].x = x;
    this.inputs['position_m_' + e.which].y = y;
  }
};



