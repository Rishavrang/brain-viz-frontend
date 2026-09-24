import { useEffect, useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Vector3 } from 'three'

const REDUCED_MOTION =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const NARROW = 900
const APP_DISTANCE = 4
const LANDING_DISTANCE = 4.9
// Seen from slightly above and to one side, the landing brain reads as an object in space
// rather than a flat coronal slice.
const LANDING_AZIMUTH = -0.62
const LANDING_POLAR = Math.PI / 2 - 0.2
export const ENTER_DURATION = 1.5

// Where the brain sits on the landing screen: to the right of the headline when there is
// room beside it, otherwise in the upper part of the screen above it, zoomed to fit.
// Keep `isStackedLanding` in step with the stacked-landing media query in App.css.
function isStackedLanding(width, height) {
  return width < 640 || (width < NARROW && width < height * 1.25)
}

function landingView(width, height) {
  if (!isStackedLanding(width, height)) {
    // The brain scales with height but the headline can't shrink as far, so give the
    // brain less of the screen as it gets squarer or smaller.
    const zoom = Math.min(1, width / height / 1.6, width / 1300 + 0.15)
    return { x: -width * 0.165, y: 0, zoom }
  }
  // World height visible at the landing distance with zoom 1 (fov 50).
  const visible = 2 * LANDING_DISTANCE * Math.tan((25 * Math.PI) / 180)
  const aspect = width / height
  const fitWidth = (visible * aspect) / (3.4 / 0.9)
  const fitHeight = visible / (2.9 / 0.46)
  return { x: 0, y: height * 0.2, zoom: Math.min(fitWidth, fitHeight) }
}

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

// Keeps the brain centered in the space the chat panel leaves free, and eases the
// orbit pivot toward a pinned point so it stays in view while the user rotates.
// On the landing screen it holds a composed view instead, and when the user enters
// it glides the same camera from that view into the application's.
function SceneRig({ inset, focus, idle, landing, onInteract }) {
  const camera = useThree((s) => s.camera)
  const size = useThree((s) => s.size)
  const controls = useThree((s) => s.controls)
  const desired = useMemo(() => new Vector3(), [])
  const offset = useMemo(() => new Vector3(), [])
  const view = useRef(null)
  const enter = useRef(null)

  useEffect(() => {
    if (landing) camera.position.setFromSphericalCoords(LANDING_DISTANCE, LANDING_POLAR, LANDING_AZIMUTH)
    // Mount-only: after this the orbit controls own the camera position.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [camera])

  useEffect(() => {
    if (landing) {
      enter.current = null
      return
    }
    if (!view.current) return
    enter.current = { start: null, from: { ...view.current }, fromDistance: camera.position.length() }
  }, [landing, camera])

  useEffect(
    () => () => {
      view.current = null
      camera.clearViewOffset()
      camera.zoom = 1
      camera.updateProjectionMatrix()
    },
    [camera],
  )

  useFrame(({ clock, camera }, delta) => {
    // A positive view offset moves the scene the other way, so half the panel
    // shifts the brain to the middle of the remaining space.
    // In the bottom-sheet layout the free area is a narrow strip, so pull back to fit the whole brain.
    const app = { x: inset.x / 2, y: inset.y / 2, zoom: inset.y > 0 ? 0.6 : 1 }
    let next = landing ? landingView(size.width, size.height) : app
    let distance = landing ? LANDING_DISTANCE : null

    const run = enter.current
    if (run) {
      if (run.start === null) run.start = clock.elapsedTime
      const t = REDUCED_MOTION ? 1 : Math.min(1, (clock.elapsedTime - run.start) / ENTER_DURATION)
      const k = easeInOutCubic(t)
      next = {
        x: run.from.x + (app.x - run.from.x) * k,
        y: run.from.y + (app.y - run.from.y) * k,
        zoom: run.from.zoom + (app.zoom - run.from.zoom) * k,
      }
      distance = run.fromDistance + (APP_DISTANCE - run.fromDistance) * k
      if (t >= 1) enter.current = null
    }

    const prev = view.current
    if (
      !prev ||
      prev.x !== next.x ||
      prev.y !== next.y ||
      prev.zoom !== next.zoom ||
      prev.width !== size.width ||
      prev.height !== size.height
    ) {
      camera.setViewOffset(size.width, size.height, next.x, next.y, size.width, size.height)
      camera.zoom = next.zoom
      camera.updateProjectionMatrix()
      view.current = { ...next, width: size.width, height: size.height }
    }

    if (!controls) return
    if (distance !== null) {
      offset.copy(camera.position).sub(controls.target).setLength(distance)
      camera.position.copy(controls.target).add(offset)
    }
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
      enableZoom={!landing}
      enablePan={!landing}
      autoRotate={(landing || idle) && !REDUCED_MOTION}
      autoRotateSpeed={landing ? 0.35 : 0.5}
      onStart={landing ? undefined : onInteract}
    />
  )
}

export default SceneRig
