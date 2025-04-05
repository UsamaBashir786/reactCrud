
// src/components/user/UserProfile.jsx
import React, { useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import AuthContext from '../../context/auth/authContext';
import Spinner from '../layout/Spinner';

const UserProfile = () => {
  const authContext = useContext(AuthContext);
  const { user, loading } = authContext;
  
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || ''
      });
    }
  }, [user]);
  
  const { name, email } = formData;
  
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const onSubmit = e => {
    e.preventDefault();
    toast.success('Profile updated successfully');
  };
  
  if (loading || !user) return <Spinner />;
  
  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-md-8 mx-auto">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h3 className="mb-0">My Profile</h3>
            </div>
            <div className="card-body">
              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={name}
                    onChange={onChange}
                  />
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={email}
                    onChange={onChange}
                    disabled
                  />
                  <div className="form-text">Email cannot be changed</div>
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Account Type</label>
                  <input
                    type="text"
                    className="form-control"
                    value={user.role}
                    disabled
                  />
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Member Since</label>
                  <input
                    type="text"
                    className="form-control"
                    value={new Date(user.createdAt).toLocaleDateString()}
                    disabled
                  />
                </div>
                
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Update Profile
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;