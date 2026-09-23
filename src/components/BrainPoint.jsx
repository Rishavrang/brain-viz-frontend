import { useMemo, useRef } from 'react'
import { Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { AdditiveBlending, CanvasTexture, Color } from 'three'
import { evidenceColor, pointGlow, pointRadius, toScenePosition } from '../lib/evidence'

const POP_DURATION = 0.55
const POP_STAGGER = 0.07

// One shared radial-alpha texture: white at the center, fading smoothly to transparent.
let haloTexture = null
function getHaloTexture() {
  if (haloTexture) return haloTexture
  const size = 128
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const ctx = canvas.getContext('2d')
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  gradient.addColorStop(0, 'rgba(255,255,255,1)')
  gradient.addColorStop(0.35, 'rgba(255,255,255,0.35)')
  gradient.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, size, size)
  haloTexture = new CanvasTexture(canvas)
  return haloTexture
}

function BrainPoint({ point, index, active, selected, dimmed, onHover, onSelect }) {
  const groupRef = useRef()
  const born = useRef(null)

  const position = useMemo(() => toScenePosition(point), [point])
  const color = useMemo(() => evidenceColor(point.weight, new Color()), [point.weight])
  const radius = pointRadius(point.weight)
  const glow = pointGlow(point.weight)

  // The one authored moment: points rise into place in sequence when a result arrives.
  useFrame(({ clock }) => {
    const group = groupRef.current
    if (!group) return
    if (born.current === null) born.current = clock.elapsedTime
    const t = (clock.elapsedTime - born.current - index * POP_STAGGER) / POP_DURATION
    const clamped = Math.min(1, Math.max(0, t))
    const eased = 1 - Math.pow(1 - clamped, 4)
    const target = active ? 1.35 : 1
    const current = group.scale.x
    const next = eased * target
    group.scale.setScalar(current + (next - current) * 0.35)
  })

  const dim = dimmed ? 0.45 : 1

  return (
    <group ref={groupRef} position={position} scale={0}>
      {/* Transparent + high renderOrder so the points draw after the translucent shell and stay crisp. */}
      <mesh
        renderOrder={3}
        onPointerOver={(e) => {
          e.stopPropagation()
          document.body.style.cursor = 'pointer'
          onHover(point.pointNumber)
        }}
        onPointerOut={() => {
          document.body.style.cursor = ''
          onHover(null)
        }}
        onClick={(e) => {
          e.stopPropagation()
          onSelect(point.pointNumber)
        }}
      >
        <sphereGeometry args={[radius, 24, 24]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={glow * dim}
          roughness={0.5}
          metalness={0}
          transparent
        />
      </mesh>

      {/* Soft radial falloff, additive so overlapping points read as brighter, not muddy. */}
      <sprite scale={[radius * 6, radius * 6, 1]} raycast={() => null} renderOrder={4}>
        <spriteMaterial
          map={getHaloTexture()}
          color={color}
          transparent
          opacity={(selected || active ? 0.5 : 0.28) * dim}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </sprite>

      <Html
        center
        position={[0, radius + 0.1, 0]}
        zIndexRange={[20, 0]}
        style={{ pointerEvents: 'none' }}
      >
        <span className={`point-tag${active ? ' is-active' : ''}${dimmed ? ' is-dimmed' : ''}`}>
          {point.pointNumber}
        </span>
      </Html>
    </group>
  )
}

export default BrainPoint
