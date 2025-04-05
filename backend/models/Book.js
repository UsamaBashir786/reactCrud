// backend/models/Book.js
const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Frontend', 'Backend', 'Full Stack', 'DevOps', 'Mobile', 'Other']
  },
  price: {
    type: Number,
    required: true
  },
  imageUrl: {
    type: String,
    default: 'default-book.jpg'
  },
  publishedYear: {
    type: Number,
    required: true
  },
  pages: {
    type: Number,
    required: true
  },
  isbn: {
    type: String,
    required: true,
    unique: true
  },
  stock: {
    type: Number,
    required: true,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Book', BookSchema);
