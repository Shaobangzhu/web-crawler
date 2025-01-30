import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, message } from "antd";
import ReactEcharts from "echarts-for-react";
import axios from "axios";
import "./style.css";

const Home: React.FC = () => {
  const [isLogin, setIsLogin] = useState<null | boolean>(null);
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const res = await axios.get("/api/isLogin");
        setIsLogin(res.data?.data || false);
      } catch (error) {
        message.error("Error checking login status");
      } finally {
        setLoaded(true);
      }
    };
    checkLoginStatus();
  }, []);

  useEffect(() => {
    if (isLogin === false) {
      navigate("/login");
    }
  }, [isLogin, navigate]);

  const handleLogoutClick = async () => {
    try {
      const res = await axios.get("/api/logout");
      if (res.data?.success) {
        setIsLogin(false);
      } else {
        message.error("Log Out Failure!");
      }
    } catch (error) {
      message.error("Logout request failed");
    }
  };

  const handleCrawlerClick = async () => {
    try {
      const res = await axios.get("/api/crawl");
      if (res.data?.success) {
        message.success("Crawling succeeded!");
      } else {
        message.error("Crawling failed!");
      }
    } catch (error) {
      message.error("Crawling failed!");
    }
  };

  const getOption: () => echarts.EChartOption = () => ({
    title: { text: "Stacked Line" },
    tooltip: { trigger: "axis" },
    legend: {
      data: ["Email", "Union Ads", "Video Ads", "Direct", "Search Engine"],
    },
    grid: { left: "3%", right: "4%", bottom: "3%", containLabel: true },
    toolbox: { feature: { saveAsImage: {} } },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: { type: "value" },
    series: [
      { name: "Email", type: "line", data: [120, 132, 101, 134, 90, 230, 210] },
      {
        name: "Union Ads",
        type: "line",
        data: [220, 182, 191, 234, 290, 330, 310],
      },
      {
        name: "Video Ads",
        type: "line",
        data: [150, 232, 201, 154, 190, 330, 410],
      },
      {
        name: "Direct",
        type: "line",
        data: [320, 332, 301, 334, 390, 330, 320],
      },
      {
        name: "Search Engine",
        type: "line",
        data: [820, 932, 901, 934, 1290, 1330, 1320],
      },
    ],
  });

  if (!loaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="home-page">
      <div className="buttons">
        <Button
          type="primary"
          style={{ marginRight: "5px" }}
          onClick={handleCrawlerClick}
        >
          Crawl
        </Button>
        <Button type="primary" onClick={handleLogoutClick}>
          Log Out
        </Button>
      </div>

      <ReactEcharts option={getOption()} />
    </div>
  );
};

export default Home;