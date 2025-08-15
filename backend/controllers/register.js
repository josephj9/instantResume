const bcrypt = require('bcrypt');
const registerRouter = require('express').Router();
const User = require('../models/user');

registerRouter.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    // Hash password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Create new user
    const user = new User({
      email,
      passwordHash
    });

    const savedUser = await user.save();

    // Remove passwordHash from the response
    const userWithoutPassword = savedUser.toObject();
    delete userWithoutPassword.passwordHash;

    res.status(201).json(userWithoutPassword);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = registerRouter;
