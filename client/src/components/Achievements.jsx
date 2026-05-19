import React, { useEffect, useRef, useState } from 'react';
import { fetchAchievements } from '../api/portfolioApi';
import './Achievements.css';

const FALLBACK_ACHIEVEMENTS = [
  {
    icon: '🏛️',
    title: 'Indian Patent Application',
    subtitle: 'Versatile Power Hub',
    description:
      'Filed an Indian Patent for a Hologram Fan that displays images and videos using Persistence-of-Vision (POV) technology — a futuristic display innovation.',
    color: '#f59e0b',
    badge: 'Patent',
    featured: true,
  },
  {
    icon: '💻',
    title: 'NMIT CodeStorm Hackathon',
    subtitle: 'Competitive Coding',
    description:
      'Participated in the NMIT CodeStorm Hackathon, collaborating with a team to develop innovative solutions under time pressure.',
    color: '#00d4ff',
    badge: 'Hackathon',
    featured: false,
  },
  {
    icon: '🤝',
    title: 'NSS Activities',
    subtitle: 'National Service Scheme',
    description:
      'Active participant in National Service Scheme activities — contributing to social causes and community development initiatives.',
    color: '#7c3aed',
    badge: 'Social',
    featured: false,
  },
  {
    icon: '🎭',
    title: 'Cultural Participation',
    subtitle: 'Arts & Events',
    description:
      'Actively participated in various cultural events and festivals at the institute, contributing to the vibrant campus culture.',
    color: '#ec4899',
    badge: 'Cultural',
    featured: false,
  },
  {
    icon: '⚽',
    title: 'Sports Activities',
    subtitle: 'Athletics',
    description:
      'Engaged in sports activities at the college level, demonstrating teamwork, discipline, and competitive spirit.',
    color: '#10b981',
    badge: 'Sports',
    featured: false,
  },
];

export default function Achievements() {
  const sectionRef = useRef(null);
  const [achievements, setAchievements] = useState(FALLBACK_ACHIEVEMENTS);

  useEffect(() => {
    fetchAchievements()
      .then(setAchievements)
      .catch(() => setAchievements(FALLBACK_ACHIEVEMENTS));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible');
        });
      },
      { threshold: 0.15 }
    );
    const cards = sectionRef.current?.querySelectorAll('.ach-card');
    cards?.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, [achievements]);

  const featured = achievements.find((a) => a.featured) || achievements[0];
  const rest = achievements.filter((a) => a !== featured);

  return (
    <section id="achievements" className="achievements" ref={sectionRef}>
      <div className="container">
        <div className="section-header anim-reveal">
          <span className="section-label">Achievements</span>
          <h2 className="section-title">Beyond the Code</h2>
          <p className="section-subtitle">
            Patents, hackathons, and activities that shape me as a well-rounded engineer.
          </p>
        </div>

        {featured && (
          <div className="ach-patent-highlight anim-reveal">
            <div className="ach-patent-glow" />
            <div className="ach-patent-left">
              <div className="ach-patent-icon">{featured.icon}</div>
              <div className="ach-patent-badge">
                <i className="fas fa-certificate" /> {featured.badge || 'Featured'}
              </div>
            </div>
            <div className="ach-patent-right">
              <h3 className="ach-patent-title">{featured.subtitle || featured.title}</h3>
              <p className="ach-patent-desc">{featured.description}</p>
            </div>
          </div>
        )}

        <div className="ach-grid">
          {rest.map((item, i) => (
            <div
              key={item._id || item.title}
              className="ach-card glass-card"
              style={{ transitionDelay: `${i * 0.1}s`, '--ach-color': item.color }}
            >
              <div className="ach-card-icon">{item.icon}</div>
              <div className="ach-badge" style={{ borderColor: `${item.color}40`, color: item.color }}>
                {item.badge}
              </div>
              <h4 className="ach-card-title">{item.title}</h4>
              <p className="ach-card-subtitle" style={{ color: item.color }}>{item.subtitle}</p>
              <p className="ach-card-desc">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
