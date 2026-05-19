const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema(
  {
    icon: { type: String, default: '🏆' },
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    description: { type: String, required: true },
    color: { type: String, default: '#00d4ff' },
    badge: { type: String, default: 'Achievement' },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Achievement', achievementSchema);
