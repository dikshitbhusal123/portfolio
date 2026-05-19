const express = require('express');
const { requireAuth } = require('../middleware/auth');
const { SANITIZERS, formatMongooseError } = require('./sanitizePayload');

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
    router.get(`/:${slugField}`, async (req, res) => {
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
      const item = await Model.findByIdAndUpdate(req.params.id, sanitize(req.body), {
        new: true,
        runValidators: true,
      });
      if (!item) return res.status(404).json({ error: 'Not found' });
      res.json(item);
    } catch (err) {
      res.status(400).json({ error: formatMongooseError(err) });
    }
  });

  router.delete('/:id', requireAuth, async (req, res) => {
    try {
      const item = await Model.findByIdAndDelete(req.params.id);
      if (!item) return res.status(404).json({ error: 'Not found' });
      res.json({ message: 'Deleted' });
    } catch (err) {
      res.status(500).json({ error: formatMongooseError(err) });
    }
  });

  return router;
}

module.exports = createCrudRouter;
