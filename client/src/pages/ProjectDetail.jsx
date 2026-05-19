import React, { useEffect, useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { getProjectBySlug, PROJECTS as FALLBACK_PROJECTS } from '../data/projects';
import { fetchProjectBySlug } from '../api/portfolioApi';
import './ProjectDetail.css';

export default function ProjectDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState(() => getProjectBySlug(slug));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchProjectBySlug(slug)
      .then(setProject)
      .catch(() => setProject(getProjectBySlug(slug) || FALLBACK_PROJECTS.find((p) => p.slug === slug)))
      .finally(() => setLoading(false));
  }, [slug]);

  if (!loading && !project) {
    return <Navigate to="/#projects" replace />;
  }

  if (loading || !project) {
    return (
      <div className="project-detail-page">
        <div className="container project-detail-container">
          <p style={{ color: 'var(--text-muted)', paddingTop: '120px' }}>Loading project…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="project-detail-page">
      <div className="project-detail-bg" style={{ background: project.gradient }} />
      <div className="container project-detail-container">
        <Link to="/#projects" className="project-detail-back">
          <i className="fas fa-arrow-left" /> Back to Projects
        </Link>

        <header
          className="project-detail-header"
          style={{ borderColor: `${project.borderColor}40` }}
        >
          <div className="project-detail-icon">{project.icon}</div>
          <div className="project-detail-meta">
            <div className="project-detail-tags">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="project-detail-tag"
                  style={{ borderColor: `${project.borderColor}50`, color: project.borderColor }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="project-detail-title">{project.title}</h1>
          </div>
        </header>

        <section className="project-detail-card">
          <h2 className="project-detail-section-title">About this project</h2>
          <p className="project-detail-description">{project.description}</p>

          <h3 className="project-detail-subtitle">Key highlights</h3>
          <ul className="project-detail-highlights">
            {project.highlights.map((highlight) => (
              <li key={highlight}>
                <i className="fas fa-check-circle" style={{ color: project.borderColor }} />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>

          <h3 className="project-detail-subtitle">Technologies used</h3>
          <div className="project-detail-tech">
            {project.tech.map((tech) => (
              <span key={tech} className="project-detail-tech-badge">
                {tech}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
