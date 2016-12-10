- `gl_FragColor(color: vec4)`
  - foo
  - bar
- uniform value
  ```glsl
  #ifdef GL_ES
  precision mediump float;
  #endif

  uniform vec2 u_resolution; // Canvas size (width,height)
  uniform vec2 u_mouse;      // mouse position in screen pixels
  uniform float u_time;     // Time in seconds since load
  ```
