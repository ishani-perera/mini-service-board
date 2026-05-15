const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// In-memory users fallback when DB is unavailable
const LOCAL_USERS = [];

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret123', {
    expiresIn: '30d',
  });
};

// @desc    Register user
// @route   POST /api/auth/register
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    // If DB is not connected, use in-memory fallback
    if (global.__DB_CONNECTED === false) {
      const exists = LOCAL_USERS.find(u => u.email === email.toLowerCase());
      if (exists) return res.status(400).json({ success: false, message: 'User already exists' });
      const hashed = await bcrypt.hash(password, 10);
      const newUser = {
        _id: `local_${Date.now()}`,
        name,
        email: email.toLowerCase(),
        password: hashed,
        role: role || 'tradesman',
      };
      LOCAL_USERS.push(newUser);
      return res.status(201).json({ success: true, data: { _id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role, token: generateToken(newUser._id) } });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const user = await User.create({
      name,
      email,
      password,
      role,
    });

    if (user) {
      res.status(201).json({
        success: true,
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          token: generateToken(user._id),
        },
      });
    } else {
      res.status(400).json({ success: false, message: 'Invalid user data' });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Login user
// @route   POST /api/auth/login
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (global.__DB_CONNECTED === false) {
      const user = LOCAL_USERS.find(u => u.email === email.toLowerCase());
      if (user && (await bcrypt.compare(password, user.password))) {
        return res.json({ success: true, data: { _id: user._id, name: user.name, email: user.email, role: user.role, token: generateToken(user._id) } });
      }
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const user = await User.findOne({ email }).select('+password');

    if (user && (await user.matchPassword(password))) {
      res.json({
        success: true,
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          token: generateToken(user._id),
        },
      });
    } else {
      res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get user profile
// @route   GET /api/auth/me
const getMe = async (req, res, next) => {
  try {
    if (global.__DB_CONNECTED === false) {
      const user = LOCAL_USERS.find(u => u._id === req.user.id);
      if (!user) return res.status(404).json({ success: false, message: 'User not found' });
      const { password, ...rest } = user;
      return res.json({ success: true, data: rest });
    }

    const user = await User.findById(req.user.id);
    res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

module.exports = { registerUser, loginUser, getMe };
