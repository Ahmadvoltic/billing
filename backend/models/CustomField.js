import mongoose from 'mongoose';

const customFieldSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: {
      validator: function(v) {
        return !v.includes('.') && !v.includes('$');
      },
      message: 'Field name cannot contain dots (.) or dollar signs ($)'
    }
  },
  fieldType: {
    type: String,
    enum: ['text', 'number', 'date', 'select'],
    default: 'text'
  },
  options: {
    type: [String],
    default: []
  }
}, {
  timestamps: true
});

const CustomField = mongoose.model('CustomField', customFieldSchema);

export default CustomField;
