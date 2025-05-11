import React, { useState } from 'react';
import './Admin.css';
import Dashboard from './Dashboard';
import UsersManager from './UsersManager';
import ManageBlogs from './ManageBlogs';
import { useNavigate } from 'react-router';

const Admin = () => {
  const [selectedOption, setSelectedOption] = useState('dashboard');
  const navigate = useNavigate();

  const renderComponent = () => {
    switch (selectedOption) {
      case 'dashboard':
        return <Dashboard/>
      case 'users':
        return <UsersManager/>
      case 'blogs':
        return <ManageBlogs/>
      default:
        return <div className="panel-content">Select an option</div>;
    }
  };

  return (
    <div className="admin-panel">
      <header className="admin-header">
        <h3>Admin Panel</h3>
        <button className='back-btn' onClick={() =>navigate("/")}>Back to home</button>
      </header>
      <div className="admin-body">
        <aside className="admin-sidebar">
          <ul>
            <li className={selectedOption === "dashboard" ? "active" : ""} onClick={() => setSelectedOption('dashboard')}>Dashboard</li>
            <li className={selectedOption === "users" ? "active" : ""} onClick={() => setSelectedOption('users')}>Manage Users</li>
            <li className={selectedOption === "blogs" ? "active" : ""} onClick={() => setSelectedOption('blogs')}>Manage Blogs</li>
          </ul>
        </aside>
        <main className="admin-main">
          {renderComponent()}
        </main>
      </div>
    </div>
  );
};

export default Admin;
