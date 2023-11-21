const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { sequelize } = require('../config/dbConfig');
const User = require('../models/user');
const JWT_SECRET=process.env.JWT_SECRET;



const generateToken = (user) => {
  return jwt.sign({ id: user.id, username: user.username, role: user.role },JWT_SECRET , {
    expiresIn: '1h',
  });
};

// Sign up
exports.signUp = async (req, res) => {
  try {
    const { firstname, lastname, username, email, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstname,
      lastname,
      username,
      email,
      password: hashedPassword,
      role,
    });

    const token = generateToken(newUser);

    res.status(201).json({ token, successMsg: "User Created!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Sign in
exports.signIn = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = generateToken(user);

    res.status(200).json({ token, successMsg: 'User Found' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
