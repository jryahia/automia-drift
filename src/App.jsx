import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import Lenis from 'lenis'
import { ArrowUpRight, Check, Clock, Shield, BadgeCheck, Gauge, Zap, Code2, Layers } from 'lucide-react'

function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.3, smoothWheel: true })
    function loop(t) { lenis.raf(t * 1000); requestAnimationFrame(loop) }
    requestAnimationFrame(loop)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) lenis.stop()
    return () => lenis.destroy()
  }, [])
}
const SplitWords = ({ text, className = '' }) => {
  const ref = useRef(null); const { scrollYProgress } = useScroll({ target: ref, offset: ['start 88%', 'end 60%'] })
  const words = text.split(' '); const ys = words.map((w, i) => useTransform(scrollYProgress, [i / words.length, (i + 1.2) / words.length], ['115%', '0%'], { clamp: true }))
  return <h2 ref={ref} className={className} style={{ margin: 0 }}>{words.map((w, i) => <span key={i} className="wm" style={{ display: 'inline-block', overflow: 'hidden', paddingBottom: '.1em' }} aria-hidden="true"><motion.span style={{ y: ys[i], display: 'inline-block' }}>{w}</motion.span>{'\u00A0'}</span>)}</h2>
}
const Reveal = ({ children, delay = 0 }) => {
  const ref = useRef(null); const { scrollYProgress } = useScroll({ target: ref, offset: ['start 88%', 'end 65%'] })
  const y = useTransform(scrollYProgress, [0, 1], [48, 0]); const o = useTransform(scrollYProgress, [0, .35], [0, 1])
  return <motion.div ref={ref} style={{ y, opacity: o }}>{children}</motion.div>
}
const Magnetic = ({ children, strength = .3 }) => {
  const ref = useRef(null)
  return <motion.div ref={ref} onMouseMove={(e) => { const el = ref.current, r = el.getBoundingClientRect(); el.style.transform = `translate(${(e.clientX - (r.left + r.width / 2)) * strength}px, ${(e.clientY - (r.top + r.height / 2)) * strength}px)` }} onMouseLeave={() => { ref.current.style.transform = 'translate(0,0)' }} style={{ transition: 'transform .4s cubic-bezier(.22,1,.36,1)', display: 'inline-block' }}>{children}</motion.div>
}

const Header = () => <header className="site-header"><div className="header-inner"><a href="#" className="logo">Drift<span>.</span></a><nav><a href="#services">Services</a><a href="#results">Results</a><a href="#pricing">Pricing</a><a href="#process">Process</a><Magnetic><motion.a href="#contact" whileHover={{ scale: 1.05 }} className="btn-cta">Start a project</motion.a></Magnetic></nav></div></header>

