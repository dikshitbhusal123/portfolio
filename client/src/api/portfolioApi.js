const API_BASE = import.meta.env.VITE_API_URL || '/api';

function getToken() {
  return localStorage.getItem('portfolioAdminToken');
}

export function setToken(token) {
  if (token) localStorage.setItem('portfolioAdminToken', token);
  else localStorage.removeItem('portfolioAdminToken');
}

export function setUsername(username) {
  if (username) localStorage.setItem('portfolioAdminUsername', username);
  else localStorage.removeItem('portfolioAdminUsername');
}

export function getUsername() {
  return localStorage.getItem('portfolioAdminUsername');
}

export function isLoggedIn() {
  return Boolean(getToken());
}

export function clearSession() {
  setToken(null);
  setUsername(null);
}

async function request(path, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  let res;
  try {
    res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  } catch {
    throw new Error(
      'Cannot reach the API server. Start it with: cd server && npm run dev'
    );
  }

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    if (res.status === 401) {
      clearSession();
      throw new Error(data.error || 'Session expired. Please log in again.');
    }
    throw new Error(
      data.error ||
        (res.status === 403
          ? 'API blocked (port conflict). Use PORT=5001 in server/.env and restart the backend.'
          : `Request failed (${res.status})`)
    );
  }

  return data;
}

export const login = (username, password) =>
  request('/auth/login', { method: 'POST', body: JSON.stringify({ username, password }) });

export const signup = (username, password) =>
  request('/auth/signup', { method: 'POST', body: JSON.stringify({ username, password }) });

export const fetchProjects = () => request('/projects');
export const fetchProjectBySlug = (slug) => request(`/projects/slug/${slug}`);

export const fetchEducation = () => request('/education');
export const fetchCertifications = () => request('/certifications');
export const fetchAchievements = () => request('/achievements');

export const createItem = (section, body) =>
  request(`/${section}`, { method: 'POST', body: JSON.stringify(body) });

export const updateItem = (section, id, body) =>
  request(`/${section}/${encodeURIComponent(String(id))}`, {
    method: 'PUT',
    body: JSON.stringify(body),
  });

export const deleteItem = (section, id) =>
  request(`/${section}/${encodeURIComponent(String(id))}`, { method: 'DELETE' });

export async function submitContactMessage({ name, email, message }) {
  const res = await fetch(`${API_BASE}/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, message }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.error || 'Failed to send message. Please try again.');
  }

  return data;
}

export const fetchMessages = () => request('/messages');

export const markMessageRead = (id) =>
  request(`/messages/${encodeURIComponent(String(id))}/read`, { method: 'PATCH' });

export const deleteMessage = (id) =>
  request(`/messages/${encodeURIComponent(String(id))}`, { method: 'DELETE' });
