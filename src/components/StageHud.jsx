import { EVIDENCE_STOPS } from '../lib/evidence'

export function Legend() {
  return (
    <div className="legend" role="img" aria-label="Evidence strength, from weaker to stronger">
      <span className="legend-title">Evidence strength</span>
      <span
        className="legend-bar"
        style={{ background: `linear-gradient(90deg, ${EVIDENCE_STOPS.join(', ')})` }}
        aria-hidden="true"
      />
      <span className="legend-ends" aria-hidden="true">
        <span>Weaker</span>
        <span>Stronger</span>
      </span>
    </div>
  )
}

export function Hint() {
  return (
    <p className="hint">
      Drag to rotate <span aria-hidden="true">·</span> Scroll to zoom <span aria-hidden="true">·</span> Right-drag to pan
    </p>
  )
}
