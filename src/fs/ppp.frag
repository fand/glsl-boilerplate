float PI = 3.1415926535897932384626433;

// angle = [0, 1)
vec2 ppp (vec2 p, float dist, float angle) {
  float a = (angle * 2.0 - 1.0) * PI;
  vec2 v = vec2(dist * cos(a), dist * sin(a));
  return p + v;
}

#pragma glslify: export(ppp)
