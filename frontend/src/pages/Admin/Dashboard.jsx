import React, { useContext, useEffect, useState } from 'react';
import "./Dashboard.css"
import Loading from '../../components/Loading/Loading';
import { BlogContext } from '../../components/Context/Context';

const Dashboard = () => {
  const [stats, setStats] = useState({ totalUsers: 0, totalBlogs: 0 });

  const {BASE_URL} = useContext(BlogContext)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${BASE_URL}/admin/stats`);
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
