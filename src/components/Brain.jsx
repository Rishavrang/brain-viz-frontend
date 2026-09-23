import { useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import { Color, ShaderMaterial } from 'three'
import brainUrl from '../assets/models/brain.glb?url'

// A translucent cool-gray shell with a rim light. Unlit on purpose: the points
// inside it are the subject, and the shell only has to give the head its form.
const vertexShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vView = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`

const fragmentShader = /* glsl */ `
  uniform vec3 uBase;
  uniform vec3 uRim;
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    vec3 n = normalize(vNormal);
    float facing = max(dot(n, normalize(vView)), 0.0);
    float rim = pow(1.0 - facing, 3.0);
    float shade = 0.55 + 0.45 * clamp(n.y * 0.5 + 0.5, 0.0, 1.0);
    vec3 color = mix(uBase * shade, uRim, rim);
    float alpha = 0.035 + rim * 0.3;
    gl_FragColor = vec4(color, alpha);
    #include <colorspace_fragment>
  }
`

function createShellMaterial() {
  return new ShaderMaterial({
    uniforms: {
      uBase: { value: new Color('#3b4250') },
      uRim: { value: new Color('#a9b4c8') },
    },
    vertexShader,
    fragmentShader,
    transparent: true,
    depthWrite: false,
  })
}

function Brain() {
  const { scene } = useGLTF(brainUrl)

  const shell = useMemo(() => {
    const material = createShellMaterial()
    const clone = scene.clone(true)
    clone.traverse((child) => {
      if (child.isMesh) {
        child.material = material
        child.renderOrder = 0
      }
    })
    return clone
  }, [scene])

  return <primitive object={shell} scale={20} position={[0, -16.6, 0]} />
}

export default Brain
