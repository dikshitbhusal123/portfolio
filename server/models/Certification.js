const mongoose = require('mongoose');

const certificationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    issuer: { type: String, required: true },
    icon: { type: String, default: 'fas fa-certificate' },
    color: { type: String, default: '#00d4ff' },
    gradient: { type: String, default: 'linear-gradient(135deg, #00d4ff22, #7c3aed22)' },
    year: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Certification', certificationSchema);
