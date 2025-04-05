// src/components/layout/Header.jsx
import React, { useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const Header = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, logout, user } = authContext;

  const onLogout = () => {
    logout();
  };

  const authLinks = (
    <Fragment>
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle"
          href="#!"
          id="navbarDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="fas fa-user me-1"></i>
          {user && user.name}
        </a>
        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
          {user && user.role === 'admin' && (
            <li>
              <Link className="dropdown-item" to="/admin">
                <i className="fas fa-cog me-2"></i>
                Admin Dashboard
              </Link>
            </li>
          )}
          <li>
            <Link className="dropdown-item" to="/profile">
              <i className="fas fa-user-circle me-2"></i>
              My Profile
            </Link>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <a onClick={onLogout} className="dropdown-item" href="#!">
              <i className="fas fa-sign-out-alt me-2"></i>
              Logout
            </a>
          </li>
        </ul>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li className="nav-item">
        <Link className="nav-link" to="/register">
          Register
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/login">
          Login
        </Link>
      </li>
    </Fragment>
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <i className="fas fa-book me-2"></i>
          CodeBook
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMain"
          aria-controls="navbarMain"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarMain">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            {isAuthenticated ? authLinks : guestLinks}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;