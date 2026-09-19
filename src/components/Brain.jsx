import { useGLTF } from '@react-three/drei'

function Brain() {
  const { scene } = useGLTF('/src/assets/models/brain.glb')
  scene.traverse((child) => {
    if (child.isMesh) { 
        child.material.transparent = true
        child.material.opacity = 0.3
    }
  })
  return (
      <primitive object={scene} scale={20} position={[0, -16.6, 0]} />
  )
}

export default Brain