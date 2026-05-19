function trim(value) {
  if (value == null) return '';
  return String(value).trim();
}

function splitCsv(value) {
  if (!value) return [];
  return String(value)
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

const SANITIZERS = {
  projects: (body) => ({
    slug: trim(body.slug),
    title: trim(body.title),
    description: trim(body.description),
    icon: trim(body.icon) || '📁',
    gradient:
      trim(body.gradient) || 'linear-gradient(135deg, #00d4ff22, #7c3aed22)',
    borderColor: trim(body.borderColor) || '#00d4ff',
    tech: Array.isArray(body.tech) ? body.tech : splitCsv(body.tech),
    tags: Array.isArray(body.tags) ? body.tags : splitCsv(body.tags),
    highlights: Array.isArray(body.highlights) ? body.highlights : splitCsv(body.highlights),
    githubUrl: trim(body.githubUrl),
    order: Number(body.order) || 0,
  }),
  education: (body) => ({
    degree: trim(body.degree),
    institution: trim(body.institution),
    location: trim(body.location),
    period: trim(body.period),
    status: trim(body.status),
    desc: trim(body.desc),
    icon: trim(body.icon) || 'fas fa-graduation-cap',
    color: trim(body.color) || '#00d4ff',
    cgpa: trim(body.cgpa) || null,
    order: Number(body.order) || 0,
  }),
  certifications: (body) => ({
    title: trim(body.title),
    issuer: trim(body.issuer),
    year: trim(body.year),
    icon: trim(body.icon) || 'fas fa-certificate',
    color: trim(body.color) || '#00d4ff',
    gradient:
      trim(body.gradient) || 'linear-gradient(135deg, #00d4ff22, #7c3aed22)',
    order: Number(body.order) || 0,
  }),
  achievements: (body) => ({
    icon: trim(body.icon) || '🏆',
    title: trim(body.title),
    subtitle: trim(body.subtitle),
    description: trim(body.description),
    color: trim(body.color) || '#00d4ff',
    badge: trim(body.badge) || 'Achievement',
    featured: Boolean(body.featured),
    order: Number(body.order) || 0,
  }),
};

function formatMongooseError(err) {
  if (err.name === 'ValidationError') {
    return Object.values(err.errors)
      .map((e) => e.message)
      .join(' ');
  }
  if (err.name === 'CastError') {
    return 'Invalid data format. Check all fields and try again.';
  }
  if (err.code === 11000) {
    return 'This entry already exists (duplicate slug or unique field).';
  }
  return err.message;
}

module.exports = { SANITIZERS, formatMongooseError, trim, splitCsv };
