
const modal = require('../models');
const User = modal.AuthUser;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer')

exports.registerUser = async (req, res) => {
    try {
      const { first_name, last_name, email, password } = req.body;
  
      // Check if the user already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists.' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create the user
      const user = await User.create({
          username:email,
          first_name,
          last_name,
          email,
          password: hashedPassword,
          is_staff    :0,
          is_superuser :0,
          is_active   :  1,
          date_joined : new Date(),
      });
  
      // Remove the password from the response
      user.password = undefined;
  
      res.json(user);
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'Failed to register user.' });
    }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid email.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid password.' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, { expiresIn: '2D' });
    user.password = undefined;
    res.json({user, token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Failed to log in.' });
  }
};


exports.logout = (req, res) => {
    console.log('token', token)
    req.session.destroy((err) => {
        if (err) {
        console.error('Error clearing session:', err);
        return res.status(500).json({ error: 'Failed to logout.' });
        }
        
        res.json({message: "user logged out!!!!"});
    });
};
  
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587, 
  secure: false,
  auth: {
    user: 'kalki@presentience.in',
    pass: 'Kalki@007',
  },
});
exports.ForgotPassword =  async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const randomPassword = crypto.randomBytes(8).toString('hex'); // Random 8-character password
    const hashedPassword = await bcrypt.hash(randomPassword, 10);

    user.password = hashedPassword;
    await user.save();

    // Send the random password to the user's registered email address
    const mailOptions = {
      from: 'kalki@presentience.in',
      to: email,
      subject: 'New Password',
      html: `Your new password is: ${randomPassword}`
            + "<br> Login to your account <a href='http://localhost:3000/api/users/'>Click here</a>"
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending new password email:', error);
        return res.status(500).json({ error: 'Failed to send new password email.' });
      }

      console.log('New password email sent:', info.response);
      res.status(200).json({ message: 'New password sent successfully. Check your email.' });
    });
  } catch (error) {
    console.error('Error sending new password:', error);
    res.status(500).json({ error: 'Failed to send new password.' });
  }
};

// Change Password API
exports.ChangePassword = async (req, res) => {
  try {
    const user_id = req.user.userId
    const { currentPassword, newPassword } = req.body;

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Current password is incorrect.' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password changed successfully.' });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ error: 'Failed to change password.' });
  }
};
