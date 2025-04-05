// src/context/auth/AuthState.jsx
import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS
} from '../types';

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load User
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res = await axios.get('/api/auth/me');

      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  // Register User
  const register = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/auth/register', formData, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response?.data.message || 'Something went wrong'
      });
    }
  };

  // Login User
  const login = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/auth/login', formData, config);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response?.data.message || 'Something went wrong'
      });
    }
  };

  // Logout
  const logout = () => dispatch({ type: LOGOUT });

  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        loadUser,
        login,
        logout,
        clearErrors
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;

// src/context/auth/authContext.js
import { createContext } from 'react';

const authContext = createContext();

export default authContext;

// src/context/auth/authReducer.js
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

// src/context/book/BookState.jsx
import React, { useReducer } from 'react';
import axios from 'axios';
import BookContext from './bookContext';
import bookReducer from './bookReducer';
import {
  GET_BOOKS,
  GET_BOOK,
  ADD_BOOK,
  DELETE_BOOK,
  UPDATE_BOOK,
  BOOK_ERROR,
  CLEAR_BOOK,
  SET_LOADING
} from '../types';

const BookState = props => {
  const initialState = {
    books: [],
    book: null,
    loading: false,
    error: null
  };

  const [state, dispatch] = useReducer(bookReducer, initialState);

  // Get Books
  const getBooks = async () => {
    setLoading();
    try {
      const res = await axios.get('/api/books');

      dispatch({
        type: GET_BOOKS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: BOOK_ERROR,
        payload: err.response?.data.message || 'Something went wrong'
      });
    }
  };

  // Get Book
  const getBook = async id => {
    setLoading();
    try {
      const res = await axios.get(`/api/books/${id}`);

      dispatch({
        type: GET_BOOK,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: BOOK_ERROR,
        payload: err.response?.data.message || 'Something went wrong'
      });
    }
  };

  // Add Book
  const addBook = async book => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/books', book, config);

      dispatch({
        type: ADD_BOOK,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: BOOK_ERROR,
        payload: err.response?.data.message || 'Something went wrong'
      });
    }
  };

  // Delete Book
  const deleteBook = async id => {
    try {
      await axios.delete(`/api/books/${id}`);

      dispatch({
        type: DELETE_BOOK,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: BOOK_ERROR,
        payload: err.response?.data.message || 'Something went wrong'
      });
    }
  };

  // Update Book
  const updateBook = async book => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.put(`/api/books/${book._id}`, book, config);

      dispatch({
        type: UPDATE_BOOK,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: BOOK_ERROR,
        payload: err.response?.data.message || 'Something went wrong'
      });
    }
  };

  // Clear Book
  const clearBook = () => {
    dispatch({ type: CLEAR_BOOK });
  };

  // Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <BookContext.Provider
      value={{
        books: state.books,
        book: state.book,
        loading: state.loading,
        error: state.error,
        getBooks,
        getBook,
        addBook,
        deleteBook,
        updateBook,
        clearBook
      }}
    >
      {props.children}
    </BookContext.Provider>
  );
};

export default BookState;

// src/context/book/bookContext.js
import { createContext } from 'react';

const bookContext = createContext();

export default bookContext;

// src/context/book/bookReducer.js
import {
  GET_BOOKS,
  GET_BOOK,
  ADD_BOOK,
  DELETE_BOOK,
  UPDATE_BOOK,
  BOOK_ERROR,
  CLEAR_BOOK,
  SET_LOADING
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_BOOKS:
      return {
        ...state,
        books: action.payload,
        loading: false
      };
    case GET_BOOK:
      return {
        ...state,
        book: action.payload,
        loading: false
      };
    case ADD_BOOK:
      return {
        ...state,
        books: [action.payload, ...state.books],
        loading: false
      };
    case UPDATE_BOOK:
      return {
        ...state,
        books: state.books.map(book =>
          book._id === action.payload._id ? action.payload : book
        ),
        loading: false
      };
    case DELETE_BOOK:
      return {
        ...state,
        books: state.books.filter(book => book._id !== action.payload),
        loading: false
      };
    case CLEAR_BOOK:
      return {
        ...state,
        book: null,
        loading: false
      };
    case BOOK_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};

// src/context/types.js
// Auth Types
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';
export const USER_LOADED = 'USER_LOADED';
export const AUTH_ERROR = 'AUTH_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT = 'LOGOUT';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

// Book Types
export const GET_BOOKS = 'GET_BOOKS';
export const GET_BOOK = 'GET_BOOK';
export const ADD_BOOK = 'ADD_BOOK';
export const DELETE_BOOK = 'DELETE_BOOK';
export const UPDATE_BOOK = 'UPDATE_BOOK';
export const BOOK_ERROR = 'BOOK_ERROR';
export const CLEAR_BOOK = 'CLEAR_BOOK';
export const SET_LOADING = 'SET_LOADING';