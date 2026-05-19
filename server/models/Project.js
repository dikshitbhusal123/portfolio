const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    tech: [String],
    tags: [String],
    icon: { type: String, default: '📁' },
    gradient: { type: String, default: 'linear-gradient(135deg, #00d4ff22, #7c3aed22)' },
    borderColor: { type: String, default: '#00d4ff' },
    highlights: [String],
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);
