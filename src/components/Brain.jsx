import { useGLTF } from '@react-three/drei'

function Brain() {
  const { scene } = useGLTF('/src/assets/models/brain.glb')
  return (
      <primitive object={scene} scale={20} position={[0, -16.6, 0]} />
  )
}

export default Brain