import { evidenceHex, formatCoord, sentenceCase } from '../lib/evidence'

function PointDetail({ point, pinned, onRelease }) {
  return (
    <aside className="detail" aria-label={`Point ${point.pointNumber} detail`}>
      <div className="detail-head">
        <h2 className="detail-title">Point {point.pointNumber}</h2>
        {pinned ? (
          <button type="button" className="detail-release" onClick={onRelease}>
            Pinned <kbd>Esc</kbd>
          </button>
        ) : (
          <span className="detail-hint">Click to pin</span>
        )}
      </div>

      <dl className="detail-rows">
        <div className="detail-row">
          <dt>Evidence</dt>
          <dd>
            <span className="dot" style={{ background: evidenceHex(point.weight) }} aria-hidden="true" />
            {sentenceCase(point.evidenceStrength) || 'Not reported'}
          </dd>
        </div>
        <div className="detail-row">
          <dt>Study</dt>
          <dd>{point.studyName || 'Not reported'}</dd>
        </div>
        <div className="detail-row">
          <dt>Coordinate</dt>
          <dd className="mono">
            x {formatCoord(point.x)}&ensp;y {formatCoord(point.y)}&ensp;z {formatCoord(point.z)}
          </dd>
        </div>
        {point.region ? (
          <div className="detail-row">
            <dt>Region</dt>
            <dd>{point.region}</dd>
          </div>
        ) : null}
      </dl>

      <p className="detail-note">
        Reported in published research. An association, not proof of what happens in your brain.
      </p>
    </aside>
  )
}

export default PointDetail
