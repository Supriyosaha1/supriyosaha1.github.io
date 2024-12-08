const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Create transporter with Gmail credentials
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'supriyo.saha.tifr@gmail.com', // Replace with your Gmail address
    pass: 'aekuyjopfcnofhkp',           // Replace with the App Password you generated
  },
});

// POST route to handle the contact form submission
app.post('/send', async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    const mailOptions = {
      from: 'supriyo.saha.tifr@gmail.com', // Use your Gmail address here
      to: 'supriyo.saha.tifr@gmail.com',   // This is your email, change if needed
      subject: `New Contact Form Submission: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to send message' });
  }
});

// Start the server
app.listen(3000, () => console.log("Server running on port 3000"));
