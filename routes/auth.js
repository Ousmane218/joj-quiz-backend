const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { body, validationResult } = require('express-validator');

const registerValidation = [
  body('username').trim().isLength({ min: 3, max: 20 }).withMessage('Username must be 3–20 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Invalid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

const loginValidation = [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty(),
];

function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ error: errors.array()[0].msg });
  next();
}

router.post('/register', registerValidation, validate, async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    await User.create({ username, email, password_hash: hash });
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError')
      return res.status(409).json({ error: 'Username or email already exists' });
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/login', loginValidation, validate, async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
