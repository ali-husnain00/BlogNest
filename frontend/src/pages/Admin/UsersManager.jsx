import React, { useState, useEffect } from 'react';
import './UsersManager.css'; 
import { toast } from 'react-toastify';

const UsersManager = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
      try {
        const res = await fetch('http://localhost:3000/admin/allUsers');
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error('Error fetching Users:', err);
      }
    };


  const handleDeleteUser = async (id) =>{
    try {
        const res = await fetch(`http://localhost:3000/admin/deleteUser/${id}`,{
            method: "DELETE",
        })
        if(res.ok){
            toast.success("User deleted successfully!");
            fetchUsers();
        }
        else{
            toast.error("An error occured while deleting users");
        }
    } catch (error) {
        console.log(error);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="users-manager">
      <h2>All Users</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="table-resp-container">
          <table className="user-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Registered On</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                <td><button className='del-btn' onClick={() =>handleDeleteUser(user._id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
    </div>
  );
};

export default UsersManager;
