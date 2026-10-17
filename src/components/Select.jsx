import { useEffect, useId, useRef, useState } from 'react'
import { Icon } from './ui'

// Custom listbox dropdown (replaces the native <select>): keyboard and screen-reader friendly.
export default function Select({ label, value, onChange, options, placeholder = 'Select', error }) {
  const id = useId()
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(-1)
  const root = useRef(null)
  const list = useRef(null)

  useEffect(() => {
    if (!open) return
    const close = (e) => { if (root.current && !root.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [open])

  useEffect(() => {
    if (open && active >= 0) list.current?.children[active]?.scrollIntoView({ block: 'nearest' })
  }, [open, active])

  const toggle = () => {
    setActive(Math.max(options.indexOf(value), 0))
    setOpen((o) => !o)
  }
  const pick = (v) => {
    onChange(v)
    setOpen(false)
  }

  const onKeyDown = (e) => {
    if (e.key === 'Escape') return setOpen(false)
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault()
      if (!open) return toggle()
      const d = e.key === 'ArrowDown' ? 1 : -1
      setActive((a) => (a + d + options.length) % options.length)
    } else if ((e.key === 'Enter' || e.key === ' ') && open) {
      e.preventDefault()
      pick(options[active])
    }
  }

  return (
    <div ref={root} className="relative" onKeyDown={onKeyDown}>
      <span id={`${id}-label`} className="mb-1.5 block text-xs font-medium text-muted">{label}</span>
      <button
        type="button"
        onClick={toggle}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={`${id}-label`}
        aria-invalid={!!error}
        className={`flex w-full cursor-pointer items-center justify-between gap-2 rounded-xl border bg-white px-4 py-3 text-left text-sm transition-all duration-200 focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-100 ${open ? 'border-brand-500 ring-4 ring-brand-100' : 'border-line'} ${value ? 'text-ink' : 'text-muted/70'}`}
      >
        <span className="truncate">{value || placeholder}</span>
        <Icon name="ChevronDown" size={18} className={`shrink-0 text-muted transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <ul
          ref={list}
          role="listbox"
          aria-labelledby={`${id}-label`}
          className="absolute left-0 right-0 top-full z-50 mt-2 max-h-60 overflow-auto rounded-xl border border-line bg-white p-1.5 shadow-[0_18px_48px_-16px_rgba(40,36,89,.35)]"
        >
          {options.map((o, i) => (
            <li
              key={o}
              role="option"
              aria-selected={o === value}
              onMouseEnter={() => setActive(i)}
              onClick={() => pick(o)}
              className={`flex cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors duration-150 ${i === active ? 'bg-brand-50 text-brand-700' : 'text-ink'} ${o === value ? 'font-semibold' : ''}`}
            >
              {o}
              {o === value && <Icon name="Check" size={16} className="text-brand-600" />}
            </li>
          ))}
        </ul>
      )}
      {error && <p className="mt-1 flex items-center gap-1 text-xs text-accent"><Icon name="CircleAlert" size={14} />{error}</p>}
    </div>
  )
}
