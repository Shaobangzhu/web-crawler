import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button, message } from "antd";
import ReactEcharts from "echarts-for-react";
import axios from "axios";
import moment from "moment";
import "./style.css";

interface CourseItem {
  title: string;
  count: number;
}

interface LineData {
  name: string;
  type: string;
  data: number[];
}

const Home: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [data, setData] = useState<{ [key: string]: CourseItem[] }>({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loginRes = await axios.get("/api/isLogin");
        if (!loginRes.data?.data) {
          setIsLogin(false);
        }
        setLoaded(true);

        const dataRes = await axios.get("/api/showData");
        if (dataRes.data?.data) {
          setData(dataRes.data.data);
        }
      } catch (error) {
        message.error("Error fetching data");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  }, [isLogin, navigate]);

  const handleLogoutClick = async () => {
    try {
      const res = await axios.get("/api/logout");
      if (res.data?.data) {
        setIsLogin(false);
      } else {
        message.error("Log Out Failed!");
      }
    } catch (error) {
      message.error("Logout request failed");
    }
  };

  const handleCrawlerClick = async () => {
    try {
      const res = await axios.get("/api/getData");
      if (res.data?.data) {
        message.success("Crawling succeeded!");
      } else {
        message.error("Crawling failed!");
      }
    } catch (error) {
      message.error("Crawling failed!");
    }
  };

  const getOption = useCallback(() => {
    const courseNames: string[] = [];
    const times: string[] = [];
    const tempData: { [key: string]: number[] } = {};

    Object.entries(data).forEach(([timestamp, items]) => {
      times.push(moment(Number(timestamp)).format("MM-DD HH:mm"));
      items.forEach(({ title, count }) => {
        if (!courseNames.includes(title)) {
          courseNames.push(title);
        }
        tempData[title]
          ? tempData[title].push(count)
          : (tempData[title] = [count]);
      });
    });

    const result: LineData[] = Object.entries(tempData).map(
      ([name, values]) => ({
        name,
        type: "line",
        data: values,
      })
    );

    return {
      title: { text: "课程在线学习人数" },
      tooltip: { trigger: "axis" },
      legend: { data: courseNames },
      grid: { left: "3%", right: "4%", bottom: "3%", containLabel: true },
      xAxis: { type: "category", boundaryGap: false, data: times },
      yAxis: { type: "value" },
      series: result,
    };
  }, [data]);

  if (!loaded) return null;

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