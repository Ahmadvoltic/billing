// Role-based authorization middleware
export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Access forbidden: Insufficient permissions' });
    }

    next();
  };
};

// Permission checks for specific actions
export const canManageUsers = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  // Only super_admin and admin can manage users
  if (!['super_admin', 'admin'].includes(req.user.role)) {
    return res.status(403).json({ error: 'Only admins can manage users' });
  }

  next();
};

export const canManageApiKeys = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  // Only super_admin can manage API keys
  if (req.user.role !== 'super_admin') {
    return res.status(403).json({ error: 'Only super admins can manage API keys' });
  }

  next();
};

export const canManageFields = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  // super_admin and admin can add/delete fields
  if (!['super_admin', 'admin'].includes(req.user.role)) {
    return res.status(403).json({ error: 'Only admins can add or delete fields' });
  }

  next();
};

export const canEditData = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  // Everyone except viewer can edit data
  if (req.user.role === 'viewer') {
    return res.status(403).json({ error: 'Viewers cannot edit data' });
  }

  next();
};

export const canViewData = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  // All authenticated users can view data
  next();
};
