const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/user';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB database: user'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Define Schema
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: /^\S+@\S+$/
  },
  query: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create Model
const Contact = mongoose.model('Contact', contactSchema);

// API Routes
app.get('/', (req, res) => {
  res.json({ message: 'Server is running!' });
});

// POST - Create new contact
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, query, contact, country } = req.body;

    // Validation
    if (!name || !email || !query || !contact || !country) {
      return res.status(400).json({ 
        success: false,
        message: 'All fields are required' 
      });
    }

    // Create new contact
    const newContact = new Contact({
      name,
      email,
      query,
      contact,
      country
    });

    // Save to database
    const savedContact = await newContact.save();

    res.status(201).json({
      success: true,
      message: 'Contact saved successfully!',
      data: savedContact
    });

  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).json({
      success: false,
      message: 'Error saving contact',
      error: error.message
    });
  }
});

// GET - Fetch all contacts
app.get('/api/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching contacts',
      error: error.message
    });
  }
});

// GET - Fetch single contact by ID
app.get('/api/contact/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }
    res.json({
      success: true,
      data: contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching contact',
      error: error.message
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});