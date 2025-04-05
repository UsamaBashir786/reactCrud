
// src/components/user/UserBookDetails.jsx
import React, { useContext, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import BookContext from '../../context/book/bookContext';
import Spinner from '../layout/Spinner';

const UserBookDetails = () => {
  const bookContext = useContext(BookContext);
  const { book, getBook, loading } = bookContext;
  const { id } = useParams();

  useEffect(() => {
    getBook(id);
    // eslint-disable-next-line
  }, [id]);

  if (loading || !book) return <Spinner />;

  return (
    <div className="container py-4">
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {book.title}
          </li>
        </ol>
      </nav>

      <div className="row">
        <div className="col-md-4 mb-4 mb-md-0">
          <div className="card shadow-sm">
            <div className="card-body text-center p-5">
              {book.imageUrl ? (
                <img 
                  src={book.imageUrl} 
                  alt={book.title} 
                  className="img-fluid" 
                />
              ) : (
                <div className="p-5">
                  <i className="fas fa-book fa-8x text-secondary"></i>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <h1 className="mb-2">{book.title}</h1>
          <h4 className="text-muted mb-3">by {book.author}</h4>
          
          <div className="mb-4">
            <span className="badge bg-primary me-2">{book.category}</span>
            {book.stock > 0 ? (
              <span className="badge bg-success">In Stock ({book.stock} available)</span>
            ) : (
              <span className="badge bg-danger">Out of Stock</span>
            )}
          </div>
          
          <h3 className="text-primary mb-4">${book.price.toFixed(2)}</h3>
          
          <div className="row mb-4">
            <div className="col-md-4 mb-2">
              <strong>Published:</strong> {book.publishedYear}
            </div>
            <div className="col-md-4 mb-2">
              <strong>Pages:</strong> {book.pages}
            </div>
            <div className="col-md-4 mb-2">
              <strong>ISBN:</strong> {book.isbn}
            </div>
          </div>
          
          <div className="mb-4">
            <h5>Description</h5>
            <p>{book.description}</p>
          </div>
          
          <div className="d-grid gap-2 d-md-block">
            <button 
              className="btn btn-primary btn-lg me-md-2"
              disabled={book.stock === 0}
            >
              <i className="fas fa-shopping-cart me-2"></i>
              Add to Cart
            </button>
            <Link to="/" className="btn btn-outline-secondary btn-lg">
              Back to Books
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBookDetails;