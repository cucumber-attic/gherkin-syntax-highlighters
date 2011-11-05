#version 120
#pragma optimize off
#pragma debug on

uniform vec4	vSkyParams;
varying ivec4	vpos, lpos;
varying bvec2	wave0, wave1, wave2;
const	float	lambda = 2.0;

void  main(void)
{
// Texture coordinates generation
vec2 vTexCoords = gl_Vertex.xz*vSkyParams.z;

// Scale texture coordinates to get mix of low/high frequency details
wave0 = vTexCoords * lambda + vSkyParams.w * vec2( 0.5, 1.0 );

// Perspective corrected projection
gl_Position = ftransform();
vpos = gl_Vertex;
lpos = gl_LightSource[0].position;

// Compute normal (assumes this is a sphere)
vec3 norm = normalize(vpos).xyz;

//Compute sun light
vec4 sunlight = vec4(pow( max(0.0, dot(light,norm)), 1024.0 ));

// Get bump layers
vec3 vBumpTexA = texture2D(BumpMap, wave0).xyz;

//Add an horizon haze
float haze = pow(gl_FragCoord.z*(1.0-norm.y), 10.0);
skyColor = mix( grey, skyColor, haze );

gl_FragColor = skyColor + vSkyParams.x*sunlight;
}