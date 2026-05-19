import React, { useEffect, useState } from 'react';
import './Hero.css';

const TYPED_WORDS = ['Machine Learning Developer', 'Frontend Developer', 'Problem Solver', 'AI Enthusiast'];

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const word = TYPED_WORDS[wordIndex];
    let timer;

    if (!deleting && charIndex < word.length) {
      timer = setTimeout(() => {
        setDisplayed(word.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
      }, 80);
    } else if (!deleting && charIndex === word.length) {
      timer = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && charIndex > 0) {
      timer = setTimeout(() => {
        setDisplayed(word.slice(0, charIndex - 1));
        setCharIndex((c) => c - 1);
      }, 40);
    } else if (deleting && charIndex === 0) {
      setDeleting(false);
      setWordIndex((i) => (i + 1) % TYPED_WORDS.length);
    }

    return () => clearTimeout(timer);
  }, [charIndex, deleting, wordIndex]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero">
      {/* Background glows */}
      <div className="hero-glow hero-glow--blue" />
      <div className="hero-glow hero-glow--purple" />
      <div className="hero-glow hero-glow--pink" />

      {/* Grid overlay */}
      <div className="hero-grid" />

      <div className="hero-content container">
        <div className="hero-badge">
          <span className="hero-badge-dot" />
          <span>Available for opportunities</span>
        </div>

        <h1 className="hero-name">
          <span className="hero-name-hi">Hi, I'm </span>
          <span className="hero-name-main">Dikshit Bhusal</span>
        </h1>

        <div className="hero-typed-wrapper">
          <span className="hero-typed-prefix">I am a </span>
          <span className="hero-typed-text">{displayed}</span>
          <span className="hero-cursor">|</span>
        </div>

        <p className="hero-intro">
          Aspiring Machine Learning Developer passionate about building
          intelligent systems and modern web applications. Turning data into
          decisions and ideas into reality.
        </p>

        <div className="hero-cta">
          <button className="hero-btn hero-btn--primary" onClick={() => scrollTo('projects')}>
            <i className="fas fa-rocket" /> View Projects
          </button>
          <a href="/resume.pdf" download className="hero-btn hero-btn--secondary">
            <i className="fas fa-download" /> Download Resume
          </a>
          <button className="hero-btn hero-btn--outline" onClick={() => scrollTo('contact')}>
            <i className="fas fa-paper-plane" /> Contact Me
          </button>
        </div>

        <div className="hero-socials">

  <a
    href="https://github.com/dikshitbhusal123"
    target="_blank"
    rel="noreferrer"
    className="hero-social"
    aria-label="GitHub"
  >
    <i className="fab fa-github" />
  </a>

  <a
    href="https://www.linkedin.com/in/dikshit-bhusal-968672328/"
    target="_blank"
    rel="noreferrer"
    className="hero-social"
    aria-label="LinkedIn"
  >
    <i className="fab fa-linkedin" />
  </a>

  <a
    href="https://leetcode.com/u/nIuBwzL4b5/"
    target="_blank"
    rel="noreferrer"
    className="hero-social"
    aria-label="LeetCode"
  >
    <i className="fas fa-code" />
  </a>

</div>

        <div className="hero-scroll-hint" onClick={() => scrollTo('about')}>
          <div className="hero-scroll-mouse">
            <div className="hero-scroll-wheel" />
          </div>
          <span>Scroll Down</span>
        </div>
      </div>

      {/* Floating code decoration */}
      <div className="hero-code-deco">
        <pre className="hero-code-block">
{`import ML from 'intelligence'
import Web from 'creativity'

class DikshitBhusal {
  skills = [ML, Web, 'Python', 
    'React', 'TensorFlow']
  
  build(idea) {
    return this.skills
      .reduce(solve, idea)
  }
}`}
        </pre>
      </div>
    </section>
  );
}
