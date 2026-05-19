import React, { useEffect, useRef, useState } from 'react';
import { submitContactMessage } from '../api/portfolioApi';
import './Contact.css';

const PHONE = '+91 9108434206';
const PHONE_TEL = 'tel:+919108434206';

const CONTACT_INFO = [
  {
    icon: 'fas fa-envelope',
    label: 'Email',
    value: 'dikshitbhusal@email.com',
    href: 'mailto:dikshitbhusal@email.com',
    color: '#00d4ff',
  },
  {
    icon: 'fas fa-phone',
    label: 'Phone',
    value: PHONE,
    href: PHONE_TEL,
    color: '#7c3aed',
  },
  {
    icon: 'fas fa-map-marker-alt',
    label: 'Location',
    value: 'Bengaluru, Karnataka, India',
    href: 'https://maps.google.com/?q=Bengaluru',
    color: '#ec4899',
  },
];

export default function Contact() {
  const sectionRef = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible');
        });
      },
      { threshold: 0.15 }
    );
    const els = sectionRef.current?.querySelectorAll('.anim-reveal');
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      await submitContactMessage(form);
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message);
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="contact" ref={sectionRef}>
      <div className="container">
        <div className="section-header anim-reveal">
          <span className="section-label">Contact</span>
          <h2 className="section-title">Let's Build Something</h2>
          <p className="section-subtitle">
            Have an idea, opportunity, or just want to say hi? I'd love to hear from you.
          </p>
          <a href={PHONE_TEL} className="contact-phone-banner">
            <i className="fas fa-phone" />
            {PHONE}
          </a>
        </div>

        <div className="contact-grid">
          {/* Info */}
          <div className="contact-info anim-reveal">
            <div className="contact-info-inner">
              <h3 className="contact-info-title">Get in Touch</h3>
              <p className="contact-info-para">
                I'm currently open to new opportunities — internships, freelance projects,
                or full-time roles in ML/AI and frontend development. Let's talk!
              </p>

              <div className="contact-items">
                {CONTACT_INFO.map((item) => (
                  <a key={item.label} href={item.href} className="contact-item" target="_blank" rel="noreferrer">
                    <div className="contact-item-icon" style={{ background: `${item.color}15`, borderColor: `${item.color}30` }}>
                      <i className={item.icon} style={{ color: item.color }} />
                    </div>
                    <div>
                      <div className="contact-item-label">{item.label}</div>
                      <div className="contact-item-value">{item.value}</div>
                    </div>
                  </a>
                ))}
              </div>

              <div className="contact-socials">
                <a href="https://github.com/dikshitbhusal" target="_blank" rel="noreferrer" className="contact-social">
                  <i className="fab fa-github" />
                </a>
                <a href="https://linkedin.com/in/dikshitbhusal" target="_blank" rel="noreferrer" className="contact-social">
                  <i className="fab fa-linkedin" />
                </a>
                <a href="https://leetcode.com/dikshitbhusal" target="_blank" rel="noreferrer" className="contact-social">
                  <i className="fas fa-code" />
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="contact-form-wrap anim-reveal">
            <form className="contact-form glass-card" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-input"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea
                  name="message"
                  className="form-input form-textarea"
                  placeholder="Tell me about your project or opportunity..."
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </div>

              {errorMsg && <p className="form-error">{errorMsg}</p>}

              <button
                type="submit"
                className={`form-submit ${status === 'loading' ? 'form-submit--loading' : ''} ${status === 'success' ? 'form-submit--success' : ''} ${status === 'error' ? 'form-submit--error' : ''}`}
                disabled={status === 'loading'}
              >
                {status === 'idle' && <><i className="fas fa-paper-plane" /> Send Message</>}
                {status === 'loading' && <><i className="fas fa-spinner fa-spin" /> Sending...</>}
                {status === 'success' && <><i className="fas fa-check" /> Message Sent!</>}
                {status === 'error' && <><i className="fas fa-exclamation-circle" /> Try Again</>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
