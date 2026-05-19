import React, { useEffect, useRef, useState } from 'react';
import { fetchEducation } from '../api/portfolioApi';
import './Education.css';

const FALLBACK_TIMELINE = [
  {
    degree: 'BE – Information Science & Engineering',
    institution: 'CMR Institute of Technology',
    location: 'Bengaluru, Karnataka',
    period: '2022 – Present',
    status: 'Pursuing',
    desc: 'Specializing in Machine Learning, Data Structures, Database Systems, and Web Technologies. Active in technical clubs and hackathons.',
    icon: 'fas fa-graduation-cap',
    color: '#00d4ff',
    cgpa: '8.5+',
  },
  {
    degree: '12th – Science (PCM)',
    institution: 'Aroma Secondary College',
    location: 'Nepal',
    period: '2019 – 2021',
    status: 'Completed',
    desc: 'Studied Physics, Chemistry, and Mathematics with a strong foundation in analytical thinking and problem-solving.',
    icon: 'fas fa-school',
    color: '#7c3aed',
    cgpa: null,
  },
  {
    degree: '10th – Secondary Education',
    institution: 'Om Shanti Academy',
    location: 'Nepal',
    period: '2009 – 2019',
    status: 'Completed',
    desc: 'Completed foundational education with a balanced curriculum covering science, mathematics, and humanities.',
    icon: 'fas fa-book',
    color: '#ec4899',
    cgpa: null,
  },
];

const var_text_muted = '#5a5a80';

export default function Education() {
  const sectionRef = useRef(null);
  const [timeline, setTimeline] = useState(FALLBACK_TIMELINE);

  useEffect(() => {
    fetchEducation()
      .then(setTimeline)
      .catch(() => setTimeline(FALLBACK_TIMELINE));
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
    const items = sectionRef.current?.querySelectorAll('.edu-item');
    items?.forEach((it) => observer.observe(it));
    return () => observer.disconnect();
  }, [timeline]);

  return (
    <section id="education" className="education" ref={sectionRef}>
      <div className="container">
        <div className="section-header anim-reveal">
          <span className="section-label">Education</span>
          <h2 className="section-title">Academic Journey</h2>
          <p className="section-subtitle">
            The educational path that shaped my technical foundation.
          </p>
        </div>

        <div className="edu-timeline">
          <div className="edu-line" />
          {timeline.map((item, i) => (
            <div
              key={item._id || item.institution}
              className={`edu-item ${i % 2 === 0 ? 'edu-item--left' : 'edu-item--right'}`}
              style={{ transitionDelay: `${i * 0.2}s` }}
            >
              <div className="edu-dot" style={{ background: item.color, boxShadow: `0 0 20px ${item.color}` }} />
              <div className="edu-card glass-card" style={{ '--edu-color': item.color }}>
                <div className="edu-card-header">
                  <div className="edu-icon" style={{ background: `${item.color}18`, borderColor: `${item.color}30` }}>
                    <i className={item.icon} style={{ color: item.color }} />
                  </div>
                  <div className="edu-period-wrap">
                    <span className="edu-period">{item.period}</span>
                    <span className="edu-status" style={{ color: item.status === 'Pursuing' ? '#10b981' : var_text_muted }}>
                      {item.status === 'Pursuing' ? '● ' : '✓ '}{item.status}
                    </span>
                  </div>
                </div>
                <h3 className="edu-degree">{item.degree}</h3>
                <p className="edu-institution">
                  <i className="fas fa-university" /> {item.institution}
                </p>
                <p className="edu-location">
                  <i className="fas fa-map-marker-alt" style={{ color: item.color }} /> {item.location}
                </p>
                <p className="edu-desc">{item.desc}</p>
                {item.cgpa && (
                  <div className="edu-cgpa" style={{ borderColor: `${item.color}30`, background: `${item.color}10` }}>
                    <i className="fas fa-star" style={{ color: item.color }} />
                    <span>CGPA: <strong style={{ color: item.color }}>{item.cgpa}</strong></span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
