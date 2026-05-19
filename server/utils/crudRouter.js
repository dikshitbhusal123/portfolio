const express = require('express');
const mongoose = require('mongoose');
const { requireAuth } = require('../middleware/auth');
const { SANITIZERS, formatMongooseError } = require('./sanitizePayload');

function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id) && String(id).length === 24;
}

function createCrudRouter(Model, { slugField = null, sectionKey } = {}) {
  const router = express.Router();
  const sanitize = SANITIZERS[sectionKey];

  if (!sanitize) {
    throw new Error(`Missing sanitizer for section: ${sectionKey}`);
  }

  router.get('/', async (req, res) => {
    try {
      const items = await Model.find().sort({ order: 1, createdAt: 1 }).lean();
      res.json(items);
    } catch (err) {
      res.status(500).json({ error: formatMongooseError(err) });
    }
  });

  if (slugField) {
    router.get(`/slug/:${slugField}`, async (req, res) => {
      try {
        const item = await Model.findOne({ [slugField]: req.params[slugField] }).lean();
        if (!item) return res.status(404).json({ error: 'Not found' });
        res.json(item);
      } catch (err) {
        res.status(500).json({ error: formatMongooseError(err) });
      }
    });
  }

  router.post('/', requireAuth, async (req, res) => {
    try {
      const item = await Model.create(sanitize(req.body));
      res.status(201).json(item);
    } catch (err) {
      res.status(400).json({ error: formatMongooseError(err) });
    }
  });

  router.put('/:id', requireAuth, async (req, res) => {
    try {
      const { id } = req.params;
      if (!isValidObjectId(id)) {
        return res.status(400).json({ error: 'Invalid item id. Refresh the page and try Edit again.' });
      }

      const item = await Model.findByIdAndUpdate(id, sanitize(req.body), {
        new: true,
        runValidators: true,
        overwrite: false,
      });

      if (!item) {
        return res.status(404).json({ error: 'Item not found. It may have been deleted.' });
      }

      res.json(item);
    } catch (err) {
      res.status(400).json({ error: formatMongooseError(err) });
    }
  });

  router.delete('/:id', requireAuth, async (req, res) => {
    try {
      const { id } = req.params;
      if (!isValidObjectId(id)) {
        return res.status(400).json({ error: 'Invalid item id.' });
      }

      const item = await Model.findByIdAndDelete(id);
      if (!item) return res.status(404).json({ error: 'Not found' });
      res.json({ message: 'Deleted' });
    } catch (err) {
      res.status(500).json({ error: formatMongooseError(err) });
    }
  });

  return router;
}

module.exports = createCrudRouter;
