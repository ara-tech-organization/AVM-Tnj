import { asset } from '../lib/asset'

export const clinic = {
  name: 'AVM Smiles',
  phone: '+91 8071404431',
  phoneHref: 'tel:+918071404431',
  // TODO: confirm the WhatsApp number with the client (the corporate site uses a placeholder)
  whatsappHref: 'https://wa.me/918071404431',
  email: 'accounts@arkglobalomniverse.com', // TODO: confirm this is the intended public email
  address:
    'Door No : 21A, Ward No : 7, Muthu Nagar, Vairam Nagar, Deva Nagar, Nanjikkottai, Thanjavur-613006.',
  shortAddress: 'Nanjikkottai, Thanjavur',
  hours: 'Monday - Saturday: 9:00 AM - 8:00 PM', // TODO: contact page says 7:00 PM, confirm
  mapsHref: 'https://maps.app.goo.gl/GvjHF4n1Yuvz9yi26',
  mapEmbed: 'https://www.google.com/maps?q=AVM+Smiles+Nanjikkottai+Thanjavur+613006&output=embed',
  social: { facebook: 'https://facebook.com', instagram: 'https://instagram.com', youtube: 'https://youtube.com' },
}

export const nav = [
  { label: 'Home', href: '/thanjavur' },
  { label: 'About Us', href: '/thanjavur/about' },
  { label: 'Services', href: '/thanjavur/services', dropdown: true },
  { label: 'Smile Gallery', href: '/thanjavur/gallery' },
  { label: 'Contact Us', href: '/thanjavur/contact' },
]

export const heroChips = [
  'Skilled Dental Experts',
  'Modern Digital Dentistry',
  'Comfortable, Pain-Free Care',
  'Customized Smile Plans',
  'Budget-Friendly Options',
]

export const services = [
  { icon: 'Scissors', title: 'Tooth Extraction', slug: 'tooth-extraction', image: asset('/assets/images/site/tooth-extraction.webp'), text: 'Gentle, pain-managed extractions performed by skilled dentists using modern instruments and safe anesthesia methods.' },
  { icon: 'Crown', title: 'Crowns & Bridges', slug: 'dental-crowns-and-bridges', image: asset('/assets/images/site/dental-crowns-and-bridges.jpg'), text: 'Restore missing or damaged teeth with long-lasting, natural-looking crowns and bridges built for everyday use.' },
  { icon: 'Smile', title: 'Dentures', slug: 'dental-dentures', image: asset('/assets/images/site/dental-dentures.png'), text: 'Comfortable fixed and removable denture options crafted to replace missing teeth and bring back your natural smile.' },
  { icon: 'Activity', title: 'Root Canal Treatment', slug: 'root-canal-treatment', image: asset('/assets/images/site/root-canal-treatment.jpg'), text: 'Relieve pain and save infected teeth through precise root canal therapy that preserves your natural tooth structure.' },
  { icon: 'Sparkles', title: 'Teeth Whitening', slug: 'teeth-whitening-treatment', image: asset('/assets/images/site/teeth-whitening-treatment.webp'), text: 'Expert whitening treatments that lift stubborn stains and brighten your smile by several noticeable shades.' },
  { icon: 'Droplets', title: 'Scaling & Polishing', slug: 'dental-scaling-polishing', image: asset('/assets/images/site/dental-scaling-polishing.jpg'), text: 'Thorough cleaning sessions that clear away plaque, tartar, and surface stains for healthier gums and teeth.' },
  { icon: 'Layers', title: 'Invisible Aligners', slug: 'invisible-aligners', image: asset('/assets/images/site/invisible-aligners.webp'), text: 'Discreet, removable aligners that gradually shift teeth into place without the look of metal braces.' },
  { icon: 'Grip', title: 'Braces', slug: 'invisible-braces', image: asset('/assets/images/site/invisible-braces.jpg'), text: 'Complete orthodontic solutions for kids, teens, and adults to fix misalignment and bite issues effectively.' },
  { icon: 'Gem', title: 'Veneers', slug: 'dental-veneer-treatment', image: asset('/assets/images/site/dental-veneer-treatment.jpg'), text: 'Personalized veneers crafted to refine the shape, shade, and overall look of your teeth.' },
  { icon: 'Anchor', title: 'Dental Implants', slug: 'dental-implants-treatment', image: asset('/assets/images/site/dental-implants-treatment.webp'), text: 'Durable tooth-replacement solutions that look, feel, and perform just like your natural teeth.' },
]

