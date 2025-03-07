import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

// Email transporter settings
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    // Disable certificate validation in development
    rejectUnauthorized: process.env.MODE === 'development' ? false : true,
  },
});

// Handle contact form submission
// POST  /api/contact
router.post('/', (req, res) => {
  const { name, email, message } = req.body;

  // Validate the fields
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const mailOptions = {
    from: email,
    to: process.env.EMAIL,
    subject: 'New message from BlogSphere',
    text: `
      Name: ${name}\n
      Email: ${email}\n
      Message: ${message}
    `,
  };

  transporter.sendMail(mailOptions, (err) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to send email' });
    }

    // Send a thank-you email to the user
    const thankYouMailOptions = {
      from: process.env.EMAIL, // Configure a no-reply email address and use here instead
      to: email,
      subject: 'Thank you for reaching out!',
      text: `
        Hi ${name},\n\n
        Thank you for contacting us! We'll get back to you as soon as possible.\n\n
        Best regards,\n
        The BlogSphere Team
      `,
    };

    transporter.sendMail(thankYouMailOptions, (err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: 'Error sending thank you email' });
      }

      res
        .status(200)
        .json({ message: 'Your message has been sent successfully!' });
    });
  });
});

export default router;
