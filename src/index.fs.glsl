#ifdef GL_ES
precision mediump float;
#endif

uniform float time;
uniform vec2 resolution;
uniform vec2 mouse;

float PI = 3.1415926535897932384626433;

// angle = [0, 1)
vec2 ppp (vec2 p, float dist, float angle) {
  float a = (angle * 2.0 - 1.0) * PI;
  vec2 v = vec2(dist * cos(a), dist * sin(a));
  return p + v;
}

void main() {
  vec2 pos = gl_FragCoord.xy / resolution.xy;

  vec4 color = vec4(
    pow(1.0 - distance(pos, mouse), 50.0)
  );

  color.r += pow(1.0 - distance(pos, ppp(mouse, 0.1, 0.33 + time)), 70.0);
  color.g += pow(1.0 - distance(pos, ppp(mouse, 0.1, 0.66 + time)), 70.0);
  color.b += pow(1.0 - distance(pos, ppp(mouse, 0.1, 0.99 + time)), 70.0);

  gl_FragColor = color;
}
