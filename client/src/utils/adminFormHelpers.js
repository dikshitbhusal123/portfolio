export function trim(value) {
  return typeof value === 'string' ? value.trim() : '';
}

export function splitCsv(value) {
  if (!value) return [];
  return String(value)
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

export function slugify(text) {
  return trim(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function validateFields(form, fields) {
  const missing = fields
    .filter((f) => f.required)
    .filter((f) => !trim(form[f.key]))
    .map((f) => f.label);

  if (missing.length) {
    return `Please fill in: ${missing.join(', ')}`;
  }
  return null;
}
