import { useEffect, useMemo, useState } from 'react'
import { Navigate } from 'react-router'
import { Icon, Btn, Reveal, A } from '../components/ui'
import BookingForm from '../components/BookingForm'
import { clinic, services } from '../content/thanjavur'
import pages from '../content/services.json'

// A heading (h3 or card) absorbs the paragraphs / lists that follow it, so each
// becomes one card: "Step 1" + its description, "Benefit" + its explanation, etc.
function group(items) {
  const out = []
  for (let i = 0; i < items.length; i++) {
    const it = items[i]
    if (it.t === 'steps') {
      it.items.forEach((s) => out.push({ t: 'group', title: s.title, sub: '', body: s.text ? [{ t: 'p', text: s.text }] : [] }))
    } else if (it.t === 'h3' || it.t === 'card') {
      const g = { t: 'group', title: it.t === 'h3' ? it.text : it.title, sub: '', body: [] }
      if (it.t === 'card') {
        // a card followed by more paragraphs uses its own text as a sub-title
        if (items[i + 1]?.t === 'p') g.sub = it.text
        else g.body.push({ t: 'p', text: it.text })
      }
      while (items[i + 1] && (items[i + 1].t === 'p' || items[i + 1].t === 'ul')) { g.body.push(items[++i]) }
      out.push(g)
    } else out.push(it)
  }
  return out
}

function setMeta(selector, attr, value) {
  const el = document.querySelector(selector)
  if (!el) return () => {}
  const prev = el.getAttribute(attr)
  el.setAttribute(attr, value)
  return () => el.setAttribute(attr, prev)
}

function useSeo(page) {
  useEffect(() => {
    if (!page) return
    const prevTitle = document.title
    document.title = page.metaTitle
    const undo = [
      setMeta('meta[name="description"]', 'content', page.metaDescription),
      setMeta('meta[name="keywords"]', 'content', page.metaKeywords),
      setMeta('meta[property="og:title"]', 'content', page.metaTitle),
      setMeta('meta[property="og:description"]', 'content', page.metaDescription),
      setMeta('meta[name="twitter:title"]', 'content', page.metaTitle),
      setMeta('link[rel="canonical"]', 'href', `https://avmsmilesdental.com/thanjavur/${page.slug}`),
    ]
    return () => {
      document.title = prevTitle
      undo.forEach((u) => u())
    }
  }, [page])
}

function Prose({ items }) {
  return (
    <div className="space-y-4">
      {items.map((it, i) => {
        if (it.t === 'p') return <p key={i} className="leading-relaxed text-muted">{it.text}</p>
        if (it.t === 'ul')
          return (
            <ul key={i} className="grid gap-3 sm:grid-cols-2">
              {it.items.map((x) => (
                <li key={x} className="flex gap-3 rounded-2xl border border-line bg-surface px-4 py-3 text-sm text-ink">
                  <Icon name="CircleCheck" size={20} className="mt-0.5 shrink-0 text-brand-600" /> <span>{x}</span>
                </li>
              ))}
            </ul>
          )
        return null
      })}
    </div>
  )
}

