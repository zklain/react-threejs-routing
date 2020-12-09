import { shaderMaterial } from "@react-three/drei";
import glsl from "babel-plugin-glsl/macro";
import { extend } from "react-three-fiber";
import * as THREE from "three";

const JuicyMaterial = shaderMaterial(
  {
    time: 0,
    amplitude: 1.0,
    displacement: 0.4,
    color: new THREE.Color(0.2, 0.3, 0.4),
    colorTexture: null,
  },
  glsl`

  uniform float amplitude;
  uniform float displacement;

  varying vec2 vUv;
  varying vec3 vPos;
  varying vec3 vNormal;

  void main() {
    vNormal = normal;
    vUv = (0.5 + amplitude) * uv + vec2(amplitude);

    vec3 pos = position + amplitude * normal * vec3(displacement);
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`,
  glsl`
    varying vec3 vNormal;
    varying vec2 vUv;
    uniform vec3 color;
    uniform sampler2D colorTexture;

    void main() {

      vec3 light = vec3( 0.5, 0.2, 1.0 );
      light = normalize( light );

      float dProd = dot( vNormal, light ) * 0.3 + 0.75;


     gl_FragColor = vec4( vec3( dProd ) * vec3( color ), 1.0 );
    }
  `
);

extend({ JuicyMaterial });

// todo: displacement material
// todo: gold like shader?
