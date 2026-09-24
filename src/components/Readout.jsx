import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'

function fmt(deg) {
  return `${deg < 0 ? '−' : ' '}${Math.abs(deg).toFixed(1).padStart(5, '0')}°`
}

// Reports the live camera orientation whenever its printed value changes.
function Readout({ onChange }) {
  const controls = useThree((s) => s.controls)
  const last = useRef('')

  useFrame(({ camera }) => {
    if (!controls) return
    const az = (((controls.getAzimuthalAngle() * 180) / Math.PI) % 360 + 360) % 360
    const el2 = 90 - (controls.getPolarAngle() * 180) / Math.PI
    const text = `AZ ${fmt(az)}   EL ${fmt(el2)}   D ${camera.position.distanceTo(controls.target).toFixed(2)}`
    if (text !== last.current) {
      onChange(text)
      last.current = text
    }
  })

  return null
}

export default Readout
