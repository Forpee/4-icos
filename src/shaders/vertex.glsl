uniform float uTime;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;
varying float vNoise;

float mod289(float x){return x-floor(x*(1./289.))*289.;}
vec4 mod289(vec4 x){return x-floor(x*(1./289.))*289.;}
vec4 perm(vec4 x){return mod289(((x*34.)+1.)*x);}

float noise(vec3 p){
    vec3 a=floor(p);
    vec3 d=p-a;
    d=d*d*(3.-2.*d);
    
    vec4 b=a.xxyy+vec4(0.,1.,0.,1.);
    vec4 k1=perm(b.xyxy);
    vec4 k2=perm(k1.xyxy+b.zzww);
    
    vec4 c=k2+a.zzzz;
    vec4 k3=perm(c);
    vec4 k4=perm(c+1.);
    
    vec4 o1=fract(k3*(1./41.));
    vec4 o2=fract(k4*(1./41.));
    
    vec4 o3=o2*d.z+o1*(1.-d.z);
    vec2 o4=o3.yw*d.x+o3.xz*(1.-d.x);
    
    return o4.y*d.y+o4.x*(1.-d.y);
}

float PI=3.14159265;

void main()
{
    vec3 p=position;
    float n=noise(vec3(p.x,p.y+.2*cos(2.*PI*uTime),p.z+.2*sin(2.*PI*uTime))*4.);
    // n*=n*n*n;
    vNoise=n;
    vec3 newpos=position+.24*n*normalize(position);
    vec4 vView=modelViewMatrix*vec4(newpos,1.);;
    vec4 mvPosition=modelViewMatrix*vec4(newpos,1.);
    gl_PointSize=10.*(1./-mvPosition.z);
    vPosition=vView.xyz;
    gl_Position=projectionMatrix*vView;
    vNormal=normal;
    vUv=uv;
}