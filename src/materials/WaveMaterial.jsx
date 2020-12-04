import glsl from "babel-plugin-glsl/macro";
import * as THREE from "three";
import { extend } from "react-three-fiber";
import { shaderMaterial } from "@react-three/drei";

const WaveMaterial = shaderMaterial(
  {
    time: 1.0,
    color: new THREE.Color(1.0, 1.0, 1.0),
    x: 0.3,
  },
  glsl`
  uniform float time;
  uniform float x;
  varying vec3 vPos;

  void main() {
    vec3 newPos = position;
    
    // the juice
    newPos.z -= newPos.z * round(cos(time)) - cos(0.7 * time + 3.0 * cos(position.y) + position.x * x);
    newPos.z -= sin(0.7 * time + position.y * 25.0);
    vPos = newPos;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
  }`,
  glsl`
  uniform vec3 color;
  varying vec3 vPos;

  void main() {
    vec3 newColor = color * vPos.z + 0.4;
    gl_FragColor = vec4( newColor, 1.0);
  }`
);

extend({ WaveMaterial });
