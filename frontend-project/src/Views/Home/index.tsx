import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Button } from 'antd';
import axios from 'axios';
import './style.css';

const Home: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios.get('/api/isLogin').then(res => {
      if (!res.data?.data) {
        setIsLogin(false);
      }
      setLoaded(true);
    });
  }, []);

  if (!isLogin) {
    return <Navigate to="/login" />;
  }

  if (!loaded) {
    return null; // Render nothing until the data is loaded
  }

  return (
    <div className="home-page">
      <Button type="primary">Get Data</Button>
      <Button type="primary">Show Data</Button>
      <Button type="primary">Log Out</Button>
    </div>
  );
};

export default Home;
