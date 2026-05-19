const express = require('express');
const jwt = require('jsonwebtoken');
const AdminUser = require('../models/AdminUser');

const router = express.Router();

const USERNAME_REGEX = /^[a-z0-9_]{3,20}$/;

function createToken(user) {
  return jwt.sign(
    { userId: user._id, username: user.username, role: 'admin' },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
}

function validateCredentials(username, password) {
  const normalized = username?.trim().toLowerCase();

  if (!normalized || !USERNAME_REGEX.test(normalized)) {
    return 'Username must be 3–20 characters (letters, numbers, underscore only)';
  }
  if (!password || password.length < 6) {
    return 'Password must be at least 6 characters';
  }

  return null;
}

router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    const validationError = validateCredentials(username, password);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const normalized = username.trim().toLowerCase();
    const existing = await AdminUser.findOne({ username: normalized });
    if (existing) {
      return res.status(409).json({ error: 'Username already taken' });
    }

    const user = await AdminUser.create({ username: normalized, password });
    const token = createToken(user);

    res.status(201).json({ token, username: user.username });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const validationError = validateCredentials(username, password);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const normalized = username.trim().toLowerCase();
    const user = await AdminUser.findOne({ username: normalized });
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const match = await user.comparePassword(password);
    if (!match) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const token = createToken(user);
    res.json({ token, username: user.username });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
