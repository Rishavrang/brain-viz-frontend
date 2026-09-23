import { Color } from 'three'

// Sequential ramp: weak evidence is dim and cool, strong evidence is hot.
// Weak points must never look as certain as strong ones, so size and glow
// scale with the same value as hue.
export const EVIDENCE_STOPS = ['#5f6fa0', '#e9a24b', '#ff5b3a']

const stops = EVIDENCE_STOPS.map((hex) => new Color(hex))

// A missing weight is "not reported", never "weakest": it gets a neutral gray, not a ramp color.
const NEUTRAL = new Color('#8a8f98')

export function strengthOf(weight) {
  const w = Number.isFinite(weight) ? weight : 0
  return Math.min(1, Math.max(0, (w - 0.25) / 0.75))
}

export function evidenceColor(weight, target = new Color()) {
  if (!Number.isFinite(weight)) return target.copy(NEUTRAL)
  const t = strengthOf(weight)
  if (t < 0.5) return target.copy(stops[0]).lerp(stops[1], t / 0.5)
  return target.copy(stops[1]).lerp(stops[2], (t - 0.5) / 0.5)
}

export function evidenceHex(weight) {
  return `#${evidenceColor(weight).getHexString()}`
}

export function pointRadius(weight) {
  return 0.09 + 0.06 * strengthOf(weight)
}

export function pointGlow(weight) {
  return 0.45 + 0.75 * strengthOf(weight)
}

// Same mapping the viewer has always used from backend coordinate space to model space.
export const COORD_SCALE = 73.33
export function toScenePosition({ x, y, z }) {
  return [x / COORD_SCALE, z / COORD_SCALE, y / COORD_SCALE]
}

export function formatCoord(value) {
  if (!Number.isFinite(value)) return '—'
  const rounded = Math.round(value * 10) / 10
  return (rounded < 0 ? '−' : '') + Math.abs(rounded).toFixed(1)
}

export function sentenceCase(text) {
  if (!text) return ''
  const s = String(text).trim()
  return s.charAt(0).toUpperCase() + s.slice(1)
}
