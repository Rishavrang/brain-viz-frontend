import { useMemo, useRef } from 'react'
import { Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { AdditiveBlending, BufferAttribute, BufferGeometry } from 'three'
import { getHaloTexture } from '../lib/halo'
import { toScenePosition } from '../lib/evidence'

const REDUCED_MOTION =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Standard atlas locations, shown only as unlabeled reference markers: amygdala,
// hippocampus, ventromedial prefrontal cortex, primary visual cortex. They hint at the
// numbered points a scenario produces; no study or evidence strength is implied, so they
// stay achromatic. Hue on this app always means evidence strength.
const MARKERS = [
  { n: 1, x: -24, y: -4, z: -18 },
  { n: 2, x: 28, y: -22, z: -14 },
  { n: 3, x: 2, y: 46, z: -8 },
  { n: 4, x: 8, y: -86, z: 6 },
]

const CYCLE = 9 // seconds for all markers to take a turn
const LIT = 3.2 // seconds each marker stays lit, overlapping its neighbors

function pulse(t) {
  // Smooth rise and fall over [0, 1], zero outside.
  if (t <= 0 || t >= 1) return 0
  return Math.pow(Math.sin(Math.PI * t), 2)
}

function Marker({ marker, index, presence }) {
  const group = useRef()
  const core = useRef()
  const halo = useRef()
  const tag = useRef()
  const position = useMemo(() => toScenePosition(marker), [marker])

  useFrame(({ clock }) => {
    const phase = ((clock.elapsedTime + 1.2 - index * (CYCLE / MARKERS.length)) % CYCLE + CYCLE) % CYCLE
    const lit = REDUCED_MOTION ? (index === 0 ? 1 : 0.35) : 0.18 + 0.82 * pulse(phase / LIT)
    const p = presence.current
    core.current.material.opacity = (0.35 + 0.65 * lit) * p
    halo.current.material.opacity = 0.5 * lit * p
    group.current.scale.setScalar(0.85 + 0.15 * lit)
    if (tag.current) tag.current.style.opacity = String(Math.max(0, (lit - 0.25) / 0.75) * p)
  })

  return (
    <group ref={group} position={position}>
      <mesh ref={core} renderOrder={3} raycast={() => null}>
        <sphereGeometry args={[0.032, 20, 20]} />
        <meshBasicMaterial color="#f7f8f8" transparent opacity={0} depthWrite={false} />
      </mesh>
      <sprite ref={halo} scale={[0.62, 0.62, 1]} raycast={() => null} renderOrder={4}>
        <spriteMaterial
          map={getHaloTexture()}
          color="#d0d6e0"
          transparent
          opacity={0}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </sprite>
      <Html center position={[0, 0.15, 0]} zIndexRange={[1, 0]} style={{ pointerEvents: 'none' }}>
        <span ref={tag} className="point-tag landing-tag" style={{ opacity: 0 }} aria-hidden="true">
          {marker.n}
        </span>
      </Html>
    </group>
  )
}

// A sparse, slow field of dust around the specimen. It gives the orbit parallax so the
// stage reads as a volume, and stays too faint to compete with the brain.
function Dust({ presence }) {
  const points = useRef()
  const geometry = useMemo(() => {
    const count = 260
    const positions = new Float32Array(count * 3)
    let seed = 7
    const rand = () => {
      seed = (seed * 16807) % 2147483647
      return seed / 2147483647
    }
    for (let i = 0; i < count; i++) {
      const r = 2.4 + Math.pow(rand(), 0.7) * 6
      const theta = rand() * Math.PI * 2
      const phi = Math.acos(2 * rand() - 1)
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.cos(phi) * 0.7
      positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)
    }
    const g = new BufferGeometry()
    g.setAttribute('position', new BufferAttribute(positions, 3))
    return g
  }, [])

  useFrame((_, delta) => {
    const obj = points.current
    if (!REDUCED_MOTION) obj.rotation.y += delta * 0.012
    obj.material.opacity = 0.55 * presence.current
  })

  return (
    <points ref={points} geometry={geometry} renderOrder={1} raycast={() => null}>
      <pointsMaterial
        map={getHaloTexture()}
        color="#a9b4c8"
        size={0.035}
        sizeAttenuation
        transparent
        opacity={0}
        blending={AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

// Landing-only additions to the shared scene. They fade in on load and fade out as the
// user enters, then unmount; the brain itself is the application's own and never changes.
function LandingScene({ active }) {
  const presence = useRef(0)

  useFrame((_, delta) => {
    const target = active ? 1 : 0
    const rate = active ? 0.9 : 2.4
    const k = REDUCED_MOTION ? 1 : 1 - Math.exp(-rate * delta)
    presence.current += (target - presence.current) * k
  })

  return (
    <>
      <Dust presence={presence} />
      {MARKERS.map((marker, i) => (
        <Marker key={marker.n} marker={marker} index={i} presence={presence} />
      ))}
    </>
  )
}

export default LandingScene
