import React, { useEffect, useState } from 'react';
import "./Dashboard.css"

const Dashboard = () => {
  const [stats, setStats] = useState({ totalUsers: 0, totalBlogs: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('http://localhost:3000/admin/stats');
        const data = await res.json(); 
        setStats(data);
        console.log(data)
      } catch (err) {
        console.error('Error fetching admin stats:', err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className='dashboard'>
      <div className="stats">
        <div className="box">
        <span>{stats.totalUsers}</span>
        <p>Total Users</p>
      </div>
      <div className="box">
        <span>{stats.totalBlogs}</span>
        <p>Total Blogs</p>
      </div>
      </div>
    </div>
  );
};

export default Dashboard;
