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

export function getItemId(item) {
  if (!item) return '';
  const id = item._id ?? item.id;
  return id ? String(id) : '';
}

export function isValidMongoId(id) {
  return typeof id === 'string' && /^[a-f\d]{24}$/i.test(id);
}

export function formFieldValue(form, field) {
  const value = form[field.key];
  if (field.type === 'checkbox') return Boolean(value);
  if (field.type === 'number') return value === '' || value == null ? '' : String(value);
  return value ?? '';
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
