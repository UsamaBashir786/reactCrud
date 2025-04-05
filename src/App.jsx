// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Auth Components
import Register from './components/auth/Register';
import Login from './components/auth/Login';

// User Components
import UserHome from './components/user/UserHome';
import UserBookDetails from './components/user/UserBookDetails';
import UserProfile from './components/user/UserProfile';

// Admin Components
import AdminDashboard from './components/admin/AdminDashboard';
import AdminBooks from './components/admin/AdminBooks';
import AdminAddBook from './components/admin/AdminAddBook';
import AdminEditBook from './components/admin/AdminEditBook';
import AdminUsers from './components/admin/AdminUsers';

// Common Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import NotFound from './components/layout/NotFound';
import PrivateRoute from './components/routing/PrivateRoute';
import AdminRoute from './components/routing/AdminRoute';

// Context
import AuthState from './context/auth/AuthState';
import BookState from './context/book/BookState';

function App() {
  return (
    <AuthState>
      <BookState>
        <Router>
          <div className="d-flex flex-column min-vh-100">
            <Header />
            <main className="flex-grow-1">
              <ToastContainer />
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<UserHome />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/books/:id" element={<UserBookDetails />} />
                
                {/* Private User Routes */}
                <Route 
                  path="/profile" 
                  element={
                    <PrivateRoute>
                      <UserProfile />
                    </PrivateRoute>
                  } 
                />
                
                {/* Admin Routes */}
                <Route 
                  path="/admin" 
                  element={
                    <AdminRoute>
                      <AdminDashboard />
                    </AdminRoute>
                  } 
                />
                <Route 
                  path="/admin/books" 
                  element={
                    <AdminRoute>
                      <AdminBooks />
                    </AdminRoute>
                  } 
                />
                <Route 
                  path="/admin/books/add" 
                  element={
                    <AdminRoute>
                      <AdminAddBook />
                    </AdminRoute>
                  } 
                />
                <Route 
                  path="/admin/books/edit/:id" 
                  element={
                    <AdminRoute>
                      <AdminEditBook />
                    </AdminRoute>
                  } 
                />
                <Route 
                  path="/admin/users" 
                  element={
                    <AdminRoute>
                      <AdminUsers />
                    </AdminRoute>
                  } 
                />
                
                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </BookState>
    </AuthState>
  );
}

export default App;