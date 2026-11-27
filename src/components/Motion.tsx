import { useEffect, useRef } from 'react'

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Split text into spans so each character can animate in with a stagger.
 *  With `gradient`, the characters share one gradient (each shows its own slice). */
export function SplitText({ text, start = 0, gradient = false }: { text: string; start?: number; gradient?: boolean }) {
  const chars = [...text]
  return <>{chars.map((ch, i) => (
    <span key={i} className={`char${gradient ? ' char-gradient' : ''}`} style={{ '--i': start + i, '--k': i, '--n': chars.length } as React.CSSProperties}>
      {ch === ' ' ? '\u00a0' : ch}
    </span>
  ))}</>
}

/** Thin bar at the top of the page that fills as you scroll. */
export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null)
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - innerHeight
      bar.current?.style.setProperty('--progress', String(max > 0 ? scrollY / max : 0))
    }
    const onScroll = () => { frame ||= requestAnimationFrame(update) }
    update()
    addEventListener('scroll', onScroll, { passive: true })
    addEventListener('resize', onScroll)
    return () => { removeEventListener('scroll', onScroll); removeEventListener('resize', onScroll); cancelAnimationFrame(frame) }
  }, [])
  return <div ref={bar} className="scroll-progress" aria-hidden="true" />
}

/** A ring that trails the mouse and grows over links and buttons (fine pointers only). */
export function CursorRing() {
  const ring = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (reduced() || !matchMedia('(pointer: fine)').matches) return
    const el = ring.current!
    let x = innerWidth / 2, y = innerHeight / 2, tx = x, ty = y, frame = 0
    const loop = () => {
      x += (tx - x) * 0.18
      y += (ty - y) * 0.18
      el.style.transform = `translate(${x}px, ${y}px)`
      frame = requestAnimationFrame(loop)
    }
    const move = (event: PointerEvent) => {
      tx = event.clientX; ty = event.clientY
      el.classList.add('is-active')
      el.classList.toggle('is-hover', !!(event.target as Element).closest('a, button'))
    }
    const leave = () => el.classList.remove('is-active')
    addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerleave', leave)
    frame = requestAnimationFrame(loop)
    return () => { removeEventListener('pointermove', move); document.removeEventListener('pointerleave', leave); cancelAnimationFrame(frame) }
  }, [])
  return <div ref={ring} className="cursor-ring" aria-hidden="true" />
}

/** Slowly flowing wave lines drawn on a canvas behind the hero. */
export function WaveLines() {
  const canvas = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const el = canvas.current!
    const ctx = el.getContext('2d')
    if (!ctx) return
    let frame = 0, visible = true
    const resize = () => {
      const ratio = Math.min(devicePixelRatio, 2)
      el.width = el.clientWidth * ratio
      el.height = el.clientHeight * ratio
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
    }
    const draw = (time: number) => {
      const w = el.clientWidth, h = el.clientHeight, t = time / 1000
      ctx.clearRect(0, 0, w, h)
      const lines = 36
      for (let i = 0; i < lines; i++) {
        const p = i / (lines - 1)
        ctx.beginPath()
        for (let x = 0; x <= w; x += 12) {
          const u = x / w
          const y = h * (0.55 + 0.28 * p)
            + Math.sin(u * 3.2 + t * 0.5 + p * 2.2) * h * 0.12 * (1 - u * 0.4)
            + Math.sin(u * 7 - t * 0.3 + p * 4) * h * 0.025
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
        }
        const gradient = ctx.createLinearGradient(0, 0, w, 0)
        // Faint behind the copy on the left, strongest under the artwork on the right.
        gradient.addColorStop(0, 'rgba(26, 115, 232, 0)')
        gradient.addColorStop(0.35, `rgba(26, 115, 232, ${0.02 + 0.05 * (1 - p)})`)
        gradient.addColorStop(0.7, `rgba(52, 168, 83, ${0.05 + 0.14 * (1 - p)})`)
        gradient.addColorStop(1, `rgba(26, 115, 232, ${0.04 + 0.12 * (1 - p)})`)
        ctx.strokeStyle = gradient
        ctx.lineWidth = 1
        ctx.stroke()
      }
      if (visible && !reduced()) frame = requestAnimationFrame(draw)
    }
    resize()
    draw(0)
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      cancelAnimationFrame(frame)
      if (visible && !reduced()) frame = requestAnimationFrame(draw)
    })
    observer.observe(el)
    addEventListener('resize', resize)
    return () => { cancelAnimationFrame(frame); observer.disconnect(); removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={canvas} className="wave-lines" aria-hidden="true" />
}
