// The entrance to the instrument: one statement, one action, and the live brain beside it.
// `leaving` plays the exit while the camera glides into the application's view.
function Landing({ leaving, readoutRef, onEnter }) {
  return (
    <div className={`landing${leaving ? ' is-leaving' : ''}`} inert={leaving}>
      <div className="landing-copy">
        <h1 className="landing-title">See the brain behind the experience.</h1>
        <p className="landing-lede">
          Turn everyday scenarios into evidence‑grounded maps of the brain, backed by neuroscience research.
        </p>
        <button type="button" className="landing-cta" onClick={onEnter}>
          Explore the Brain <span className="landing-cta-arrow" aria-hidden="true">→</span>
        </button>
      </div>

      <footer className="landing-foot">
        <p className="landing-credit">Built by Rishav Rangapure</p>
        <p className="landing-readout mono" ref={readoutRef} aria-hidden="true" />
      </footer>
    </div>
  )
}

export default Landing
