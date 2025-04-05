// src/components/user/UserHome.jsx
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BookContext from '../../context/book/bookContext';
import Spinner from '../layout/Spinner';

const UserHome = () => {
  const bookContext = useContext(BookContext);
  const { books, getBooks, loading } = bookContext;
  
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  
  useEffect(() => {
    getBooks();
    // eslint-disable-next-line
  }, []);
  
  useEffect(() => {
    setFilteredBooks(books);
  }, [books]);
  
  const handleSearch = e => {
    const term = e.target.value;
    setSearchTerm(term);
    
    filterBooks(term, activeCategory);
  };
  
  const handleCategoryFilter = category => {
    setActiveCategory(category);
    
    filterBooks(searchTerm, category);
  };
  
  const filterBooks = (term, category) => {
    let filtered = books;
    
    // Filter by search term
    if (term) {
      filtered = filtered.filter(book => 
        book.title.toLowerCase().includes(term.toLowerCase()) ||
        book.author.toLowerCase().includes(term.toLowerCase()) ||
        book.description.toLowerCase().includes(term.toLowerCase())
      );
    }
    
    // Filter by category
    if (category !== 'All') {
      filtered = filtered.filter(book => book.category === category);
    }
    
    setFilteredBooks(filtered);
  };
  
  const getCategories = () => {
    const categories = books.map(book => book.category);
    return ['All', ...new Set(categories)];
  };
  
  if (loading) return <Spinner />;
  
  return (
    <div className="container py-4">
      <div className="row mb-4">
        <div className="col-md-6 mb-3 mb-md-0">
          <h1>Coding Books Library</h1>
          <p className="text-muted">Find the best programming books for your needs</p>
        </div>
        <div className="col-md-6">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search books by title, author or description..."
              value={searchTerm}
              onChange={handleSearch}
            />
            <button className="btn btn-primary" type="button">
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
      </div>
      
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex flex-wrap gap-2">
            {getCategories().map(category => (
              <button
                key={category}
                className={`btn ${activeCategory === category ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => handleCategoryFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {filteredBooks.length === 0 ? (
        <div className="alert alert-info">No books found matching your criteria</div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {filteredBooks.map(book => (
            <div key={book._id} className="col">
              <div className="card h-100 shadow-sm">
                <div className="card-img-top bg-light text-center py-3">
                  {book.imageUrl ? (
                    <img 
                      src={book.imageUrl} 
                      alt={book.title} 
                      className="img-fluid" 
                      style={{ maxHeight: '150px' }}
                    />
                  ) : (
                    <div className="text-center p-5 bg-light">
                      <i className="fas fa-book fa-5x text-secondary"></i>
                    </div>
                  )}
                </div>
                <div className="card-body">
                  <h5 className="card-title">{book.title}</h5>
                  <h6 className="text-muted">by {book.author}</h6>
                  <div className="mb-2">
                    <span className="badge bg-primary">{book.category}</span>
                    {book.stock > 0 ? (
                      <span className="badge bg-success ms-2">In Stock</span>
                    ) : (
                      <span className="badge bg-danger ms-2">Out of Stock</span>
                    )}
                  </div>
                  <p className="card-text text-truncate">{book.description}</p>
                  <p className="fs-5 fw-bold text-primary">${book.price.toFixed(2)}</p>
                </div>
                <div className="card-footer bg-white border-top-0 d-grid">
                  <Link to={`/books/${book._id}`} className="btn btn-outline-primary">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserHome;