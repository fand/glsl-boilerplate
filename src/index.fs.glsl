#ifdef GL_ES
precision mediump float;
#endif

uniform float time;
uniform vec2 resolution;
uniform vec2 mouse;

void main() {
  vec2 pos = gl_FragCoord.xy / resolution.xy;
  vec4 color = vec4(
    pow(1.0 - distance(mouse, pos), 30.0)
  );

  gl_FragColor = color;
}
