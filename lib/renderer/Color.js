module.exports = Color;

function Color(){

}

Color.add = function(a, b, scale)
{
  scale = scale || 1.0;
  return {
    r: a.r + b.r * scale,
    g: a.g + b.g * scale,
    b: a.b + b.b * scale
  }
};

Color.sub = function(a, b, scale)
{
  scale = scale || 1.0;
  return {
    r: a.r - b.r * scale,
    g: a.g - b.g * scale,
    b: a.b - b.b * scale
  }
};

Color.cap = function(color){
  return {
    r: Math.min(Math.max(color.r, 0), 255),
    g: Math.min(Math.max(color.g, 0), 255),
    b: Math.min(Math.max(color.b, 0), 255),
  }
}

Color.equals = function(a, b, epsilon){
  epsilon = epsilon || 0.05
  return (Math.abs(a.r - b.r) < epsilon)
    && (Math.abs(a.g - b.g) < epsilon)
    && (Math.abs(a.b - b.b) < epsilon);
}

Color.tohtml = function(color){
  return 'rgb(' +
    color.r.toFixed(0) + ',' +
    color.g.toFixed(0) + ',' +
    color.b.toFixed(0) + ')';
}

