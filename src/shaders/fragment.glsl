uniform float uTime;

varying vec2 vUv;
varying float vNoise;
varying vec3 vNormal;
varying vec3 vPosition;

void main()
{
    vec3 X=dFdx(vPosition);
    vec3 Y=dFdy(vPosition);
    vec3 n=normalize(cross(X,Y));
    gl_FragColor=vec4(n,1.);
}