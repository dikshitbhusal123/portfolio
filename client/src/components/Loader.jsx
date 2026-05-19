import React, { useEffect, useState } from 'react';
import './Loader.css';

export default function Loader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(interval); return 100; }
        return p + Math.random() * 15;
      });
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loader">
      <div className="loader-inner">
        <div className="loader-logo">
          <span className="loader-initials">DB</span>
          <div className="loader-ring" />
          <div className="loader-ring loader-ring--2" />
        </div>
        <p className="loader-name">Dikshit Bhusal</p>
        <div className="loader-bar-track">
          <div className="loader-bar-fill" style={{ width: `${Math.min(progress, 100)}%` }} />
        </div>
        <p className="loader-status">
          {progress < 40 ? 'Initializing...' : progress < 75 ? 'Loading assets...' : 'Almost ready...'}
        </p>
      </div>
    </div>
  );
}
