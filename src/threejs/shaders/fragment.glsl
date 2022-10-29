uniform vec2 u_resolution;
uniform float u_time;

void main() {
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  float green = abs(sin(u_time*0.4));
  gl_FragColor=vec4(st.y,green,st.x,1.0);
}