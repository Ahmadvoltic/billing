import express from 'express';
import EmailAccount from '../models/EmailAccount.js';
import { canViewData, canEditData } from '../middleware/authorize.js';

const router = express.Router();

// GET all email accounts with filtering
router.get('/', canViewData, async (req, res) => {
  try {
    const { search, status, sources, startDate, endDate } = req.query;

    let query = {};

    // Search filter (email, userName, phoneNumber)
    if (search) {
      query.$or = [
        { email: { $regex: search, $options: 'i' } },
        { userName: { $regex: search, $options: 'i' } },
        { phoneNumber: { $regex: search, $options: 'i' } }
      ];
    }

    // Status filter
    if (status) {
      const statusArray = status.split(',');
      query.status = { $in: statusArray };
    }

    // Sources filter
    if (sources) {
      const sourcesArray = sources.split(',');
      query.sources = { $in: sourcesArray };
    }

    // Date range filter
    if (startDate || endDate) {
      query.dueDate = {};
      if (startDate) {
        query.dueDate.$gte = new Date(startDate);
      }
      if (endDate) {
        query.dueDate.$lte = new Date(endDate);
      }
    }

    const emailAccounts = await EmailAccount.find(query).sort({ createdAt: -1 });
    res.json(emailAccounts);
  } catch (error) {
    console.error('Error fetching email accounts:', error);
    res.status(500).json({ error: 'Failed to fetch email accounts' });
  }
});

// GET single email account by ID
router.get('/:id', canViewData, async (req, res) => {
  try {
    const emailAccount = await EmailAccount.findById(req.params.id);
    if (!emailAccount) {
      return res.status(404).json({ error: 'Email account not found' });
    }
    res.json(emailAccount);
  } catch (error) {
    console.error('Error fetching email account:', error);
    res.status(500).json({ error: 'Failed to fetch email account' });
  }
});

// POST create new email account
router.post('/', canEditData, async (req, res) => {
  try {
    const emailAccount = new EmailAccount(req.body);
    await emailAccount.save();
    res.status(201).json(emailAccount);
  } catch (error) {
    console.error('Error creating email account:', error);
    res.status(400).json({ error: error.message });
  }
});

// PUT update email account
router.put('/:id', canEditData, async (req, res) => {
  try {
    const emailAccount = await EmailAccount.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!emailAccount) {
      return res.status(404).json({ error: 'Email account not found' });
    }
    res.json(emailAccount);
  } catch (error) {
    console.error('Error updating email account:', error);
    res.status(400).json({ error: error.message });
  }
});

// DELETE email account
router.delete('/:id', canEditData, async (req, res) => {
  try {
    const emailAccount = await EmailAccount.findByIdAndDelete(req.params.id);
    if (!emailAccount) {
      return res.status(404).json({ error: 'Email account not found' });
    }
    res.json({ message: 'Email account deleted successfully' });
  } catch (error) {
    console.error('Error deleting email account:', error);
    res.status(500).json({ error: 'Failed to delete email account' });
  }
});

export default router;
