import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  login,
  signup,
  setToken,
  setUsername,
  getUsername,
  clearSession,
  isLoggedIn,
  fetchProjects,
  fetchEducation,
  fetchCertifications,
  fetchAchievements,
  createItem,
  updateItem,
  deleteItem,
} from '../api/portfolioApi';
import './Admin.css';
import { trim, splitCsv, slugify, validateFields } from '../utils/adminFormHelpers';

const SECTIONS = {
  projects: {
    label: 'Projects',
    fields: [
      { key: 'title', label: 'Title', required: true },
      { key: 'slug', label: 'Slug (URL)', placeholder: 'auto-generated from title if empty' },
      { key: 'description', label: 'Description', type: 'textarea', full: true, required: true },
      { key: 'icon', label: 'Icon (emoji)', placeholder: '🚀' },
      { key: 'borderColor', label: 'Accent color', placeholder: '#00d4ff' },
      { key: 'gradient', label: 'Banner gradient', full: true, placeholder: 'linear-gradient(135deg, #00d4ff22, #7c3aed22)' },
      { key: 'tech', label: 'Tech (comma separated)', full: true, placeholder: 'React, Node.js' },
      { key: 'tags', label: 'Tags (comma separated)', full: true },
      { key: 'highlights', label: 'Highlights (comma separated)', full: true },
      { key: 'order', label: 'Order', type: 'number', placeholder: '0' },
    ],
    listTitle: (item) => item.title,
    listSub: (item) => item.slug,
    parse: (form) => ({
      title: trim(form.title),
      slug: trim(form.slug) || slugify(form.title),
      description: trim(form.description),
      icon: trim(form.icon) || '📁',
      borderColor: trim(form.borderColor) || '#00d4ff',
      gradient: trim(form.gradient) || 'linear-gradient(135deg, #00d4ff22, #7c3aed22)',
      tech: splitCsv(form.tech),
      tags: splitCsv(form.tags),
      highlights: splitCsv(form.highlights),
      order: Number(form.order) || 0,
    }),
    stringify: (item) => ({
      title: item.title || '',
      slug: item.slug || '',
      description: item.description || '',
      icon: item.icon || '',
      borderColor: item.borderColor || '',
      gradient: item.gradient || '',
      tech: (item.tech || []).join(', '),
      tags: (item.tags || []).join(', '),
      highlights: (item.highlights || []).join(', '),
      order: item.order ?? 0,
    }),
  },
  education: {
    label: 'Education',
    fields: [
      { key: 'degree', label: 'Degree', required: true },
      { key: 'institution', label: 'Institution', required: true },
      { key: 'location', label: 'Location', required: true },
      { key: 'period', label: 'Period', placeholder: '2022 – Present', required: true },
      { key: 'status', label: 'Status', placeholder: 'Pursuing', required: true },
      { key: 'desc', label: 'Description', type: 'textarea', full: true, required: true },
      { key: 'icon', label: 'Icon class', placeholder: 'fas fa-graduation-cap' },
      { key: 'color', label: 'Color', placeholder: '#00d4ff' },
      { key: 'cgpa', label: 'CGPA (optional)' },
      { key: 'order', label: 'Order', type: 'number' },
    ],
    listTitle: (item) => item.degree,
    listSub: (item) => item.institution,
    parse: (form) => ({
      degree: trim(form.degree),
      institution: trim(form.institution),
      location: trim(form.location),
      period: trim(form.period),
      status: trim(form.status),
      desc: trim(form.desc),
      icon: trim(form.icon) || 'fas fa-graduation-cap',
      color: trim(form.color) || '#00d4ff',
      cgpa: trim(form.cgpa) || null,
      order: Number(form.order) || 0,
    }),
    stringify: (item) => ({
      degree: item.degree || '',
      institution: item.institution || '',
      location: item.location || '',
      period: item.period || '',
      status: item.status || '',
      desc: item.desc || '',
      icon: item.icon || '',
      color: item.color || '',
      cgpa: item.cgpa || '',
      order: item.order ?? 0,
    }),
  },
  certifications: {
    label: 'Certifications',
    fields: [
      { key: 'title', label: 'Certificate title', required: true },
      { key: 'issuer', label: 'Issuer / Organization', required: true },
      { key: 'year', label: 'Year', placeholder: '2024', required: true },
      { key: 'icon', label: 'Icon class', placeholder: 'fab fa-python' },
      { key: 'color', label: 'Color', placeholder: '#00d4ff' },
      { key: 'gradient', label: 'Gradient', full: true },
      { key: 'order', label: 'Order', type: 'number' },
    ],
    listTitle: (item) => item.title,
    listSub: (item) => item.issuer,
    parse: (form) => ({
      title: trim(form.title),
      issuer: trim(form.issuer),
      year: trim(form.year),
      icon: trim(form.icon) || 'fas fa-certificate',
      color: trim(form.color) || '#00d4ff',
      gradient: trim(form.gradient) || 'linear-gradient(135deg, #00d4ff22, #7c3aed22)',
      order: Number(form.order) || 0,
    }),
    stringify: (item) => ({
      title: item.title || '',
      issuer: item.issuer || '',
      year: item.year || '',
      icon: item.icon || '',
      color: item.color || '',
      gradient: item.gradient || '',
      order: item.order ?? 0,
    }),
  },
  achievements: {
    label: 'Achievements',
    fields: [
      { key: 'title', label: 'Title', required: true },
      { key: 'subtitle', label: 'Subtitle', required: true },
      { key: 'description', label: 'Description', type: 'textarea', full: true, required: true },
      { key: 'icon', label: 'Icon (emoji)' },
      { key: 'badge', label: 'Badge label' },
      { key: 'color', label: 'Color' },
      { key: 'featured', label: 'Show as featured highlight', type: 'checkbox' },
      { key: 'order', label: 'Order', type: 'number' },
    ],
    listTitle: (item) => item.title,
    listSub: (item) => item.subtitle,
    parse: (form) => ({
      title: trim(form.title),
      subtitle: trim(form.subtitle),
      description: trim(form.description),
      icon: trim(form.icon) || '🏆',
      badge: trim(form.badge) || 'Achievement',
      color: trim(form.color) || '#00d4ff',
      featured: Boolean(form.featured),
      order: Number(form.order) || 0,
    }),
    stringify: (item) => ({
      title: item.title || '',
      subtitle: item.subtitle || '',
      description: item.description || '',
      icon: item.icon || '',
      badge: item.badge || '',
      color: item.color || '',
      featured: Boolean(item.featured),
      order: item.order ?? 0,
    }),
  },
};

