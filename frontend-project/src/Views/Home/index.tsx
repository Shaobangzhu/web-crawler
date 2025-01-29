import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, message } from 'antd';
import axios from 'axios';
import './style.css';

const Home: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const res = await axios.get('/api/isLogin');
        if (!res.data?.data) {
          setIsLogin(false);
        }
      } catch (error) {
        message.error('Error checking login status');
      } finally {
        setLoaded(true);
      }
    };
    checkLoginStatus();
  }, []);

  const handleLogoutClick = async () => {
    try {
      const res = await axios.get('/api/logout');
      if (res.data?.data) {
        setIsLogin(false);
        navigate('/login'); // Redirect after logout
      } else {
        message.error('退出失败');
      }
    } catch (error) {
      message.error('Logout request failed');
    }
  };

  if (!isLogin) {
    navigate('/login');
  }

  return loaded ? (
    <div className="home-page">
      <Button type="primary" style={{ marginLeft: '5px' }}>
        Crawl
      </Button>
      <Button type="primary">Show Data</Button>
      <Button type="primary" onClick={handleLogoutClick}>
        Log Out
      </Button>
    </div>
  ) : null;
};

export default Home;
