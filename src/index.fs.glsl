#ifdef GL_ES
precision mediump float;
#endif

uniform float time;
uniform vec2 resolution;

void main() {
  vec2 pos = ( gl_FragCoord.xy / resolution.xy );
  gl_FragColor = vec4(
    sin( pos.x * cos( time / 15.0 ) * 80.0 ) + cos( pos.y * cos( time / 15.0 ) * 10.0 ),
    pos.y,
    pos.x,
    1.0
  );
}
