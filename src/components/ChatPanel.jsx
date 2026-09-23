import { useEffect, useRef } from 'react'
import { evidenceHex, sentenceCase } from '../lib/evidence'

const EXAMPLES = [
  "I'm walking through a jungle, see a snake, and become afraid",
  'Hearing my favorite song after a long day',
  'Trying to remember where I parked my car',
]

function ArrowUp() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M7 11.5V2.5M7 2.5L3 6.5M7 2.5L11 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function PointRow({ point, active, pinned, onHover, onSelect }) {
  return (
    <li>
      <button
        type="button"
        className={`point-row${active ? ' is-active' : ''}`}
        onMouseEnter={() => onHover(point.pointNumber)}
        onMouseLeave={() => onHover(null)}
        onFocus={() => onHover(point.pointNumber)}
        onBlur={() => onHover(null)}
        onClick={() => onSelect(point.pointNumber)}
        aria-pressed={pinned}
      >
        <span className="point-num mono" style={{ '--dot': evidenceHex(point.weight) }}>
          {point.pointNumber}
        </span>
        <span className="point-text">
          <span className="point-ev">{sentenceCase(point.evidenceStrength) || 'Evidence not reported'} evidence</span>
          <span className="point-study" title={point.studyName || undefined}>
            {point.studyName || 'Study not reported'}
          </span>
        </span>
      </button>
    </li>
  )
}

function ChatPanel({
  messages,
  points,
  activeId,
  selectedId,
  connection,
  sending,
  inputText,
  onInput,
  onSend,
  onRetryConnection,
  onNew,
  onHoverPoint,
  onSelectPoint,
}) {
  const scrollRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  }, [messages.length, sending, points.length])

  useEffect(() => {
    const el = inputRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, 132)}px`
  }, [inputText])

  const ready = connection === 'ready'
  const canSend = ready && !sending && inputText.trim().length > 0
  const empty = messages.length === 0

  function handleSubmit(e) {
    e.preventDefault()
    if (canSend) onSend()
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault()
      if (canSend) onSend()
    }
  }

  function fillExample(text) {
    onInput(text)
    inputRef.current?.focus()
  }

  return (
    <section className="panel" aria-label="Scenario chat">
      <header className="panel-head">
        <h1 className="panel-title">Scenario</h1>
        {!empty && (
          <button type="button" className="text-btn" onClick={onNew} disabled={sending}>
            New scenario
          </button>
        )}
      </header>

      <div className="panel-scroll" ref={scrollRef}>
        {connection === 'failed' && (
          <div className="notice" role="alert">
            <p className="notice-title">Can’t reach the evidence server</p>
            <p className="notice-body">Check that it’s running at 127.0.0.1:8000, then try again.</p>
            <button type="button" className="text-btn" onClick={onRetryConnection}>
              Try again
            </button>
          </div>
        )}

        {empty && connection !== 'failed' && (
          <div className="empty">
            <h2 className="empty-title">Describe a scenario</h2>
            <p className="empty-body">
              Write a real-world moment. Each point on the brain is a coordinate reported in published research,
              with the study it came from.
            </p>
            <ul className="examples">
              {EXAMPLES.map((text) => (
                <li key={text}>
                  <button type="button" className="example" onClick={() => fillExample(text)} disabled={!ready}>
                    {text}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="thread" role="log" aria-live="polite" aria-relevant="additions">
          {messages.map((msg, i) => (
            <div key={i} className={`msg msg-${msg.role}`}>
              {msg.role === 'error' ? (
                <>
                  <p className="notice-title">{msg.title}</p>
                  <p className="notice-body">{msg.content}</p>
                </>
              ) : (
                <p>{msg.content}</p>
              )}
            </div>
          ))}
          {sending && (
            <div className="msg msg-assistant is-loading" aria-label="Looking up research evidence">
              <span className="skeleton" style={{ width: '92%' }} />
              <span className="skeleton" style={{ width: '78%' }} />
              <span className="skeleton" style={{ width: '54%' }} />
            </div>
          )}
        </div>

        {points.length > 0 && (
          <div className="points">
            <h2 className="points-title">
              Research coordinates <span className="points-count mono">{points.length}</span>
            </h2>
            <ul className="point-list">
              {points.map((point) => (
                <PointRow
                  key={point.pointNumber}
                  point={point}
                  active={point.pointNumber === activeId}
                  pinned={point.pointNumber === selectedId}
                  onHover={onHoverPoint}
                  onSelect={onSelectPoint}
                />
              ))}
            </ul>
          </div>
        )}
      </div>

      <form className="composer" onSubmit={handleSubmit}>
        <div className="composer-box">
          <textarea
            ref={inputRef}
            rows={1}
            value={inputText}
            onChange={(e) => onInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              connection === 'connecting'
                ? 'Connecting to the evidence server…'
                : connection === 'failed'
                  ? 'Server unavailable'
                  : 'Describe a scenario'
            }
            disabled={!ready}
            aria-label="Scenario"
          />
          <button type="submit" className="send" disabled={!canSend} aria-label="Send scenario">
            <ArrowUp />
          </button>
        </div>
        <p className="composer-note">Research associations from published studies, not a scan of your brain.</p>
      </form>
    </section>
  )
}

export default ChatPanel
