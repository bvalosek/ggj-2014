module.exports = Canvas;

var Style = require('./Style.js');
var Vec2  = require('tiny-ecs').Vec2;

/**
 * @constructor
 * @param {HTMLCanvasElement=} canvas
 */
function Canvas(canvas)
{
  this._canvas        = canvas || document.createElement('canvas');
  this._ctx           = this._canvas.getContext('2d');
  this._canvas.width  = 150;
  this._canvas.height = 150;
  this._size = new Vec2();
}

/**
 * @return {Vec2}
 */
Canvas.prototype.getSize = function()
{
  return this._size.set(this._canvas.width, this._canvas.height);
};

/**
 * Change canvas size (CLEARS CANVAS!)
 * @param {Number} x
 * @param {Number} y
 * @return {Canvas}
 */
Canvas.prototype.resize = function(x, y)
{
  this._canvas.width = x;
  this._canvas.height = y;
  return this;
};

/**
 * Translate with a vector parameter
 * @param {Vec2} v
 * @return {Canvas}
 */
Canvas.prototype.vtranslate = function(v)
{
  this._ctx.translate(v.x, v.y);
  return this;
};

/**
 * Scale via a vector
 * @param {Vec2} v
 * @return {Canvas}
 */
Canvas.prototype.vscale = function(v)
{
  this._ctx.scale(v.x, v.y);
  return this;
};

/**
 * @param {Number} x
 * @param {Number} y
 * @return {Canvas}
 */
Canvas.prototype.scale = function(x, y)
{
  this._ctx.scale(x, y);
  return this;
};

/**
 * @param {Number} x
 * @param {Number} y
 * @return {Canvas}
 */
Canvas.prototype.translate = function(x, y)
{
  this._ctx.translate(x, y);
  return this;
};

/**
 * Set the global composite operations
 * @param {String} mode
 * @return {Canvas}
 */
Canvas.prototype.setBlendMode = function(mode)
{
  this._ctx.globalCompositeOperation = mode;
  return this;
};

/**
 * @param {Number} theta
 * @return {Canvas}
 */
Canvas.prototype.rotate = function(theta)
{
  if (!theta) return this;
  this._ctx.rotate(theta);
  return this;
};

/**
 * @param {Number} alpha
 * @return {Canvas}
 */
Canvas.prototype.setAlpha = function(alpha)
{
  this._ctx.globalAlpha = alpha;
  return this;
};

/**
 * @return {Canvas}
 */
Canvas.prototype.save = function()
{
  this._ctx.save();
  return this;
};

/**
 * @return {Canvas}
 */
Canvas.prototype.restore = function()
{
  this._ctx.restore();
  return this;
};

/**
 * @param {nsIDOMElement} image
 * @param {Vec2} offset
 * @return {Canvas}
 */
Canvas.prototype.drawImage = function(image, offset)
{
  this._ctx.drawImage(image,
    -offset.x,
    -offset.y,
    image.width,
    image.height);
  return this;
};

/**
 * @param {String} color
 */
Canvas.prototype.fill = function(color)
{
  this._ctx.fillStyle = color || 'white';
  this._ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);
  return this;
};

/**
 * @param {Canvas} canvas
 * @return {Canvas}
 */
Canvas.prototype.drawCanvas = function(canvas)
{
  this._ctx.drawImage(canvas._canvas, 0, 0);
  return this;
};

/**
 * @param {Number} radius
 * @param {Style} style
 * @return {Canvas}
 */
Canvas.prototype.drawCircle = function(radius, style)
{
  return this.drawArc(0, Math.PI*2, radius, style);
};

/**
 * @param {Number} start
 * @param {Number} stop
 * @param {Number} radius
 * @param {Style} style
 * @return {Canvas}
 */
Canvas.prototype.drawArc = function(start, stop, radius, style)
{
  style = style || Style.defaultStyle;
  var ctx = this._ctx;

  ctx.beginPath();
  ctx.arc(0, 0, radius, start, stop, false);

  this._fill(style);
  this._stroke(style);
  return this;
};

/**
 * @param {Array.<Vec2>} vertices
 * @param {Style} style
 * @return {Canvas}
 */
Canvas.prototype.drawShape = function(vertices, style)
{
  style = style || Style.defaultStyle;
  var ctx = this._ctx;

  ctx.beginPath();
  for (var n = 0; n < vertices.length; n++) {
    var point = vertices[n];
    if (n) ctx.lineTo(point.x, point.y);
    else ctx.moveTo(point.x, point.y);
  }
  ctx.closePath();

  this._fill(style);
  this._stroke(style);
  return this;
};

/**
 * @param {Vec2} size
 * @param {Style} style
 * @return {Canvas}
 */
Canvas.prototype.drawRectangle = function(size, style)
{
  style = style || Style.defaultStyle;
  var ctx = this._ctx;
  ctx.beginPath();
  ctx.rect(0, 0, size.x, size.y);

  this._fill(style);
  this._stroke(style);
  return this;
};

/**
 * @param {Vec2} hwidth
 * @return {Canvas}
 */
Canvas.prototype.drawHwRect = function(hwidth, style)
{
  var v = Vec2.aquire().assign(hwidth);

  this
    .save()
    .vtranslate(v.smult(-1))
    .drawRectangle(v.smult(-2), style)
    .restore();

  Vec2.release(v);

  return this;
};

/**
 * @param {Vec2} line
 * @param {Style} style
 * @return {Canvas}
 */
Canvas.prototype.drawLine = function(line, style)
{
  style = style || Style.defaultStyle;

  var ctx = this._ctx;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(line.x, line.y);

  this._stroke(style);
  return this;
};

/**
 * @param {String} text
 * @param {Style} style
 * @return {Canvas}
 */
Canvas.prototype.drawText = function(text, style)
{
  style = style || Style.defaultStyle;
  var ctx = this._ctx;

  ctx.font         = style.font;
  ctx.textAlign    = style.textAlign;
  ctx.textBaseline = style.textBaseline;

  if (style.color) {
    ctx.fillStyle = style.color;
    ctx.fillText(text, 0, 0);
  }

  if (style.strokeWidth && style.stroke) {
    ctx.strokeStyle = style.stroke;
    ctx.lineWidth = style.strokeWidth;
    ctx.strokeText(text, 0, 0);
  }

  return this;
};

// Fill with a style
Canvas.prototype._fill = function(style)
{
  var ctx = this._ctx;
  if (style.color) {
    ctx.fillStyle = style.color;
    ctx.fill();
  }
};

// Stroke /w style
Canvas.prototype._stroke = function(style)
{
  var ctx = this._ctx;
  if (style.strokeWidth && style.stroke) {
    ctx.strokeStyle = style.stroke;
    ctx.lineWidth = style.strokeWidth;
    ctx.stroke();
  }
};

