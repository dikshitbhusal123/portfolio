import React from 'react';
import './Footer.css';

const NAV_LINKS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'certifications', label: 'Certs' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

export default function Footer() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer-glow" />
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">DB<span className="footer-dot" /></div>
            <p className="footer-tagline">
              Building intelligent systems and beautiful interfaces — one commit at a time.
            </p>
            <div className="footer-socials">
              <a href="https://github.com/dikshitbhusal" target="_blank" rel="noreferrer" className="footer-social" aria-label="GitHub">
                <i className="fab fa-github" />
              </a>
              <a href="https://linkedin.com/in/dikshitbhusal" target="_blank" rel="noreferrer" className="footer-social" aria-label="LinkedIn">
                <i className="fab fa-linkedin" />
              </a>
              <a href="https://leetcode.com/dikshitbhusal" target="_blank" rel="noreferrer" className="footer-social" aria-label="LeetCode">
                <i className="fas fa-code" />
              </a>
            </div>
          </div>

          <nav className="footer-nav">
            <h4 className="footer-nav-title">Quick Links</h4>
            <ul className="footer-nav-list">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <button className="footer-nav-link" onClick={() => scrollTo(link.id)}>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer-contact-col">
            <h4 className="footer-nav-title">Contact</h4>
            <ul className="footer-contact-list">
              <li>
                <i className="fas fa-envelope" />
                <span>dikshitbhusal@email.com</span>
              </li>
              <li>
                <i className="fas fa-map-marker-alt" />
                <span>Bengaluru, Karnataka</span>
              </li>
              <li>
                <i className="fas fa-circle" style={{ color: '#10b981', fontSize: '0.5rem' }} />
                <span style={{ color: '#10b981' }}>Available for Opportunities</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">
            © {new Date().getFullYear()} Dikshit Bhusal. All rights reserved.
          </p>
          <p className="footer-built">
            Built with <span className="footer-heart">♥</span> using{' '}
            <span className="gradient-text">React.js</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
