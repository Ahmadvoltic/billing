import mongoose from 'mongoose';

const emailAccountSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  userName: {
    type: String,
    required: true,
    trim: true
  },
  phoneNumber: {
    type: String,
    trim: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['paid', 'unpaid'],
    default: 'unpaid'
  },
  sources: {
    type: [String],
    enum: ['Slack', 'WhatsApp', 'Email'],
    default: []
  },
  customFields: {
    type: Map,
    of: String,
    default: {}
  }
}, {
  timestamps: true
});

const EmailAccount = mongoose.model('EmailAccount', emailAccountSchema);

export default EmailAccount;
