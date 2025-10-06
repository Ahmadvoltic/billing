import mongoose from 'mongoose';

const apiKeySchema = new mongoose.Schema({
  apiKey: {
    type: String,
    required: true
  },
  secretKey: {
    type: String,
    required: true
  },
  webhookSecret: {
    type: String,
    required: true
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

const ApiKey = mongoose.model('ApiKey', apiKeySchema);

export default ApiKey;
