import React, { useEffect, useRef } from 'react';
import './Skills.css';

const SKILL_CATEGORIES = [
  {
    title: 'Programming Languages',
    icon: 'fas fa-terminal',
    color: '#00d4ff',
    skills: [
      { name: 'Python', level: 90, icon: 'fab fa-python' },
      { name: 'Java', level: 75, icon: 'fab fa-java' },
      { name: 'C', level: 65, icon: 'fas fa-code' },
    ],
  },
  {
    title: 'Web Technologies',
    icon: 'fas fa-globe',
    color: '#7c3aed',
    skills: [
      { name: 'React.js', level: 85, icon: 'fab fa-react' },
      { name: 'JavaScript', level: 82, icon: 'fab fa-js' },
      { name: 'HTML5', level: 92, icon: 'fab fa-html5' },
      { name: 'CSS3', level: 88, icon: 'fab fa-css3-alt' },
    ],
  },
  {
    title: 'Databases',
    icon: 'fas fa-database',
    color: '#ec4899',
    skills: [
      { name: 'MySQL', level: 80, icon: 'fas fa-database' },
      { name: 'PostgreSQL', level: 72, icon: 'fas fa-server' },
    ],
  },
  {
    title: 'Tools & Platforms',
    icon: 'fas fa-tools',
    color: '#06b6d4',
    skills: [
      { name: 'Git & GitHub', level: 85, icon: 'fab fa-github' },
      { name: 'Jupyter', level: 88, icon: 'fas fa-book-open' },
      { name: 'Tableau', level: 72, icon: 'fas fa-chart-bar' },
      { name: 'VS Code', level: 92, icon: 'fas fa-edit' },
      { name: 'Excel', level: 78, icon: 'fas fa-file-excel' },
    ],
  },
  {
    title: 'Operating Systems',
    icon: 'fas fa-desktop',
    color: '#a855f7',
    skills: [
      { name: 'Linux', level: 78, icon: 'fab fa-linux' },
      { name: 'Windows', level: 90, icon: 'fab fa-windows' },
    ],
  },
  {
    title: 'ML & AI',
    icon: 'fas fa-brain',
    color: '#f59e0b',
    skills: [
      { name: 'TensorFlow', level: 75, icon: 'fas fa-network-wired' },
      { name: 'Scikit-Learn', level: 82, icon: 'fas fa-robot' },
      { name: 'OpenCV', level: 70, icon: 'fas fa-eye' },
      { name: 'Pandas / NumPy', level: 88, icon: 'fas fa-table' },
    ],
  },
];

function SkillCard({ category, index }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            const bars = e.target.querySelectorAll('.skill-bar-fill');
            bars.forEach((bar) => {
              bar.style.width = bar.dataset.level + '%';
            });
          }
        });
      },
      { threshold: 0.2 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="skill-card glass-card anim-reveal"
      ref={cardRef}
      style={{ '--card-color': category.color, transitionDelay: `${index * 0.1}s` }}
    >
      <div className="skill-card-header">
        <div className="skill-card-icon" style={{ background: `${category.color}18`, borderColor: `${category.color}30` }}>
          <i className={category.icon} style={{ color: category.color }} />
        </div>
        <h3 className="skill-card-title">{category.title}</h3>
      </div>

      <div className="skill-list">
        {category.skills.map((skill) => (
          <div key={skill.name} className="skill-item">
            <div className="skill-item-header">
              <div className="skill-item-name">
                <i className={skill.icon} style={{ color: category.color }} />
                <span>{skill.name}</span>
              </div>
              <span className="skill-percent">{skill.level}%</span>
            </div>
            <div className="skill-bar-track">
              <div
                className="skill-bar-fill"
                data-level={skill.level}
                style={{ '--bar-color': category.color, width: '0%' }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="skills">
      <div className="container">
        <div className="section-header anim-reveal">
          <span className="section-label">Skills</span>
          <h2 className="section-title">Technical Arsenal</h2>
          <p className="section-subtitle">
            Technologies and tools I use to craft intelligent systems and modern interfaces.
          </p>
        </div>

        <div className="skills-grid">
          {SKILL_CATEGORIES.map((cat, i) => (
            <SkillCard key={cat.title} category={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
