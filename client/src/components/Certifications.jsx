import React, { useEffect, useRef, useState } from 'react';
import { fetchCertifications } from '../api/portfolioApi';
import './Certifications.css';

const FALLBACK_CERTS = [
  { title: 'Python Programming', issuer: 'Coursera / Udemy', icon: 'fab fa-python', color: '#3b82f6', gradient: 'linear-gradient(135deg, #3b82f622, #1d4ed822)', year: '2023' },
  { title: 'Linux for Beginners', issuer: 'Linux Foundation', icon: 'fab fa-linux', color: '#f59e0b', gradient: 'linear-gradient(135deg, #f59e0b22, #d9770622)', year: '2023' },
  { title: 'Java Swing GUI Toolkit', issuer: 'Udemy', icon: 'fab fa-java', color: '#ef4444', gradient: 'linear-gradient(135deg, #ef444422, #b91c1c22)', year: '2023' },
  { title: 'HTML Introduction', issuer: 'freeCodeCamp', icon: 'fab fa-html5', color: '#f97316', gradient: 'linear-gradient(135deg, #f9731622, #c2410c22)', year: '2022' },
  { title: 'SQL Concepts', issuer: 'Coursera', icon: 'fas fa-database', color: '#10b981', gradient: 'linear-gradient(135deg, #10b98122, #05966922)', year: '2023' },
];

export default function Certifications() {
  const sectionRef = useRef(null);
  const [certs, setCerts] = useState(FALLBACK_CERTS);

  useEffect(() => {
    fetchCertifications()
      .then(setCerts)
      .catch(() => setCerts(FALLBACK_CERTS));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible');
        });
      },
      { threshold: 0.2 }
    );
    const cards = sectionRef.current?.querySelectorAll('.cert-card');
    cards?.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, [certs]);

  return (
    <section id="certifications" className="certifications" ref={sectionRef}>
      <div className="container">
        <div className="section-header anim-reveal">
          <span className="section-label">Certifications</span>
          <h2 className="section-title">Verified Skills</h2>
          <p className="section-subtitle">
            Certifications that validate my technical expertise across multiple domains.
          </p>
        </div>

        <div className="certs-grid">
          {certs.map((cert, i) => (
            <div
              key={cert._id || cert.title}
              className="cert-card glass-card"
              style={{ transitionDelay: `${i * 0.1}s`, '--cert-color': cert.color }}
            >
              <div className="cert-banner" style={{ background: cert.gradient }}>
                <div className="cert-banner-icon" style={{ background: `${cert.color}20`, borderColor: `${cert.color}30` }}>
                  <i className={cert.icon} style={{ color: cert.color }} />
                </div>
                <div className="cert-verified">
                  <i className="fas fa-shield-check" /> Verified
                </div>
              </div>
              <div className="cert-body">
                <h4 className="cert-title">{cert.title}</h4>
                <div className="cert-meta">
                  <span className="cert-issuer">
                    <i className="fas fa-building" /> {cert.issuer}
                  </span>
                  <span className="cert-year" style={{ color: cert.color }}>
                    <i className="fas fa-calendar" /> {cert.year}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
