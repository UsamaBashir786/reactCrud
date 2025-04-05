// src/components/admin/AdminDashboard.jsx
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BookContext from '../../context/book/bookContext';
import AuthContext from '../../context/auth/authContext';
import Spinner from '../layout/Spinner';
import { BookIcon, UserIcon } from '../icons/Icons';

const AdminDashboard = () => {
  const bookContext = useContext(BookContext);
  const authContext = useContext(AuthContext);
  
  const { books, getBooks, loading } = bookContext;
  const { user } = authContext;
  
  const [stats, setStats] = useState({
    totalBooks: 0,
    lowStock: 0,
    categories: {}
  });
  
  useEffect(() => {
    getBooks();
    // eslint-disable-next-line
  }, []);
  
  useEffect(() => {
    if (books.length > 0) {
      // Calculate stats
      const totalBooks = books.length;
      const lowStock = books.filter(book => book.stock < 5).length;
      
      // Count by category
      const categories = books.reduce((acc, book) => {
        acc[book.category] = (acc[book.category] || 0) + 1;
        return acc;
      }, {});
      
      setStats({ totalBooks, lowStock, categories });
    }
  }, [books]);

  if (loading) return <Spinner />;
  
  return (
    <div className="container py-4">
      <h1 className="mb-4">Admin Dashboard</h1>
      
      {user && (
        <div className="alert alert-info">
          Welcome back, {user.name}!
        </div>
      )}
      
      <div className="row mb-4">
        <div className="col-md-4 mb-3">
          <div className="card bg-primary text-white h-100">
            <div className="card-body d-flex align-items-center">
              <BookIcon className="me-3" size={48} />
              <div>
                <h5 className="card-title">Total Books</h5>
                <h2 className="mb-0">{stats.totalBooks}</h2>
              </div>
            </div>
            <div className="card-footer bg-transparent border-0">
              <Link to="/admin/books" className="text-white">View All Books</Link>
            </div>
          </div>
        </div>
        
        <div className="col-md-4 mb-3">
          <div className="card bg-warning text-dark h-100">
            <div className="card-body d-flex align-items-center">
              <BookIcon className="me-3" size={48} />
              <div>
                <h5 className="card-title">Low Stock Alert</h5>
                <h2 className="mb-0">{stats.lowStock}</h2>
              </div>
            </div>
            <div className="card-footer bg-transparent border-0">
              <Link to="/admin/books" className="text-dark">Check Inventory</Link>
            </div>
          </div>
        </div>
        
        <div className="col-md-4 mb-3">
          <div className="card bg-success text-white h-100">
            <div className="card-body d-flex align-items-center">
              <UserIcon className="me-3" size={48} />
              <div>
                <h5 className="card-title">Users</h5>
                <h2 className="mb-0">-</h2>
              </div>
            </div>
            <div className="card-footer bg-transparent border-0">
              <Link to="/admin/users" className="text-white">Manage Users</Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-header bg-light">
              <h5 className="mb-0">Books by Category</h5>
            </div>
            <div className="card-body">
              {Object.entries(stats.categories).length > 0 ? (
                <ul className="list-group">
                  {Object.entries(stats.categories).map(([category, count]) => (
                    <li key={category} className="list-group-item d-flex justify-content-between align-items-center">
                      {category}
                      <span className="badge bg-primary rounded-pill">{count}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted">No categories to display</p>
              )}
            </div>
          </div>
        </div>
        
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-header bg-light">
              <h5 className="mb-0">Quick Actions</h5>
            </div>
            <div className="card-body">
              <div className="d-grid gap-2">
                <Link to="/admin/books/add" className="btn btn-primary">
                  Add New Book
                </Link>
                <Link to="/admin/books" className="btn btn-secondary">
                  Manage Books
                </Link>
                <Link to="/admin/users" className="btn btn-info">
                  Manage Users
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

