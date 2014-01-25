module.exports = Style;

/**
 * @constructor
 */
function Style()
{
  this.color        = null;
  this.stroke       = null;

  this.strokeWidth  = 0;
  this.font         = '24px sans-serif';
  this.textAlign    = Style.START;
  this.textBaseline = Style.TOP;
}

Style.START  = 'start';
Style.TOP    = 'top';
Style.MIDDLE = 'middle';
Style.RIGHT  = 'right';

// Sane defaults
var defaultStyle         = Style.defaultStyle = new Style();
defaultStyle.color       = '#888';
defaultStyle.stroke      = '#555';
defaultStyle.strokeWidth = 3;

