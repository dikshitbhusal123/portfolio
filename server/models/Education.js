const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema(
  {
    degree: { type: String, required: true },
    institution: { type: String, required: true },
    location: { type: String, required: true },
    period: { type: String, required: true },
    status: { type: String, required: true },
    desc: { type: String, required: true },
    icon: { type: String, default: 'fas fa-graduation-cap' },
    color: { type: String, default: '#00d4ff' },
    cgpa: { type: String, default: null },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Education', educationSchema);
