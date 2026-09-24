import { useState } from 'react';
import { Check, Copy, Github, Instagram, Linkedin, Loader2, Mail, MapPin, Send } from 'lucide-react';
import { profile } from '@/data/site';

// Messages are delivered by a small serverless function that emails Dhananjay (see labbench-hub/api/contact.js).
const CONTACT_API = 'https://labbench-hub.vercel.app/api/contact';

type Fields = { name: string; email: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

const validate = (f: Fields): Errors => {
  const e: Errors = {};
  if (!f.name.trim()) e.name = 'Please enter your name.';
  if (!f.email.trim()) e.email = 'Please enter your email.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = 'That email address does not look right.';
  if (f.message.trim().length < 10) e.message = 'Please write at least 10 characters.';
  else if (f.message.length > 2000) e.message = 'Please keep it under 2000 characters.';
  return e;
};

const ContactSection = () => {
  const [fields, setFields] = useState<Fields>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle');
  const [trap, setTrap] = useState(''); // honeypot: real visitors never fill this in
  const [copied, setCopied] = useState(false);

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields((f) => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors((x) => ({ ...x, [k]: undefined }));
  };

  const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(`Portfolio message from ${fields.name || 'a visitor'}`)}&body=${encodeURIComponent(`${fields.message}\n\nFrom: ${fields.name} <${fields.email}>`)}`;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const v = validate(fields);
    setErrors(v);
    if (Object.keys(v).length) return;
    setStatus('sending');
    try {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 12000);
      const res = await fetch(CONTACT_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...fields, website: trap }),
        signal: ctrl.signal,
      });
      clearTimeout(timer);
      setStatus(res.ok ? 'sent' : 'failed');
    } catch {
      setStatus('failed');
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.prompt('Copy this address', profile.email);
    }
  };

  return (
    <section id="contact" className="section">
      <div className="wrap">
        <div data-reveal>
          <p className="eyebrow">Contact</p>
          <h2 className="h2">Let us build something.</h2>
          <p className="lead">Open to collaborations, engineering projects and game development work. Send a message and I will reply by email.</p>
        </div>

        <div className="contact-grid">
          <div className="card contact-card" data-reveal>
            <div className="contact-row">
              <span className="ico"><Mail size={18} /></span>
              <div className="min-w-0 flex-1">
                <small>Email</small>
                <a href={`mailto:${profile.email}`} className="break-all hover:underline">{profile.email}</a>
              </div>
              <button type="button" className="icon-btn" onClick={copyEmail} aria-label="Copy email address">
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>
            <div className="contact-row">
              <span className="ico"><MapPin size={18} /></span>
              <div>
                <small>Based in</small>
                <p>{profile.location}</p>
              </div>
            </div>
            <div className="hero-links" style={{ marginTop: '1.2rem' }}>
              <a className="icon-btn" href={profile.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github size={18} /></a>
              <a className="icon-btn" href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={18} /></a>
              <a className="icon-btn" href={profile.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram size={18} /></a>
            </div>
          </div>

          <div className="card contact-card" data-reveal>
            {status === 'sent' ? (
              <div className="ok-box" role="status">
                <Check className="mx-auto mb-2 text-[color:var(--green)]" size={30} />
                <h3 className="text-lg font-bold">Message sent</h3>
                <p className="mt-1 text-sm" style={{ color: 'var(--muted)' }}>Thank you. Dhananjay will reply to {fields.email}.</p>
                <button
                  type="button"
                  className="btn btn-ghost btn-sm mt-4"
                  onClick={() => { setFields({ name: '', email: '', message: '' }); setStatus('idle'); }}
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                <label className="field">
                  <span>Your name</span>
                  <input className={`input${errors.name ? ' bad' : ''}`} value={fields.name} onChange={set('name')} autoComplete="name" maxLength={80} />
                  {errors.name && <p className="err">{errors.name}</p>}
                </label>
                <label className="field">
                  <span>Your email</span>
                  <input className={`input${errors.email ? ' bad' : ''}`} type="email" value={fields.email} onChange={set('email')} autoComplete="email" maxLength={120} />
                  {errors.email && <p className="err">{errors.email}</p>}
                </label>
                <label className="field">
                  <span>Message</span>
                  <textarea className={`input${errors.message ? ' bad' : ''}`} rows={5} value={fields.message} onChange={set('message')} maxLength={2000} />
                  {errors.message && <p className="err">{errors.message}</p>}
                </label>
                <div className="hp" aria-hidden="true">
                  <label>Website<input tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} /></label>
                </div>
                <button className="btn btn-primary mt-5 w-full" type="submit" disabled={status === 'sending'}>
                  {status === 'sending' ? <><Loader2 className="animate-spin" size={16} /> Sending…</> : <><Send size={16} /> Send message</>}
                </button>
                {status === 'failed' && (
                  <div className="fail-box" role="alert">
                    Sorry, that did not go through. Nothing was lost: <a href={mailto}>open it in your email app</a> instead, or write to {profile.email}.
                  </div>
                )}
                <p className="form-note">Your message is emailed to Dhananjay and nothing else is stored.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
