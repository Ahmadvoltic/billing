import express from 'express';
import User from '../models/User.js';
import { canManageUsers } from '../middleware/authorize.js';

const router = express.Router();

// Get all users
router.get('/', canManageUsers, async (req, res) => {
  try {
    const users = await User.find()
      .select('-password')
      .populate('addedBy', 'email name')
      .sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create new user
router.post('/', canManageUsers, async (req, res) => {
  try {
    const { email, password, name, role } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Check role permissions
    const requestorRole = req.user.role;

    // Super admin can create admin, user, or viewer (but not another super_admin)
    // Admin can create admin, user, or viewer
    if (role === 'super_admin') {
      return res.status(403).json({ error: 'Cannot create another super admin' });
    }

    // Admin can only create admin, user and viewer roles
    if (requestorRole === 'admin' && !['admin', 'user', 'viewer'].includes(role)) {
      return res.status(403).json({ error: 'Invalid role' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create new user
    const user = await User.create({
      email,
      password,
      name,
      role: role || 'user',
      addedBy: req.user.userId
    });

    const userResponse = await User.findById(user._id)
      .select('-password')
      .populate('addedBy', 'email name');

    res.status(201).json({
      message: 'User created successfully',
      user: userResponse
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update user role
router.patch('/:id/role', canManageUsers, async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    const requestorRole = req.user.role;
    const targetUser = await User.findById(id);

    if (!targetUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Cannot change your own role
    if (id === req.user.userId.toString()) {
      return res.status(400).json({ error: 'Cannot change your own role' });
    }

    // Cannot create another super_admin
    if (role === 'super_admin') {
      return res.status(403).json({ error: 'Cannot create another super admin' });
    }

    // Super admin can change anyone's role (except to super_admin)
    // Admin can change roles to admin, user, or viewer
    if (requestorRole === 'admin' && !['admin', 'user', 'viewer'].includes(role)) {
      return res.status(403).json({ error: 'Admins can only assign admin, user, or viewer roles' });
    }

    targetUser.role = role;
    await targetUser.save();

    const userResponse = await User.findById(targetUser._id).select('-password');

    res.json({ message: 'User role updated successfully', user: userResponse });
  } catch (error) {
    console.error('Error updating user role:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete user
router.delete('/:id', canManageUsers, async (req, res) => {
  try {
    const { id } = req.params;

    // Prevent deleting yourself
    if (id === req.user.userId.toString()) {
      return res.status(400).json({ error: 'Cannot delete your own account' });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Admin cannot delete super_admin or admin
    if (req.user.role === 'admin' && ['super_admin', 'admin'].includes(user.role)) {
      return res.status(403).json({ error: 'Admins cannot delete other admins or super admins' });
    }

    await User.findByIdAndDelete(id);

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update user profile (name, email)
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    // Users can only update their own profile unless they're admin/super_admin
    if (id !== req.user.userId.toString() && !['super_admin', 'admin'].includes(req.user.role)) {
      return res.status(403).json({ error: 'You can only update your own profile' });
    }

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (email !== undefined) updateData.email = email;

    const user = await User.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'Profile updated successfully', user });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
