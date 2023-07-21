
const modal = require('../models');
const User = modal.AuthUser;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
    try {
      const { username, first_name, last_name, email, password } = req.body;
  
      // Check if the user already exists
      const existingUser = await User.findOne({ where: { username } });
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists.' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create the user
      const user = await User.create({
        username,
        first_name,
        last_name,
        email,
        password: hashedPassword
      });
  
      // Remove the password from the response
      user.password = undefined;
  
      res.json(user);
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'Failed to register user.' });
    }
};


const login = async (req, res) => {
    console.log('kefkfjjlkjfsss')
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid email.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    // if (!isPasswordValid) {
    //     return res.status(401).json({ error: 'Invalid email or password.' });
    // }

    const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, { expiresIn: '2D' });
    user.password = undefined;
    res.json({user, token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Failed to log in.' });
  }
};


const logout = (req, res) => {
    // Clear the session
    req.session.destroy((err) => {
        if (err) {
        console.error('Error clearing session:', err);
        return res.status(500).json({ error: 'Failed to logout.' });
        }
        
        // Return a success response
        res.json({message: "user logged out!!!!"});
    });
};
  

module.exports = {
    login,
    registerUser,
    logout,
};
