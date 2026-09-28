import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import Brain from './components/Brain'
import BrainPoint from './components/BrainPoint'
import SceneRig, { ENTER_DURATION } from './components/SceneRig'
import LandingScene from './components/LandingScene'
import Landing from './components/Landing'
import Readout from './components/Readout'
import ChatPanel from './components/ChatPanel'
import PointDetail from './components/PointDetail'
import { Hint, Legend } from './components/StageHud'
import { toScenePosition } from './lib/evidence'
import './App.css'

const API = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'
const NARROW = 900
const PANEL_W = 400
const GUTTER = 16
// The camera glide plus the chrome's delayed fade-in (App.css, .is-entering): leaving
// the entering phase any sooner would cut those transitions short.
const ENTER_SETTLE_MS = ENTER_DURATION * 1000 + 500
const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches

// How much of the viewport the chat panel covers, so the brain can be centered in what's left.
// In the bottom-sheet layout a pinned point's detail card stacks above the sheet, so it counts too.
function usePanelInset(cardHeight) {
  const read = () => {
    const narrow = window.innerWidth < NARROW
    return narrow
      ? { x: 0, y: Math.round(window.innerHeight * 0.46) + GUTTER + cardHeight }
      : { x: PANEL_W + GUTTER * 2, y: 0 }
  }
  const [inset, setInset] = useState(read)
  useEffect(() => {
    const onResize = () => setInset(read())
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [cardHeight])
  return inset
}

function normalizePoint(raw) {
  return {
    x: raw.x,
    y: raw.y,
    z: raw.z,
    weight: raw.weight,
    pointNumber: raw.point_number,
    evidenceStrength: raw.evidence_strength,
    studyName: raw.study_name,
    region: raw.region,
  }
}

function App() {
  const [conversationId, setConversationId] = useState(null)
  const [connection, setConnection] = useState('connecting')
  const [messages, setMessages] = useState([])
  const [inputText, setInputText] = useState('')
  const [points, setPoints] = useState([])
  const [sending, setSending] = useState(false)
  const [hoveredId, setHoveredId] = useState(null)
  const [selectedId, setSelectedId] = useState(null)
  const [interacted, setInteracted] = useState(false)
  const [cardHeight, setCardHeight] = useState(0)
  const inset = usePanelInset(cardHeight)
  const startedRef = useRef(false)
  // landing → entering (camera glides in, chrome emerges) → app
  const [phase, setPhase] = useState('landing')
  const readoutRef = useRef(null)
  const landing = phase === 'landing'

  // Written straight to the DOM every frame it changes, so React doesn't re-render at 60fps.
  function writeReadout(text) {
    if (readoutRef.current) readoutRef.current.textContent = text
  }

  function enter() {
    if (phase !== 'landing') return
    setPhase('entering')
  }

  useEffect(() => {
    if (phase !== 'entering') return
    const timer = setTimeout(() => {
      setPhase('app')
      // Hand focus to the scenario input on devices where that won't pop up a keyboard.
      const input = document.querySelector('.panel textarea')
      if (input && !input.disabled && window.matchMedia('(pointer: fine)').matches) input.focus()
    }, REDUCED_MOTION ? 50 : ENTER_SETTLE_MS)
    return () => clearTimeout(timer)
  }, [phase])

  const startConversation = useCallback(async () => {
    setConnection('connecting')
    try {
      const response = await fetch(`${API}/new-conversation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'React Chat' }),
      })
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      const data = await response.json()
      setConversationId(data.id)
      setConnection('ready')
    } catch {
      setConnection('failed')
    }
  }, [])

  useEffect(() => {
    if (startedRef.current) return
    startedRef.current = true
    startConversation()
  }, [startConversation])

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') setSelectedId(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  async function sendMessage() {
    const text = inputText.trim()
    if (!text || sending || connection !== 'ready') return

    setMessages((prev) => [...prev, { role: 'user', content: text }])
    setInputText('')
    setSending(true)
    // Never show the previous scenario's associations under a new question.
    setPoints([])
    setHoveredId(null)
    setSelectedId(null)

    try {
      const response = await fetch(`${API}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, conversation_id: conversationId }),
      })
      if (response.status === 429) {
        setInputText((current) => current || text)
        setMessages((prev) => [
          ...prev,
          {
            role: 'error',
            title: 'Message limit reached',
            content: 'You’ve reached today’s message limit. Please try again tomorrow.',
          },
        ])
        return
      }
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      const data = await response.json()

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.narrative_part, coordinatePart: data.coordinate_part ?? null },
      ])
      setPoints((data.coordinates ?? []).map(normalizePoint))
      setHoveredId(null)
      setSelectedId(null)
    } catch {
      // Give the text back so "send it again" costs nothing.
      setInputText((current) => current || text)
      setMessages((prev) => [
        ...prev,
        {
          role: 'error',
          title: 'That didn’t go through',
          content: 'The evidence server didn’t answer. Check that it’s running, then send the scenario again.',
        },
      ])
    } finally {
      setSending(false)
    }
  }

  function newScenario() {
    setMessages([])
    setPoints([])
    setHoveredId(null)
    setSelectedId(null)
    setInputText('')
    setConversationId(null)
    startConversation()
  }

  function toggleSelect(id) {
    setSelectedId((current) => (current === id ? null : id))
  }

  const activeId = hoveredId ?? selectedId
  const hudBottomRef = useRef(null)

  // Only a pinned card moves the brain; a hover card is transient and must not make it jump.
  useEffect(() => {
    const el = hudBottomRef.current
    if (selectedId === null || !el || window.innerWidth >= NARROW) {
      setCardHeight(0)
      return
    }
    const measure = () => {
      const card = el.querySelector('.detail')
      setCardHeight(card ? Math.round(card.getBoundingClientRect().height) + 8 : 0)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [selectedId])
  const activePoint = useMemo(
    () => points.find((p) => p.pointNumber === activeId) ?? null,
    [points, activeId],
  )
  const focus = useMemo(() => {
    const pinned = points.find((p) => p.pointNumber === selectedId)
    return pinned ? toScenePosition(pinned) : null
  }, [points, selectedId])

  return (
    <main className={`app is-${phase}`}>
      <div className="stage" aria-label="3D brain viewer">
        <Canvas
          camera={{ position: [0, 0, 4], fov: 50 }}
          dpr={[1, 2]}
          gl={{ antialias: true }}
          onPointerMissed={() => setSelectedId(null)}
        >
          <ambientLight intensity={1} />
          <directionalLight position={[5, 5, 5]} />
          <Brain />
          <SceneRig
            inset={inset}
            focus={focus}
            idle={points.length === 0 && !interacted}
            landing={landing}
            onInteract={() => setInteracted(true)}
          />
          {phase !== 'app' && <LandingScene active={landing} />}
          {phase !== 'app' && <Readout onChange={writeReadout} />}
          {points.map((point, index) => (
            <BrainPoint
              key={point.pointNumber}
              point={point}
              index={index}
              active={point.pointNumber === activeId}
              selected={point.pointNumber === selectedId}
              dimmed={activeId !== null && point.pointNumber !== activeId}
              onHover={setHoveredId}
              onSelect={toggleSelect}
            />
          ))}
        </Canvas>
      </div>

      {phase !== 'app' && <Landing leaving={!landing} readoutRef={readoutRef} onEnter={enter} />}

      <div className="chrome" inert={landing}>
        <div className={`hud hud-top${selectedId !== null ? ' is-pinned' : ''}`}>{points.length > 0 && <Legend />}</div>

        <div className="hud hud-bottom" ref={hudBottomRef}>
          {activePoint ? (
            <PointDetail
              point={activePoint}
              pinned={activePoint.pointNumber === selectedId}
              onRelease={() => setSelectedId(null)}
            />
          ) : (
            <Hint />
          )}
        </div>

        <ChatPanel
          messages={messages}
          points={points}
          activeId={activeId}
          selectedId={selectedId}
          connection={connection}
          sending={sending}
          inputText={inputText}
          onInput={setInputText}
          onSend={sendMessage}
          onRetryConnection={startConversation}
          onNew={newScenario}
          onHoverPoint={setHoveredId}
          onSelectPoint={toggleSelect}
        />
      </div>
    </main>
  )
}

export default App
