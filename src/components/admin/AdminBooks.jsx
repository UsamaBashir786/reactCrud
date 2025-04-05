
// src/components/admin/
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import BookContext from '../../context/book/bookContext';
import Spinner from '../layout/Spinner';

const AdminBooks = () => {
  const bookContext = useContext(BookContext);
  const { books, getBooks, deleteBook, loading } = bookContext;

  useEffect(() => {
    getBooks();
    // eslint-disable-next-line
  }, []);

  const onDelete = id => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      deleteBook(id);
      toast.success('Book removed successfully');
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Manage Books</h1>
        <Link to="/admin/books/add" className="btn btn-primary">
          <i className="fas fa-plus me-2"></i> Add New Book
        </Link>
      </div>

      {books.length === 0 ? (
        <div className="alert alert-info">No books found</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map(book => (
                <tr key={book._id}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.category}</td>
                  <td>${book.price.toFixed(2)}</td>
                  <td>
                    <span className={`badge ${book.stock < 5 ? 'bg-danger' : 'bg-success'}`}>
                      {book.stock}
                    </span>
                  </td>
                  <td>
                    <div className="btn-group btn-group-sm">
                      <Link to={`/admin/books/edit/${book._id}`} className="btn btn-primary">
                        <i className="fas fa-edit"></i>
                      </Link>
                      <button 
                        onClick={() => onDelete(book._id)} 
                        className="btn btn-danger"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                      <Link to={`/books/${book._id}`} className="btn btn-info">
                        <i className="fas fa-eye"></i>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminBooks;