const express = require('express');
const mongoose = require('mongoose');
const Message = require('../models/Message');
const { requireAuth } = require('../middleware/auth');
const { formatMongooseError } = require('../utils/sanitizePayload');

const router = express.Router();

function trim(value) {
  if (value == null) return '';
  return String(value).trim();
}

function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id) && String(id).length === 24;
}

// Public — contact form submission
router.post('/', async (req, res) => {
  try {
    const name = trim(req.body.name);
    const email = trim(req.body.email);
    const message = trim(req.body.message);

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Please enter a valid email address.' });
    }

    if (message.length < 10) {
      return res.status(400).json({ error: 'Message must be at least 10 characters.' });
    }

    await Message.create({ name, email, message });
    res.status(201).json({ success: true, message: 'Message sent successfully.' });
  } catch (err) {
    res.status(400).json({ error: formatMongooseError(err) });
  }
});

// Admin — list all messages (newest first)
router.get('/', requireAuth, async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 }).lean();
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: formatMongooseError(err) });
  }
});

router.patch('/:id/read', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ error: 'Invalid message id.' });
    }

    const item = await Message.findByIdAndUpdate(
      id,
      { read: true },
      { new: true }
    );

    if (!item) return res.status(404).json({ error: 'Message not found.' });
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: formatMongooseError(err) });
  }
});

router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ error: 'Invalid message id.' });
    }

    const item = await Message.findByIdAndDelete(id);
    if (!item) return res.status(404).json({ error: 'Message not found.' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: formatMongooseError(err) });
  }
});

module.exports = router;