const Hero = () => {
  const ref = useRef(null); const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y0 = useTransform(scrollYProgress, [0, 1], [0, -120]); const y1 = useTransform(scrollYProgress, [0, 1], [0, 80]); const y2 = useTransform(scrollYProgress, [0, 1], [0, -200])
  const inY = useTransform(scrollYProgress, [0, .5], [0, 120]); const o = useTransform(scrollYProgress, [0, .45], [1, 0])
  return (
    <section ref={ref} className="hero">
      <div className="hero-layers">
        <motion.span className="hl hl1" style={{ y: y0 }}>DRIFT</motion.span>
        <motion.span className="hl hl2" style={{ y: y2 }}>✦ depth ✦</motion.span>
        <motion.span className="hl hl3" style={{ y: y1 }}></motion.span>
      </div>
      <motion.div className="hero-inner" style={{ y: inY, opacity: o }}>
        <p className="kicker"><Layers size={12} /> Smooth-scroll & layered depth studio</p>
        <h1><motion.span className="hw" initial={{ opacity: 0, y: 90 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, ease: [0.16,1,0.3,1], delay: .3 }}>Scroll with</motion.span> <motion.span className="hw accent" initial={{ opacity: 0, y: 90 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, ease: [0.16,1,0.3,1], delay: .42 }}>momentum.</motion.span></h1>
        <motion.p className="hero-sub" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .75 }}>Buttery inertia scroll and layered parallax that make every page feel dimensional, fluid and premium.</motion.p>
        <motion.div className="hero-ctas" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .9 }}>
          <Magnetic><motion.a href="#contact" whileHover={{ scale: 1.06 }} className="btn-primary">Get a free quote <ArrowUpRight size={16} style={{ verticalAlign: 'middle', marginLeft: 4 }} /></motion.a></Magnetic>
          <Magnetic><motion.a href="#pricing" whileHover={{ scale: 1.06 }} className="btn-ghost">See pricing</motion.a></Magnetic>
        </motion.div>
      </motion.div>
    </section>
  )
}
const Stack = () => { const stack = ['Lenis', 'GSAP', 'React', 'framer-motion', 'TypeScript', 'Vite', 'Figma', 'Node.js']; const metrics = [{ icon: <Gauge size={18} />, n: '60fps', l: 'Smooth scroll' }, { icon: <Zap size={18} />, n: '1.0s', l: 'Avg load' }, { icon: <Code2 size={18} />, n: '100', l: 'Core Web Vitals' }, { icon: <BadgeCheck size={18} />, n: 'AA', l: 'Accessible' }]; return <section className="stackband"><div className="wrap"><Reveal><p className="stack-label">Inertia scroll, performance-first</p></Reveal><Reveal delay={.08}><div className="stack-row">{stack.map(s => <span key={s}>{s}</span>)}</div></Reveal><div className="tech-grid">{metrics.map((m, i) => <Reveal key={i} delay={i * .06}><div className="tech-metric">{m.icon}<div><b>{m.n}</b><span>{m.l}</span></div></div></Reveal>)}</div></div></section> }
const RESULTS = [{ n: '+195%', l: 'Time-on-page', tag: 'smooth depth holds attention' }, { n: '+22%', l: 'Conversion lift', tag: 'premium feel builds trust' }, { n: '50+', l: 'Parallax builds shipped', tag: 'immersive brands' }, { n: '0', l: 'Jank / dropped frames', tag: '60fps guarantee' }]
const Results = () => <section className="results" id="results"><div className="wrap"><Reveal><SplitWords text="Smooth is a feature." className="sec-title" /></Reveal><p className="sec-sub">Depth through speed — the difference between a template and a premium brand.</p><div className="results-grid">{RESULTS.map((r, i) => <Reveal key={i} delay={i * .08}><div className="result-card"><div className="result-n">{r.n}</div><div className="result-l">{r.l}</div><div className="result-tag">{r.tag}</div></div></Reveal>)}</div></div></section>
const SERVICES = [{ icon: '01', title: 'Immersive heroes', desc: 'Multi-layer hero depth that adds cinematic space before a word is read.', price: 'from €1,800', time: '1-2 wks' }, { icon: '02', title: 'Editorial scroll', desc: 'Sticky text + parallax scenes for storytelling that holds attention.', price: 'from €4,200', time: '3-4 wks' }, { icon: '03', title: 'Product showcases', desc: 'Layered product pages that feel dimensional and premium.', price: 'from €3,800', time: '3 wks' }, { icon: '04', title: 'Full smooth sites', desc: 'Complete React builds with inertia scroll throughout.', price: 'from €5,600', time: '4-5 wks' }]
const Services = () => <section className="services" id="services"><div className="wrap"><Reveal><SplitWords text="What we build." className="sec-title" /></Reveal><div className="svc-grid">{SERVICES.map((s, i) => <Reveal key={i} delay={i * .08}><motion.div className="service-card" whileHover={{ y: -8, transition: { type: 'spring', stiffness: 300 } }}><div className="num">{s.icon}</div><h3>{s.title}</h3><p>{s.desc}</p><div className="svc-meta"><span className="price">{s.price}</span><span className="time"><Clock size={13} /> {s.time}</span></div><a href="#contact" className="svc-link">Start this →</a></motion.div></Reveal>)}</div></div></section>
const PLANS = [{ name: 'Layer', price: '€1,800', for: 'Hero depth kit', feats: ['1 parallax hero', '2 revision rounds', 'Optimised for speed', '1-2 week delivery'] }, { name: 'Drift', price: '€5,600', for: 'Full smooth site', feats: ['Full parallax site', 'Sticky + editorial scenes', 'Contact / CTA', '3 revision rounds', 'Performance report', '30 days support'] }, { name: 'Signature', price: '€9,500', for: 'Award-level depth', feats: ['Everything in Drift', 'Custom 3D layers', 'Scroll-choreographed', '90 days support'] }]
const Pricing = () => { const [sel, setSel] = useState(1); return <section className="pricing" id="pricing"><div className="wrap"><Reveal><SplitWords text="Clear pricing, smooth delivery." className="sec-title" /></Reveal><div className="plan-grid">{PLANS.map((p, i) => <Reveal key={i} delay={i * .08}><motion.div className={`plan ${i === sel ? 'plan-feat' : ''}`} whileHover={{ y: -6 }} onClick={() => setSel(i)}>{i === sel && <span className="plan-pop">Most chosen</span>}<h3>{p.name}</h3><div className="plan-price">{p.price}</div><div className="plan-for">{p.for}</div><ul>{p.feats.map((f, k) => <li key={k}><Check size={15} /> {f}</li>)}</ul><motion.a href="#contact" className="plan-btn" whileHover={{ scale: 1.04 }}>Choose {p.name}</motion.a></motion.div></Reveal>)}</div><Reveal><div className="guarantee"><Shield size={18} /> Every site ships with a <b>written delivery date</b> and <b>30-day support</b>.</div></Reveal></div></section> }
const PROCESS = [{ n: '01', t: 'Map depth', d: 'We plan the layers that tell your story.', icon: '🗺️' }, { n: '02', t: 'Design', d: 'Direction + a scroll prototype you approve.', icon: '🎨' }, { n: '03', t: 'Build', d: 'Inertia scroll + parallax dev, sprint by sprint.', icon: '⚙️' }, { n: '04', t: 'Ship', d: 'Launch smooth, measure, refine.', icon: '🚀' }]
const Process = () => <section className="process" id="process"><div className="wrap"><Reveal><SplitWords text="Depth, layer by layer." className="sec-title" /></Reveal><div className="proc-grid">{PROCESS.map((p, i) => <Reveal key={i} delay={i * .08}><motion.div className="proc-step" whileHover={{ y: -6 }}><div className="proc-num">{p.n}<span>{p.icon}</span></div><h4>{p.t}</h4><p>{p.d}</p></motion.div></Reveal>)}</div></div></section>
const QUOTES = [{ q: "Drift made our site feel expensive. Time-on-page up 195%.", n: 'Nina K.', r: 'CMO, Prisma' }, { q: "The smooth scroll is what everyone notices first. It's flawless on mobile.", n: 'Tom B.', r: 'Founder, Fieldnote' }, { q: "Delivered a parallax showcase that holds 60fps on a mid-range phone. Impressive.", n: 'Iris V.', r: 'Product Lead, Lumen' }]
const Testimonials = () => <section className="quotes"><div className="wrap"><Reveal><SplitWords text="Clients who feel the depth." className="sec-title" /></Reveal><div className="quotes-grid">{QUOTES.map((q, i) => <Reveal key={i} delay={i * .08}><figure className="quote"><div className="stars">★★★★★</div><blockquote>{q.q}</blockquote><figcaption><b>{q.n}</b><span>{q.r}</span></figcaption></figure></Reveal>)}</div></div></section>
const CTA = () => { const [sent, setSent] = useState(false); return <section className="cta" id="contact"><div className="wrap cta-inner"><Reveal><SplitWords text="Make your site feel physical." className="sec-title" /></Reveal><p className="sec-sub">Tell us about your project — a motion plan and fixed quote within one business day.</p>{!sent ? <motion.form className="cta-form" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} onSubmit={(e) => { e.preventDefault(); setSent(true) }}><div className="form-row"><input required placeholder="Your name" aria-label="Your name" /><input required type="email" placeholder="Work email" aria-label="Work email" /></div><textarea rows="3" placeholder="Tell us about your site" aria-label="Project details" /><Magnetic><motion.button whileHover={{ scale: 1.05 }} className="btn-primary" type="submit" style={{ border: 'none', cursor: 'pointer' }}>Send project brief <ArrowUpRight size={16} style={{ verticalAlign: 'middle', marginLeft: 4 }} /></motion.button></Magnetic><p className="form-note"><Shield size={13} /> Free quote · no obligation · reply within 1 business day</p></motion.form> : <motion.div className="cta-done" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}><BadgeCheck size={44} /><h3>Brief received 🎉</h3><p>We'll reply within one business day.</p></motion.div>}<div className="cta-contact"><span>Prefer email?</span> <a href="mailto:hello@drift.design">hello@drift.design</a></div></div></section> }
const Footer = () => <footer className="site-footer"><div className="wrap foot-inner"><span>© 2026 Drift — inertia & parallax.</span><span><a href="#services">Services</a> · <a href="#pricing">Pricing</a> · <a href="mailto:hello@drift.design">hello@drift.design</a></span></div></footer>

export default function App() {
  useSmoothScroll()
  return (<><Header /><Hero /><Stack /><Results /><Services /><Pricing /><Process /><Testimonials /><CTA /><Footer /></>)
}
