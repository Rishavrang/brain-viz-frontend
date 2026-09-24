import { CanvasTexture } from 'three'

// One shared radial-alpha texture: white at the center, fading smoothly to transparent.
let haloTexture = null
export function getHaloTexture() {
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
