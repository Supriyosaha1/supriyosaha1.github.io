const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); // Load environment variables securely

const app = express();
const port = 5000; // Port number for server to listen on

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Create transporter with Gmail credentials using environment variables
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Gmail username from the .env
    pass: process.env.EMAIL_PASS, // App password from the .env
  },
});

// POST route for handling contact form submissions
app.post('/send', async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender's email
      to: process.env.EMAIL_USER,   // Your email
      subject: `New Contact Form Submission: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send message' });
  }
});

// Start the server
app.listen(port, () => console.log(`Server running on port ${port}`));
