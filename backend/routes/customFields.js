import express from 'express';
import CustomField from '../models/CustomField.js';
import { canViewData, canManageFields } from '../middleware/authorize.js';

const router = express.Router();

// GET all custom fields
router.get('/', canViewData, async (req, res) => {
  try {
    const customFields = await CustomField.find().sort({ createdAt: -1 });
    res.json(customFields);
  } catch (error) {
    console.error('Error fetching custom fields:', error);
    res.status(500).json({ error: 'Failed to fetch custom fields' });
  }
});

// POST create new custom field
router.post('/', canManageFields, async (req, res) => {
  console.log('POST /custom-fields hit!', req.body);
  try {
    const customField = new CustomField(req.body);
    await customField.save();
    res.status(201).json(customField);
  } catch (error) {
    console.error('Error creating custom field:', error);
    res.status(400).json({ error: error.message });
  }
});

// DELETE custom field
router.delete('/:id', canManageFields, async (req, res) => {
  try {
    const customField = await CustomField.findByIdAndDelete(req.params.id);
    if (!customField) {
      return res.status(404).json({ error: 'Custom field not found' });
    }
    res.json({ message: 'Custom field deleted successfully' });
  } catch (error) {
    console.error('Error deleting custom field:', error);
    res.status(500).json({ error: 'Failed to delete custom field' });
  }
});

export default router;
