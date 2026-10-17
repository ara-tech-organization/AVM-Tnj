import { useState } from 'react'
import { Icon, Btn } from './ui'
import Select from './Select'
import { clinic, services } from '../content/thanjavur'

// Same endpoint and payload the corporate site uses: POST JSON, response { success, message }.
const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT || 'https://avmsmilesdental.com/api/email.php'
const SOURCE = 'Thanjavur Website Form'
const TREATMENTS = [...services.map((s) => s.title), 'General Consultation']

const field =
  'w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink placeholder:text-muted/70 transition-all duration-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-100 focus:outline-none'

export default function BookingForm({ id, treatment, setTreatment }) {
  const [form, setForm] = useState({ name: '', phone: '', date: '' })
  const [errors, setErrors] = useState({})
  const [done, setDone] = useState(false)
  const [busy, setBusy] = useState(false)

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    if (busy) return
    const er = {}
    if (form.name.trim().length < 2) er.name = 'Please enter your name'
    if (!/^(\+91|91|0)?[6-9]\d{9}$/.test(form.phone.replace(/[\s-]/g, ''))) er.phone = 'Enter a valid 10-digit mobile number'
    if (!form.date) er.date = 'Choose a preferred date'
    if (!treatment) er.treatment = 'Select a treatment'
    setErrors(er)
    if (Object.keys(er).length) return

    setBusy(true)
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.trim(),
          date: form.date,
          treatment,
          source: SOURCE,
        }),
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.message || 'Submission failed')
      setForm({ name: '', phone: '', date: '' })
      setDone(true)
    } catch {
      setErrors({ form: 'Something went wrong. Please try again or call us directly.' })
    } finally {
      setBusy(false)
    }
  }

  if (done) {
    return (
      <div role="status" className="rounded-3xl bg-white p-8 text-center shadow-[0_18px_48px_-16px_rgba(40,36,89,.35)]">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand-50 text-brand-600"><Icon name="CircleCheck" size={32} /></span>
        <h3 className="mt-4 text-xl font-semibold text-brand-900">Request received</h3>
        <p className="mt-2 text-sm text-muted">Thank you. Our team will contact you shortly to confirm your appointment.</p>
        <button onClick={() => setDone(false)} className="mt-5 cursor-pointer text-sm font-semibold text-brand-600 hover:underline">Book another</button>
      </div>
    )
  }

  return (
    <form id={id} onSubmit={submit} noValidate className="rounded-3xl border border-line bg-white p-6 shadow-[0_18px_48px_-16px_rgba(40,36,89,.35)] sm:p-8">
      <h3 className="flex items-center gap-2 text-lg font-semibold text-brand-900">
        <Icon name="CalendarCheck" className="text-accent" /> Schedule Your Appointment
      </h3>
      <div className="mt-5 grid gap-4">
        <div>
          <label htmlFor={`${id}-name`} className="mb-1.5 block text-xs font-medium text-muted">Name</label>
          <input id={`${id}-name`} className={field} placeholder="Your full name" value={form.name} onChange={set('name')} autoComplete="name" aria-invalid={!!errors.name} />
          {errors.name && <p className="mt-1 flex items-center gap-1 text-xs text-accent"><Icon name="CircleAlert" size={14} />{errors.name}</p>}
        </div>
        <div>
          <label htmlFor={`${id}-phone`} className="mb-1.5 block text-xs font-medium text-muted">Phone Number</label>
          <input id={`${id}-phone`} className={field} placeholder="10-digit mobile number" inputMode="tel" value={form.phone} onChange={set('phone')} autoComplete="tel" aria-invalid={!!errors.phone} />
          {errors.phone && <p className="mt-1 flex items-center gap-1 text-xs text-accent"><Icon name="CircleAlert" size={14} />{errors.phone}</p>}
        </div>
        <div>
          <label htmlFor={`${id}-date`} className="mb-1.5 block text-xs font-medium text-muted">Preferred Date</label>
          <input id={`${id}-date`} type="date" className={field} value={form.date} onChange={set('date')} min={new Date().toISOString().slice(0, 10)} aria-invalid={!!errors.date} />
          {errors.date && <p className="mt-1 flex items-center gap-1 text-xs text-accent"><Icon name="CircleAlert" size={14} />{errors.date}</p>}
        </div>
        <Select label="Treatment Required" placeholder="Select treatment" value={treatment} onChange={setTreatment} options={TREATMENTS} error={errors.treatment} />
        {errors.form && (
          <p role="alert" className="text-center text-xs text-accent">
            {errors.form} <a href={clinic.phoneHref} className="font-semibold underline">{clinic.phone}</a>
          </p>
        )}
        <Btn variant="accent" type="submit" disabled={busy} className="mt-1 w-full disabled:opacity-70">
          {busy ? <Icon name="Loader" className="animate-spin" size={18} /> : <Icon name="Send" size={18} />}
          {busy ? 'Sending' : 'Book Appointment'}
        </Btn>
      </div>
    </form>
  )
}
