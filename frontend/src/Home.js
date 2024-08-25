import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [info, setInfo] = useState([]);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      if (!localStorage.getItem('accessToken')) {
        navigate('/login');
      }
    };

    const fetchInfo = async () => {
      try {
        const response = await axios.get('http://localhost:5000/auth/info');
        setInfo(response.data);
      } catch (error) {
        console.error('Error fetching info data', error);
      }
    };

    checkAuth();
    fetchInfo();
    setUsername(localStorage.getItem('name') || 'User');
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('name');
    navigate('/login');
  };

  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="navbar-left">
          <span className="username">{username}</span>
        </div>
        <div className="navbar-right">
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
      </nav>
      <main className="content">
        <h1>User List</h1>
        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Lastname</th>
              <th>Month</th>
              <th>Salary</th>
            </tr>
          </thead>
          <tbody>
            {info.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.lastName}</td>
                <td>{user.month}</td>
                <td>{user.salary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default Home;