function Cards({ groups, numbered }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {groups.map((g, i) => (
        <Reveal key={g.title + i} delay={(i % 2) * 80}>
          <div className="group h-full rounded-[20px] border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_48px_-16px_rgba(40,36,89,.3)]">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-600 text-sm font-semibold transition-colors duration-300 group-hover:bg-brand-600 group-hover:text-white">
                {numbered ? i + 1 : <Icon name="Sparkles" size={20} />}
              </span>
              <div>
                <h3 className="font-semibold leading-snug text-brand-900">{g.title}</h3>
                {g.sub && <p className="text-xs font-medium text-accent">{g.sub}</p>}
              </div>
            </div>
            <div className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
              {g.body.map((b, k) =>
                b.t === 'p' ? <p key={k}>{b.text}</p> : (
                  <ul key={k} className="space-y-1.5">
                    {b.items.map((x) => <li key={x} className="flex gap-2"><Icon name="Check" size={16} className="mt-1 shrink-0 text-brand-600" />{x}</li>)}
                  </ul>
                ),
              )}
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  )
}

function Table({ rows }) {
  const [head, ...rest] = rows
  return (
    <div className="overflow-x-auto rounded-2xl border border-line">
      <table className="w-full min-w-[480px] text-left text-sm">
        <thead className="bg-brand-600 text-white">
          <tr>{head.map((h) => <th key={h} className="px-4 py-3 font-semibold">{h}</th>)}</tr>
        </thead>
        <tbody>
          {rest.map((r, i) => (
            <tr key={r[0]} className={i % 2 ? 'bg-surface' : 'bg-white'}>
              {r.map((c, k) => <td key={k} className={`px-4 py-3 ${k === 0 ? 'font-medium text-brand-900' : 'text-muted'}`}>{c}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Quotes({ items }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {items.map((q, i) => (
        <Reveal key={i} delay={(i % 2) * 80}>
          <figure className="h-full rounded-[20px] border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_48px_-16px_rgba(40,36,89,.3)]">
            <Icon name="Quote" size={28} className="text-brand-200" />
            <div className="mt-2 flex gap-1 text-amber-400" aria-label="5 out of 5 stars">
              {[0, 1, 2, 3, 4].map((s) => <Icon key={s} name="Star" size={16} className="fill-current" />)}
            </div>
            <blockquote className="mt-3 text-sm leading-relaxed text-ink">{q.text}</blockquote>
            {q.by && <figcaption className="mt-4 text-xs font-semibold text-brand-600">{q.by}</figcaption>}
          </figure>
        </Reveal>
      ))}
    </div>
  )
}

function Faqs({ items }) {
  const [open, setOpen] = useState(0)
  return (
    <div className="space-y-3">
      {items.map((f, i) => (
        <div key={f.q} className={`rounded-2xl border bg-white transition-colors duration-300 ${open === i ? 'border-brand-300' : 'border-line'}`}>
          <h3>
            <button className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-brand-900 sm:text-base" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
              {f.q}
              <Icon name="ChevronDown" size={20} className={`shrink-0 text-brand-600 transition-transform duration-300 ${open === i ? 'rotate-180' : ''}`} />
            </button>
          </h3>
          <div className={`faq-body ${open === i ? 'open' : ''}`}>
            <div><p className="px-5 pb-5 text-sm leading-relaxed text-muted">{f.a}</p></div>
          </div>
        </div>
      ))}
    </div>
  )
}

function Section({ s }) {
  const items = group(s.items)
  const kind = items[0]?.t
  const isProcess = /procedure|process|steps/i.test(s.title)
  return (
    <section className="scroll-mt-24">
      <Reveal>
        <h2 className="mb-5 text-[clamp(1.375rem,2.4vw,1.875rem)] font-semibold leading-tight text-brand-900">{s.title}</h2>
      </Reveal>
      {items.map((it, i) => {
        if (it.t === 'quote') return i === 0 ? <Quotes key="q" items={items.filter((x) => x.t === 'quote')} /> : null
        if (it.t === 'faq') return i === 0 ? <Faqs key="f" items={items.filter((x) => x.t === 'faq')} /> : null
        return null
      })}
      {kind !== 'quote' && kind !== 'faq' && (
        <div className="space-y-5">
          {(() => {
            // render runs of p/ul as prose, runs of groups as a card grid, tables on their own
            const nodes = []
            let run = []
            let gr = []
            const flush = () => {
              if (run.length) nodes.push(<Prose key={`p${nodes.length}`} items={run} />)
              if (gr.length) nodes.push(<Cards key={`g${nodes.length}`} groups={gr} numbered={isProcess} />)
              run = []; gr = []
            }
            items.forEach((it) => {
              if (it.t === 'group') { if (run.length) flush(); gr.push(it) }
              else if (it.t === 'table') { flush(); nodes.push(<Table key={`t${nodes.length}`} rows={it.rows} />) }
              else { if (gr.length) flush(); run.push(it) }
            })
            flush()
            return nodes
          })()}
        </div>
      )}
    </section>
  )
}

export default function ServicePage({ treatment, setTreatment, slug }) {
  const page = pages[slug]
  const svc = services.find((s) => s.slug === slug)

  useSeo(page)
  useEffect(() => { if (svc) setTreatment(svc.title) }, [svc, setTreatment])
  useEffect(() => { window.scrollTo(0, 0) }, [slug])

  const parts = useMemo(() => {
    if (!page) return null
    const [intro, ...rest] = page.sections
    const cta = rest.find((s) => /^Book Your/i.test(s.title))
    const main = rest.filter((s) => s !== cta)
    return { intro, cta, main }
  }, [page])

  if (!page || !svc) return <Navigate to="/thanjavur" replace />
  const { intro, cta, main } = parts

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-white to-white">
        <div className="absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-brand-100/70 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_.8fr] lg:py-16">
          <div>
            <nav aria-label="Breadcrumb" className="rise flex flex-wrap items-center gap-1.5 text-xs text-muted">
              <A href="/thanjavur" className="hover:text-brand-600">Home</A>
              <Icon name="ChevronRight" size={14} />
              <A href="/thanjavur#services" className="hover:text-brand-600">Services</A>
              <Icon name="ChevronRight" size={14} />
              <span className="font-medium text-brand-700">{svc.title}</span>
            </nav>
            <h1 className="rise mt-4 text-[clamp(2rem,4.2vw,3.25rem)] font-bold leading-[1.15] text-brand-900" style={{ '--d': '100ms' }}>{page.h1}</h1>
            <h2 className="rise mt-4 text-lg font-semibold text-brand-600" style={{ '--d': '180ms' }}>{intro.title}</h2>
            <div className="rise mt-3 max-w-2xl space-y-3 leading-relaxed text-muted" style={{ '--d': '260ms' }}>
              {intro.items.filter((x) => x.t === 'p').map((x, i) => <p key={i}>{x.text}</p>)}
            </div>
            <div className="rise mt-7 flex flex-wrap gap-3" style={{ '--d': '340ms' }}>
              <Btn variant="accent" href="#book"><Icon name="CalendarCheck" size={18} /> Book Your Appointment Today</Btn>
              <Btn variant="outline" href={clinic.phoneHref}><Icon name="Phone" size={18} /> Call Now</Btn>
            </div>
          </div>
          <div className="rise hidden lg:block" style={{ '--d': '300ms' }}>
            <div className="relative">
              <img src={svc.image} alt={`${svc.title} at AVM Smiles Thanjavur`} className="aspect-[4/3] w-full rounded-[28px] object-cover shadow-[0_18px_48px_-16px_rgba(40,36,89,.45)]" />
              <span className="floaty absolute -bottom-5 left-6 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-[0_18px_48px_-16px_rgba(40,36,89,.35)]">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-50 text-brand-600"><Icon name={svc.icon} /></span>
                <span className="text-sm font-semibold text-brand-900">{svc.title}</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_360px] lg:py-20">
        <div className="min-w-0 space-y-14">
          {main.map((s) => <Section key={s.title} s={s} />)}
        </div>
        <aside className="hidden lg:block">
          <div className="sticky top-28 space-y-5">
            <BookingForm id="aside-form" treatment={treatment} setTreatment={setTreatment} />
            <div className="rounded-2xl border border-line bg-surface p-5 text-sm">
              <p className="font-semibold text-brand-900">Prefer to talk?</p>
              <A href={clinic.phoneHref} className="mt-2 flex items-center gap-2 text-brand-600 hover:underline"><Icon name="Phone" size={16} /> {clinic.phone}</A>
              <p className="mt-2 flex items-center gap-2 text-muted"><Icon name="Clock" size={16} /> {clinic.hours}</p>
            </div>
          </div>
        </aside>
      </div>

      {cta && (
        <section id="book" className="relative scroll-mt-24 overflow-hidden bg-gradient-to-br from-brand-700 via-brand-600 to-brand-900 py-16 lg:py-24">
          <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2">
            <Reveal className="text-white">
              <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-semibold leading-tight">{cta.title}</h2>
              <div className="mt-4 space-y-3 leading-relaxed text-brand-100">
                {cta.items.filter((x) => x.t === 'p').map((x, i) => <p key={i}>{x.text}</p>)}
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <Btn variant="light" href={clinic.phoneHref}><Icon name="Phone" size={18} /> {clinic.phone}</Btn>
                <Btn variant="whatsapp" href={clinic.whatsappHref} target="_blank" rel="noreferrer"><Icon name="MessageCircle" size={18} /> WhatsApp</Btn>
              </div>
            </Reveal>
            <Reveal delay={120}><BookingForm id="cta-form" treatment={treatment} setTreatment={setTreatment} /></Reveal>
          </div>
        </section>
      )}

      <section className="bg-section py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal><h2 className="mb-8 text-center text-[clamp(1.5rem,3vw,2.25rem)] font-semibold text-brand-900">Explore Our Other Dental Services</h2></Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {services.filter((s) => s.slug !== slug).map((s, i) => (
              <Reveal key={s.slug} delay={(i % 5) * 60}>
                <A href={`/thanjavur/${s.slug}`} className="group flex h-full items-center gap-3 rounded-2xl border border-line bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_48px_-16px_rgba(40,36,89,.3)]">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-600 transition-colors duration-300 group-hover:bg-brand-600 group-hover:text-white"><Icon name={s.icon} size={22} /></span>
                  <span className="text-sm font-semibold text-brand-900">{s.title}</span>
                </A>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
