import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { PROJECTS as FALLBACK_PROJECTS } from '../data/projects';
import { fetchProjects } from '../api/portfolioApi';
import './Projects.css';

const GITHUB_REPO_BY_SLUG = {
  'loan-approval-prediction-system':
    'https://github.com/dikshitbhusal123/Car-Loan-Prediction-USING-MACHINE-LEARNING',
  'handsign-detection-translation-system':
    'https://github.com/dikshitbhusal123/sign-language/tree/main/ml',
  'crm-frontend-development': 'https://github.com/Aryan0883/ConnectSphere',
};

function getProjectGithubUrl(project) {
  return project.githubUrl || GITHUB_REPO_BY_SLUG[project.slug] || '#';
}

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible');
        });
      },
      { threshold: 0.15 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="project-card"
      ref={cardRef}
      style={{ transitionDelay: `${index * 0.15}s` }}
    >
      <div className="project-banner" style={{ background: project.gradient, borderBottom: `1px solid ${project.borderColor}22` }}>
        <div className="project-icon">{project.icon}</div>
        <div className="project-tags">
          {(project.tags || []).map((t) => (
            <span key={t} className="project-tag" style={{ borderColor: `${project.borderColor}50`, color: project.borderColor }}>
              {t}
            </span>
          ))}
        </div>
        <div className="project-banner-glow" style={{ background: `radial-gradient(circle, ${project.borderColor}15, transparent 70%)` }} />
      </div>

      <div className="project-body">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-desc">{project.description}</p>

        <div className="project-highlights">
          {(project.highlights || []).map((h) => (
            <div key={h} className="project-highlight">
              <i className="fas fa-check-circle" style={{ color: project.borderColor }} />
              <span>{h}</span>
            </div>
          ))}
        </div>

        <div className="project-tech">
          {(project.tech || []).map((t) => (
            <span key={t} className="project-tech-badge">{t}</span>
          ))}
        </div>

        <div className="project-actions">
          <a
            href={getProjectGithubUrl(project)}
            className="project-btn project-btn--github"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fab fa-github" /> GitHub
          </a>
          <Link
            to={`/projects/${project.slug}`}
            className="project-btn project-btn--view"
            style={{ '--btn-color': project.borderColor }}
          >
            <i className="fas fa-mouse-pointer" /> View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [projects, setProjects] = useState(FALLBACK_PROJECTS);

  useEffect(() => {
    fetchProjects()
      .then(setProjects)
      .catch(() => setProjects(FALLBACK_PROJECTS));
  }, []);

  return (
    <section id="projects" className="projects">
      <div className="container">
        <div className="section-header anim-reveal">
          <span className="section-label">Projects</span>
          <h2 className="section-title">Featured Work</h2>
          <p className="section-subtitle">
            A selection of projects that demonstrate my passion for ML, AI, and modern web development.
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug || project._id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
