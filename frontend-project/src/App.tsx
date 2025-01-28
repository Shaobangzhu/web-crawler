import React from "react";
import { HashRouter, Routes, Route } from 'react-router-dom';
import LoginForm from "./Views/Login/index.tsx";
import Home from "./Views/Home/index.tsx";

const App: React.FC = () => {
  return (
    <div>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </HashRouter>
    </div>
  );
};

export default App;