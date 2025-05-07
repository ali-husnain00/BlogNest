import React, { useState } from 'react';
import './Admin.css';

const Admin = () => {
  const [selectedOption, setSelectedOption] = useState('dashboard');

  const renderComponent = () => {
    switch (selectedOption) {
      case 'dashboard':
        return <div className="panel-content">Welcome to Admin Dashboard</div>;
      case 'users':
        return <div className="panel-content">Manage Users</div>;
      case 'blogs':
        return <div className="panel-content">Manage Blogs</div>;
      case 'createBlog':
        return <div className="panel-content">Create Blog</div>;
      default:
        return <div className="panel-content">Select an option</div>;
    }
  };

  return (
    <div className="admin-panel">
      <header className="admin-header">Admin Panel</header>
      <div className="admin-body">
        <aside className="admin-sidebar">
          <ul>
            <li onClick={() => setSelectedOption('dashboard')}>Dashboard</li>
            <li onClick={() => setSelectedOption('users')}>Manage Users</li>
            <li onClick={() => setSelectedOption('blogs')}>Manage Blogs</li>
            <li onClick={() => setSelectedOption('createBlog')}>Create Blog</li>
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
