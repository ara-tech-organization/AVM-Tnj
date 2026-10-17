import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import {
  Activity,
  Anchor,
  Armchair,
  ArrowRight,
  Building2,
  CalendarCheck,
  CalendarClock,
  Camera,
  ChevronDown,
  ChevronRight,
  Check,
  Circle,
  CircleAlert,
  CircleCheck,
  ClipboardList,
  Clock,
  Cpu,
  Crown,
  Droplets,
  Gem,
  GraduationCap,
  Grip,
  HeartPulse,
  Image,
  Layers,
  Loader,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  MoveHorizontal,
  Navigation,
  Phone,
  Quote,
  ScanLine,
  Scissors,
  Send,
  ShieldCheck,
  ShieldPlus,
  Smile,
  Sparkles,
  Star,
  Stethoscope,
  User,
  UserCheck,
  Users,
  Wallet,
  Wrench,
  X,
} from 'lucide-react'

// Explicit registry keeps the bundle small (no wildcard import of every icon).
const Icons = {
  Activity,
  Anchor,
  Armchair,
  ArrowRight,
  Building2,
  CalendarCheck,
  CalendarClock,
  Camera,
  ChevronDown,
  ChevronRight,
  Check,
  Circle,
  CircleAlert,
  CircleCheck,
  ClipboardList,
  Clock,
  Cpu,
  Crown,
  Droplets,
  Gem,
  GraduationCap,
  Grip,
  HeartPulse,
  Image,
  Layers,
  Loader,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  MoveHorizontal,
  Navigation,
  Phone,
  Quote,
  ScanLine,
  Scissors,
  Send,
  ShieldCheck,
  ShieldPlus,
  Smile,
  Sparkles,
  Star,
  Stethoscope,
  User,
  UserCheck,
  Users,
  Wallet,
  Wrench,
  X,
}

export function Icon({ name, size = 24, className = '' }) {
  const C = Icons[name] || Icons.Circle
  return <C size={size} strokeWidth={1.75} className={className} aria-hidden="true" />
}

export function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={ref} style={{ '--d': `${delay}ms` }} className={`reveal ${shown ? 'in' : ''} ${className}`}>
      {children}
    </div>
  )
}

export function SectionHead({ eyebrow, title, text, light = false, center = true }) {
  return (
    <Reveal className={`max-w-2xl ${center ? 'mx-auto text-center' : ''} mb-12`}>
      {eyebrow && (
        <p className={`text-xs font-semibold uppercase tracking-[.18em] mb-3 ${light ? 'text-brand-300' : 'text-accent'}`}>
          {eyebrow}
        </p>
      )}
      <h2 className={`text-[clamp(1.625rem,3vw,2.5rem)] font-semibold leading-tight ${light ? 'text-white' : 'text-brand-900'}`}>
        {title}
      </h2>
      {text && <p className={`mt-4 leading-relaxed ${light ? 'text-brand-200' : 'text-muted'}`}>{text}</p>}
    </Reveal>
  )
}

export function Btn({ variant = 'primary', className = '', children, ...p }) {
  const base =
    'relative overflow-hidden inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200 ease-out hover:scale-[1.02] active:scale-[.98] group cursor-pointer'
  const v = {
    primary: 'bg-brand-600 text-white hover:bg-brand-700 shadow-[0_10px_30px_-10px_rgba(67,59,157,.55)]',
    accent: 'bg-accent text-white hover:bg-accent-600 shadow-[0_10px_30px_-10px_rgba(237,28,36,.5)] shine',
    outline: 'border border-brand-200 text-brand-600 bg-white hover:bg-brand-50',
    whatsapp: 'bg-whatsapp text-white hover:brightness-95',
    light: 'bg-white text-brand-700 hover:bg-brand-50',
  }[variant]
  const Tag = p.href ? A : 'button'
  return (
    <Tag className={`${base} ${v} ${className}`} {...p}>
      {children}
    </Tag>
  )
}

// Shows a real photo when the file exists in /public/assets/images, otherwise a branded placeholder.
export function Photo({ src, alt, label, className = '', icon = 'Image' }) {
  const [failed, setFailed] = useState(false)
  if (!failed && src) {
    return (
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onError={() => setFailed(true)}
        className={`object-cover w-full h-full ${className}`}
      />
    )
  }
  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-brand-100 via-brand-50 to-white text-brand-400 ${className}`}
      role="img"
      aria-label={alt}
    >
      <Icon name={icon} size={32} />
      <span className="text-xs font-medium text-brand-500 px-3 text-center">{label}</span>
    </div>
  )
}

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

// Internal paths use the router (no full reload). Section anchors ("#book", "/thanjavur#contact")
// scroll smoothly without writing a #hash into the address bar; tel:, mailto: and external links stay plain.
export function A({ href = '', children, onClick, ...p }) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const base = import.meta.env.BASE_URL.replace(/\/$/, '')
  const norm = (s) => s.replace(/\/$/, '') || '/'

  const m = href.match(/^(\/[^#]*)?#(.+)$/)
  if (m) {
    const path = m[1]
    const id = m[2]
    const go = (e) => {
      onClick?.(e)
      if (e.defaultPrevented) return
      e.preventDefault()
      const here = norm(pathname.replace(new RegExp(`^${base}`), ''))
      if (!path || norm(path) === here) scrollToId(id)
      else navigate(path, { state: { scrollTo: id } })
    }
    return <a href={path ? base + href : href} onClick={go} {...p}>{children}</a>
  }
  if (href.startsWith('/')) return <Link to={href} onClick={onClick} {...p}>{children}</Link>
  return <a href={href} onClick={onClick} {...p}>{children}</a>
}
