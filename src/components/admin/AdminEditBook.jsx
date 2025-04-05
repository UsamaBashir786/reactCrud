
// src/components/admin/AdminEditBook.jsx
import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import BookContext from '../../context/book/bookContext';
import Spinner from '../layout/Spinner';

const AdminEditBook = () => {
  const bookContext = useContext(BookContext);
  const { book, getBook, updateBook, loading } = bookContext;
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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

  useEffect(() => {
    getBook(id);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title || '',
        author: book.author || '',
        description: book.description || '',
        category: book.category || '',
        price: book.price || '',
        publishedYear: book.publishedYear || '',
        pages: book.pages || '',
        isbn: book.isbn || '',
        stock: book.stock || '',
        imageUrl: book.imageUrl || ''
      });
    }
  }, [book]);

  const { 
    title, author, description, category, price, 
    publishedYear, pages, isbn, stock, imageUrl 
  } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    
    // Simple validation
    if (title === '' || author === '' || description === '' || category === '') {
      toast.error('Please fill all required fields');
      return;
    }

    // Convert number strings to actual numbers
    const bookData = {
      _id: id,
      title,
      author,
      description,
      category,
      price: parseFloat(price),
      publishedYear: parseInt(publishedYear),
      pages: parseInt(pages),
      isbn,
      stock: parseInt(stock),
      imageUrl
    };

    updateBook(bookData);
    toast.success('Book updated successfully');
    navigate('/admin/books');
  };

  if (loading || !book) return <Spinner />;

  return (
    <div className="container py-4">
      <h1 className="mb-4">Edit Book</h1>
      
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
                Update Book
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminEditBook;