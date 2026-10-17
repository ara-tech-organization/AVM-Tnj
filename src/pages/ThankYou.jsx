import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { Icon, Btn, Reveal } from '../components/ui'
import { clinic, services } from '../content/thanjavur'

export default function ThankYou() {
  const { state } = useLocation()
  const name = state?.name?.trim().split(' ')[0]

  useEffect(() => {
    const prev = document.title
    document.title = 'Thank You | AVM Smiles Thanjavur'
    return () => { document.title = prev }
  }, [])

  const next = [
    ['PhoneCall', 'We call you', 'Our team will call you shortly to confirm your appointment time.'],
    ['Stethoscope', 'You visit the clinic', 'Come in for a detailed checkup and a clear discussion of your options.'],
    ['Smile', 'Start your smile plan', 'Get a treatment plan built around your needs, with clear upfront costs.'],
  ]

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-white to-white">
      <div className="absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-brand-100/70 blur-3xl" aria-hidden="true" />
      <div className="relative mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:py-24">
        <span className="rise mx-auto grid h-20 w-20 place-items-center rounded-full bg-brand-600 text-white shadow-[0_18px_48px_-16px_rgba(67,59,157,.6)]">
          <Icon name="CircleCheck" size={44} />
        </span>
        <h1 className="rise mt-6 text-[clamp(2rem,4.5vw,3rem)] font-bold leading-tight text-brand-900" style={{ '--d': '100ms' }}>
          {name ? `Thank you, ${name}!` : 'Thank you!'}
        </h1>
        <p className="rise mx-auto mt-4 max-w-xl leading-relaxed text-muted" style={{ '--d': '200ms' }}>
          Your appointment request has been received. Our AVM Smiles Thanjavur team will contact you shortly to confirm your visit.
        </p>

        <div className="mt-12 grid gap-4 text-left sm:grid-cols-3">
          {next.map(([icon, title, text], i) => (
            <Reveal key={title} delay={i * 100}>
              <div className="h-full rounded-[20px] border border-line bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_48px_-16px_rgba(40,36,89,.3)]">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-50 text-brand-600"><Icon name={icon} size={22} /></span>
                <h2 className="mt-4 font-semibold text-brand-900">{title}</h2>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={150} className="mt-10 flex flex-wrap justify-center gap-3">
          <Btn variant="primary" href="/thanjavur"><Icon name="House" size={18} /> Back to Home</Btn>
          <Btn variant="outline" href={clinic.phoneHref}><Icon name="Phone" size={18} /> {clinic.phone}</Btn>
          <Btn variant="whatsapp" href={clinic.whatsappHref} target="_blank" rel="noreferrer"><Icon name="MessageCircle" size={18} /> WhatsApp</Btn>
        </Reveal>

        <Reveal delay={200} className="mt-14">
          <p className="text-sm font-semibold text-brand-900">While you wait, explore our treatments</p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {services.map((s) => (
              <Btn key={s.slug} variant="outline" href={`/thanjavur/${s.slug}`} className="!px-4 !py-2 text-xs">
                <Icon name={s.icon} size={16} /> {s.title}
              </Btn>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
