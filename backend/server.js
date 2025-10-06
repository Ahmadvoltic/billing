import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/database.js';
import authRouter from './routes/auth.js';
import emailAccountsRouter from './routes/emailAccounts.js';
import customFieldsRouter from './routes/customFields.js';
import usersRouter from './routes/users.js';
import apiKeysRouter from './routes/apiKeys.js';
import { authenticate } from './middleware/auth.js';

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5175', 'https://app.inboxro.com'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Auth routes (no auth required)
app.use('/api/auth', authRouter);

// Protected routes
app.use('/api/email-accounts', authenticate, emailAccountsRouter);
app.use('/api/custom-fields', authenticate, customFieldsRouter);
app.use('/api/users', authenticate, usersRouter);
app.use('/api/api-keys', authenticate, apiKeysRouter);


// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

