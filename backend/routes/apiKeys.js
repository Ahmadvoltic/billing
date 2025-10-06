import express from 'express';
import ApiKey from '../models/ApiKey.js';
import { canManageApiKeys } from '../middleware/authorize.js';

const router = express.Router();

// Get API credentials (only one record)
router.get('/', canManageApiKeys, async (req, res) => {
  try {
    const apiKey = await ApiKey.findOne().populate('updatedBy', 'email name');
    res.json(apiKey);
  } catch (error) {
    console.error('Error fetching API credentials:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create or Update API credentials
router.post('/', canManageApiKeys, async (req, res) => {
  try {
    const { apiKey, secretKey, webhookSecret } = req.body;

    if (!apiKey || !secretKey || !webhookSecret) {
      return res.status(400).json({ error: 'API Key, Secret Key, and Webhook Secret are required' });
    }

    // Check if credentials already exist
    let credentials = await ApiKey.findOne();

    if (credentials) {
      // Update existing credentials
      credentials.apiKey = apiKey;
      credentials.secretKey = secretKey;
      credentials.webhookSecret = webhookSecret;
      credentials.updatedBy = req.user.userId;
      await credentials.save();
    } else {
      // Create new credentials
      credentials = await ApiKey.create({
        apiKey,
        secretKey,
        webhookSecret,
        updatedBy: req.user.userId
      });
    }

    const populatedCredentials = await ApiKey.findById(credentials._id).populate('updatedBy', 'email name');

    res.json(populatedCredentials);
  } catch (error) {
    console.error('Error saving API credentials:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