export const why = [
  { icon: 'Cpu', title: 'Modern Technology', text: 'Digital tools and updated treatment approaches ensure accurate, comfortable dental care.' },
  { icon: 'GraduationCap', title: 'Skilled Specialists', text: 'A team of dentists trained across multiple specialties with hands-on clinical experience.' },
  { icon: 'UserCheck', title: 'Personalized Care', text: "Treatment plans built around each patient's specific dental goals and needs." },
  { icon: 'ShieldCheck', title: 'Safety & Hygiene', text: 'Rigorous sterilization routines that meet international clinical safety standards.' },
  { icon: 'Wallet', title: 'Honest Pricing', text: 'Clear, upfront treatment costs with no hidden charges or surprises.' },
  { icon: 'Armchair', title: 'Welcoming Atmosphere', text: 'A relaxed, friendly clinic space designed to put every patient at ease.' },
]

export const steps = [
  { icon: 'Stethoscope', title: 'Consultation', text: 'Detailed dental checkup along with a discussion of your treatment options.' },
  { icon: 'ScanLine', title: 'Diagnosis', text: 'Digital evaluation used to plan your treatment with precision.' },
  { icon: 'ClipboardList', title: 'Personalized Treatment Plan', text: 'A custom care plan built around your specific dental needs.' },
  { icon: 'HeartPulse', title: 'Treatment', text: 'Skilled care delivered using current techniques and equipment.' },
  { icon: 'CalendarClock', title: 'Follow-Up Care', text: 'Continued guidance to help you maintain a healthy, lasting smile.' },
]

export const testimonials = [
  'From my first visit, AVM Smiles Thanjavur felt professional and caring. The dentist explained everything clearly and made sure I stayed comfortable throughout my treatment.',
  'I came in for a dental procedure and was genuinely impressed by how organized and courteous the team was. Their use of updated equipment made the whole visit reassuring.',
  'My experience at AVM Smiles Thanjavur was smooth and stress-free. The staff were friendly, the clinic was spotless, and every step of my treatment was explained beforehand.',
]

export const faqs = [
  ['What is the best dental clinic in Thanjavur?', 'AVM Smiles is a well-known and fast-growing dental clinic in Thanjavur, reputed for its highly qualified dentists, the latest technology, and personalized patient care for individuals and families.'],
  ['Do you provide dental implants?', 'Yes, we offer dental implants for single teeth, multiple teeth, and full mouth restoration, helping restore both function and natural appearance.'],
  ['Can I get invisible aligners here?', 'Yes, we provide custom invisible aligners as a discreet and comfortable alternative to traditional braces for straightening teeth.'],
  ['How frequently should I visit the dentist?', 'A dental checkup every six months is recommended to maintain oral health and catch potential issues before they become serious.'],
  ['Is teeth whitening a safe procedure?', 'Yes, our professional teeth whitening treatments are performed under expert supervision, ensuring safe and effective results for your smile.'],
  ['Do you handle dental emergencies?', 'Yes, we offer emergency dental care for tooth pain, infections, injuries, and broken teeth, helping ease discomfort and prevent complications quickly.'],
]

export const gallerySlots = [
  { label: 'Modern treatment room', src: asset('/assets/images/site/clinic-interior.jpg') },
  { label: 'Dental chair and equipment', src: asset('/assets/images/site/who-we-are.png') },
  { label: 'Our clinic', src: asset('/assets/images/site/clinic-cta.jpg') },
  { label: 'A higher standard of dental care', src: asset('/assets/images/site/higher-standard.jpg') },
  { label: 'Smiling patient', src: asset('/assets/images/site/hero-patient.jpg') },
  { label: 'Dental implants care', src: asset('/assets/images/site/dental-implants-treatment.webp') },
]

export const transformations = [
  { title: 'Complete Smile Transformation', before: asset('/assets/images/site/before-1.png'), after: asset('/assets/images/site/after-1.png') },
  { title: 'Smile Makeover', before: asset('/assets/images/site/before-2.png'), after: asset('/assets/images/site/after-2.png') },
  { title: 'Restored Confidence', before: asset('/assets/images/site/before-3.jpg'), after: asset('/assets/images/site/after-3.jpg') },
]
