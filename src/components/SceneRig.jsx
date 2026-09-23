import { useEffect, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Vector3 } from 'three'

const REDUCED_MOTION =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Keeps the brain centered in the space the chat panel leaves free, and eases the
// orbit pivot toward a pinned point so it stays in view while the user rotates.
function SceneRig({ inset, focus, idle, onInteract }) {
  const camera = useThree((s) => s.camera)
  const get = useThree((s) => s.get)
  const size = useThree((s) => s.size)
  const controls = useThree((s) => s.controls)
  const desired = useMemo(() => new Vector3(), [])

  useEffect(() => {
    // A positive view offset moves the scene the other way, so half the panel
    // shifts the brain to the middle of the remaining space.
    camera.setViewOffset(size.width, size.height, inset.x / 2, inset.y / 2, size.width, size.height)
    // In the bottom-sheet layout the free area is a narrow strip, so pull back to fit the whole brain.
    const live = get().camera
    live.zoom = inset.y > 0 ? 0.6 : 1
    camera.updateProjectionMatrix()
    return () => {
      camera.clearViewOffset()
      live.zoom = 1
      camera.updateProjectionMatrix()
    }
  }, [camera, get, size.width, size.height, inset.x, inset.y])

  useFrame((_, delta) => {
    if (!controls) return
    if (focus) desired.set(focus[0] * 0.5, focus[1] * 0.5, focus[2] * 0.5)
    else desired.set(0, 0, 0)
    const k = REDUCED_MOTION ? 1 : 1 - Math.pow(0.001, delta)
    controls.target.lerp(desired, k)
  })

  return (
    <OrbitControls
      makeDefault
      enableDamping
      dampingFactor={0.08}
      rotateSpeed={0.6}
      zoomSpeed={0.7}
      minDistance={2}
      maxDistance={10}
      autoRotate={idle && !REDUCED_MOTION}
      autoRotateSpeed={0.5}
      onStart={onInteract}
    />
  )
}

export default SceneRig
