import React, { useEffect, useRef } from 'react';
import './About.css';

const STATS = [
  { value: '8.5+', label: 'CGPA', icon: 'fas fa-graduation-cap' },
  { value: '5+', label: 'Projects', icon: 'fas fa-rocket' },
  { value: '5+', label: 'Certifications', icon: 'fas fa-certificate' },
  { value: '10+', label: 'Technologies', icon: 'fas fa-code' },
];

export default function About() {
  const sectionRef = useRef(null);

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

  return (
    <section id="about" className="about" ref={sectionRef}>
      <div className="container">
        <div className="section-header anim-reveal">
          <span className="section-label">About Me</span>
          <h2 className="section-title">The Story Behind the Code</h2>
          <p className="section-subtitle">
            Passionate engineer at the intersection of AI and beautiful interfaces.
          </p>
        </div>

        <div className="about-grid">
          <div className="about-visual anim-reveal">
            <div className="about-avatar-wrap">
              <div className="about-avatar">
                <span className="about-avatar-initials">DB</span>
                <div className="about-avatar-ring" />
                <div className="about-avatar-ring about-avatar-ring--2" />
              </div>
              <div className="about-tag about-tag--tl">
                <i className="fab fa-python" /> Python
              </div>
              <div className="about-tag about-tag--tr">
                <i className="fas fa-brain" /> ML/AI
              </div>
              <div className="about-tag about-tag--br">
                <i className="fab fa-react" /> React
              </div>
              <div className="about-tag about-tag--bl">
                <i className="fas fa-database" /> Data
              </div>
            </div>
          </div>

          <div className="about-text anim-reveal">
            <h3 className="about-heading">
              Building the future, one{' '}
              <span className="gradient-text">model</span> at a time.
            </h3>

            <p className="about-para">
              I'm Dikshit Bhusal, a BE Information Science student at{' '}
              <strong>CMR Institute of Technology, Bengaluru</strong>. My journey
              began with curiosity about how machines can learn and evolve —
              and that curiosity has led me deep into the world of Machine
              Learning, Neural Networks, and AI-driven solutions.
            </p>

            <p className="about-para">
              Alongside ML, I have a strong passion for crafting visually
              stunning, performant web applications. I believe great software
              is where intelligence meets aesthetics — functional, beautiful,
              and impactful.
            </p>

            <p className="about-para">
              I'm driven by data-driven decision-making, clean code architecture,
              and building tools that solve real-world problems. Whether it's
              predicting loan approvals or translating sign language in real-time,
              I love challenges that push boundaries.
            </p>

            <div className="about-interests">
              {['Machine Learning', 'Neural Networks', 'React.js', 'Data Science', 'Computer Vision', 'UI/UX'].map((item) => (
                <span key={item} className="about-interest-tag">{item}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="about-stats anim-reveal">
          {STATS.map((stat) => (
            <div key={stat.label} className="about-stat-card glass-card">
              <div className="about-stat-icon">
                <i className={stat.icon} />
              </div>
              <div className="about-stat-value">{stat.value}</div>
              <div className="about-stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
