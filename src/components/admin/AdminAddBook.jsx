
// src/components/admin/AdminAddBook.jsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import BookContext from '../../context/book/bookContext';

const AdminAddBook = () => {
  const bookContext = useContext(BookContext);
  const { addBook } = bookContext;
  const navigate = useNavigate();

  const [book, setBook] = useState({
    title: '',
    author: '',
    description: '',
    category: '',
    price: '',
    publishedYear: '',
    pages: '',
    isbn: '',
    stock: '',
    imageUrl: ''
  });

  const { 
    title, author, description, category, price, 
    publishedYear, pages, isbn, stock, imageUrl 
  } = book;

  const onChange = e => setBook({ ...book, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    
    // Simple validation
    if (title === '' || author === '' || description === '' || category === '') {
      toast.error('Please fill all required fields');
      return;
    }

    // Convert number strings to actual numbers
    const bookData = {
      ...book,
      price: parseFloat(price),
      pages: parseInt(pages),
      publishedYear: parseInt(publishedYear),
      stock: parseInt(stock)
    };

    addBook(bookData);
    toast.success('Book added successfully');
    navigate('/admin/books');
  };

  return (
    <div className="container py-4">
      <h1 className="mb-4">Add New Book</h1>
      
      <div className="card">
        <div className="card-body">
          <form onSubmit={onSubmit}>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Title *</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={title}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Author *</label>
                <input
                  type="text"
                  className="form-control"
                  name="author"
                  value={author}
                  onChange={onChange}
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Description *</label>
              <textarea
                className="form-control"
                name="description"
                value={description}
                onChange={onChange}
                rows="4"
                required
              ></textarea>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Category *</label>
                <select
                  className="form-select"
                  name="category"
                  value={category}
                  onChange={onChange}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Full Stack">Full Stack</option>
                  <option value="DevOps">DevOps</option>
                  <option value="Mobile">Mobile</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Price ($) *</label>
                <input
                  type="number"
                  className="form-control"
                  name="price"
                  value={price}
                  onChange={onChange}
                  step="0.01"
                  min="0"
                  required
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Published Year *</label>
                <input
                  type="number"
                  className="form-control"
                  name="publishedYear"
                  value={publishedYear}
                  onChange={onChange}
                  min="1900"
                  max={new Date().getFullYear()}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Pages *</label>
                <input
                  type="number"
                  className="form-control"
                  name="pages"
                  value={pages}
                  onChange={onChange}
                  min="1"
                  required
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">ISBN *</label>
                <input
                  type="text"
                  className="form-control"
                  name="isbn"
                  value={isbn}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Stock *</label>
                <input
                  type="number"
                  className="form-control"
                  name="stock"
                  value={stock}
                  onChange={onChange}
                  min="0"
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Image URL</label>
              <input
                type="text"
                className="form-control"
                name="imageUrl"
                value={imageUrl}
                onChange={onChange}
                placeholder="https://example.com/book-cover.jpg"
              />
            </div>

            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate('/admin/books')}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Add Book
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminAddBook;