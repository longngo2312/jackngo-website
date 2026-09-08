import Particles from './Particles'

/**
 * Page backdrop, painted back to front: ground, ambient glow, the WebGL
 * particle field, a masked technical grid, then a vignette that quiets the
 * edges so page content always holds the center.
 */
export default function Backdrop() {
  return (
    <>
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 bg-deep">
        <div className="absolute inset-0 backdrop-glow" />

        <div className="absolute inset-0 opacity-90">
          <Particles />
        </div>

        <div className="absolute inset-0 backdrop-grid" />

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_78%_58%_at_50%_42%,transparent,rgba(4,8,10,0.82))]" />
      </div>

      <div aria-hidden>
        <span className="frame-corner left-3 top-3 border-l border-t sm:left-5 sm:top-5" />
        <span className="frame-corner right-3 top-3 border-r border-t sm:right-5 sm:top-5" />
        <span className="frame-corner bottom-3 left-3 border-b border-l sm:bottom-5 sm:left-5" />
        <span className="frame-corner bottom-3 right-3 border-b border-r sm:bottom-5 sm:right-5" />
      </div>
    </>
  )
}