const FETCHERS = {
  projects: fetchProjects,
  education: fetchEducation,
  certifications: fetchCertifications,
  achievements: fetchAchievements,
};

function emptyForm(section) {
  const base = {};
  SECTIONS[section].fields.forEach((f) => {
    base[f.key] = f.type === 'checkbox' ? false : '';
  });
  return base;
}

export default function Admin() {
  const [authed, setAuthed] = useState(isLoggedIn());
  const [authMode, setAuthMode] = useState('login');
  const [username, setUsernameInput] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [adminName, setAdminName] = useState(getUsername() || '');
  const [tab, setTab] = useState('projects');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm('projects'));

  const section = SECTIONS[tab];

  const loadItems = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await FETCHERS[tab]();
      setItems(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authed) loadItems();
  }, [authed, tab]);

  const completeAuth = (token, name) => {
    setToken(token);
    setUsername(name);
    setAdminName(name);
    setAuthed(true);
    setUsernameInput('');
    setPassword('');
    setConfirmPassword('');
    setLoginError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    try {
      const data = await login(username, password);
      completeAuth(data.token, data.username);
    } catch (err) {
      setLoginError(err.message);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoginError('');

    if (password !== confirmPassword) {
      setLoginError('Passwords do not match');
      return;
    }

    try {
      const data = await signup(username, password);
      completeAuth(data.token, data.username);
    } catch (err) {
      setLoginError(err.message);
    }
  };

  const handleLogout = () => {
    clearSession();
    setAuthed(false);
    setAdminName('');
    setEditingId(null);
    setForm(emptyForm(tab));
  };

  const startNew = () => {
    setEditingId(null);
    setForm(emptyForm(tab));
  };

  const startEdit = (item) => {
    setEditingId(item._id);
    setForm(section.stringify(item));
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this item?')) return;
    try {
      await deleteItem(tab, id);
      await loadItems();
      if (editingId === id) startNew();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const validationMessage = validateFields(form, section.fields);
    if (validationMessage) {
      setError(validationMessage);
      return;
    }

    try {
      const body = section.parse(form);
      if (editingId) {
        await updateItem(tab, editingId, body);
      } else {
        await createItem(tab, body);
      }
      await loadItems();
      startNew();
    } catch (err) {
      setError(err.message);
    }
  };

  if (!authed) {
    const isSignup = authMode === 'signup';

    return (
      <div className="admin-page">
        <div className="admin-login-card">
          <h1>Portfolio Admin</h1>
          <p>
            {isSignup
              ? 'Create an account to manage your portfolio content.'
              : 'Sign in to add or edit projects, education, certificates, and achievements.'}
          </p>

          <div className="admin-auth-tabs">
            <button
              type="button"
              className={`admin-auth-tab ${!isSignup ? 'admin-auth-tab--active' : ''}`}
              onClick={() => {
                setAuthMode('login');
                setLoginError('');
              }}
            >
              Login
            </button>
            <button
              type="button"
              className={`admin-auth-tab ${isSignup ? 'admin-auth-tab--active' : ''}`}
              onClick={() => {
                setAuthMode('signup');
                setLoginError('');
              }}
            >
              Sign up
            </button>
          </div>

          {loginError && <p className="admin-error">{loginError}</p>}

          <form onSubmit={isSignup ? handleSignup : handleLogin}>
            <div className="admin-field">
              <label htmlFor="admin-username">Username</label>
              <input
                id="admin-username"
                type="text"
                value={username}
                onChange={(e) => setUsernameInput(e.target.value)}
                placeholder="e.g. dikshit"
                autoComplete="username"
                required
              />
            </div>
            <div className="admin-field">
              <label htmlFor="admin-password">Password</label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                autoComplete={isSignup ? 'new-password' : 'current-password'}
                required
                minLength={6}
              />
            </div>
            {isSignup && (
              <div className="admin-field">
                <label htmlFor="admin-confirm-password">Confirm password</label>
                <input
                  id="admin-confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your password"
                  autoComplete="new-password"
                  required
                  minLength={6}
                />
              </div>
            )}
            <button type="submit" className="admin-btn admin-btn--primary" style={{ width: '100%' }}>
              {isSignup ? 'Create account' : 'Sign in'}
            </button>
          </form>

          <p className="admin-auth-hint">
            {isSignup ? (
              <>
                Already have an account?{' '}
                <button type="button" className="admin-auth-link" onClick={() => setAuthMode('login')}>
                  Login
                </button>
              </>
            ) : (
              <>
                New here?{' '}
                <button type="button" className="admin-auth-link" onClick={() => setAuthMode('signup')}>
                  Sign up
                </button>
              </>
            )}
          </p>

          <p style={{ marginTop: 16, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <Link to="/" style={{ color: 'var(--accent-blue)' }}>← Back to portfolio</Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-container">
        <div className="admin-header">
          <div>
            <h1>Portfolio Admin</h1>
            {adminName && (
              <p className="admin-welcome">
                Signed in as <strong>{adminName}</strong>
              </p>
            )}
          </div>
          <div className="admin-header-actions">
            <Link to="/" className="admin-btn admin-btn--ghost">View site</Link>
            <button type="button" className="admin-btn admin-btn--ghost" onClick={handleLogout}>
              Log out
            </button>
          </div>
        </div>

        <div className="admin-tabs">
          {Object.entries(SECTIONS).map(([key, cfg]) => (
            <button
              key={key}
              type="button"
              className={`admin-tab ${tab === key ? 'admin-tab--active' : ''}`}
              onClick={() => {
                setTab(key);
                setEditingId(null);
                setForm(emptyForm(key));
              }}
            >
              {cfg.label}
            </button>
          ))}
        </div>

        {error && <p className="admin-error">{error}</p>}
        {loading && <p style={{ color: 'var(--text-muted)', marginBottom: 16 }}>Loading…</p>}

        <div className="admin-list">
          {items.map((item) => (
            <div key={item._id} className="admin-list-item">
              <div>
                <h3>{section.listTitle(item)}</h3>
                <p>{section.listSub(item)}</p>
              </div>
              <div className="admin-list-actions">
                <button type="button" className="admin-btn admin-btn--ghost" onClick={() => startEdit(item)}>
                  Edit
                </button>
                <button type="button" className="admin-btn admin-btn--danger" onClick={() => handleDelete(item._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="admin-form-card">
          <h2>{editingId ? `Edit ${section.label}` : `Add ${section.label}`}</h2>
          <form onSubmit={handleSubmit}>
            <div className="admin-form-grid">
              {section.fields.map((field) => (
                <div
                  key={field.key}
                  className={`admin-field ${field.full ? 'admin-field--full' : ''} ${field.type === 'checkbox' ? 'admin-checkbox' : ''}`}
                >
                  <label htmlFor={field.key}>
                    {field.label}
                    {field.required ? ' *' : ''}
                  </label>
                  {field.type === 'textarea' ? (
                    <textarea
                      id={field.key}
                      value={form[field.key]}
                      onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                      placeholder={field.placeholder}
                      required={Boolean(field.required)}
                    />
                  ) : field.type === 'checkbox' ? (
                    <>
                      <input
                        id={field.key}
                        type="checkbox"
                        checked={Boolean(form[field.key])}
                        onChange={(e) => setForm({ ...form, [field.key]: e.target.checked })}
                      />
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                        Patent / main highlight block
                      </span>
                    </>
                  ) : (
                    <input
                      id={field.key}
                      type={field.type || 'text'}
                      value={form[field.key]}
                      onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                      placeholder={field.placeholder}
                      required={Boolean(field.required)}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="admin-form-actions">
              <button type="submit" className="admin-btn admin-btn--primary">
                {editingId ? 'Save changes' : 'Add item'}
              </button>
              {editingId && (
                <button type="button" className="admin-btn admin-btn--ghost" onClick={startNew}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
